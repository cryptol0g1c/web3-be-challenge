/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { ethers, BigNumber } from 'ethers';
import fs from 'fs';
import config from '../config/config';
import Logging from './logging';
import { TransactionEvent } from '../models/transactionModel';
import ErrorResponse from '../library/errorResponse';

const fsPromises = fs.promises;

const provider = new ethers.providers.JsonRpcProvider(config.ethers.rpcUrl);

async function getAbi(contractAddress: string) {
  try {
    console.log('getAbi');
    const filePath = `${config.ethers.abiFilePath + contractAddress}.json`;
    const abi = await fsPromises.readFile(filePath, 'utf8');
    return abi;
  } catch (error) {
    Logging.error(error);
    throw new ErrorResponse('Error while reading abi file', 500);
  }
}

export const getContract = async (contractAddress: string) => {
  try {
    console.log('contractAddress', contractAddress);
    const abi = await getAbi(contractAddress);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract;
  } catch (error) {
    Logging.error(error);
    throw new ErrorResponse('Error while getting contract', 500);
  }
};

export const parseArguments = (args: any) => args.map((arg: any) => {
  if (Object.keys(arg)[1] === '_isBigNumber') {
    return ethers.utils.formatEther(Object.values(arg)[0] as BigNumber);
  }
  return arg;
});

export const getTransactionInfo = async (transactionAddress: string) => {
  try {
  // Get transaction info
    const transaction = await provider.getTransaction(transactionAddress);
    Logging.info(`Transaction hash: ${transaction.hash}`);
    Logging.info(`Transaction from: ${transaction.from}`);
    Logging.info(`Contract address: ${transaction.to}\n`);

    // Get transaction logs
    const receipt = await provider.getTransactionReceipt(transactionAddress);
    const { logs } = receipt;
    Logging.info(`Events count: ${logs.length}\n`);

    // Get logs details
    const events:TransactionEvent[] = await Promise.all(logs.map(async (log) => {
      const contractAddress = log.address;
      const contract = await getContract(contractAddress);
      const parsed = contract.interface.parseLog(log);
      Logging.info(`Event name: ${parsed.name}`);
      Logging.info(`Event signature: ${parsed.signature}\n`);
      return {
        name: parsed.name,
        signature: parsed.signature,
        arguments: parseArguments(parsed.args as any),
      };
    }));

    return { transaction, events };
  } catch (error) {
    Logging.error(error);
    throw new ErrorResponse('Error while getting transaction info', 500);
  }
};
