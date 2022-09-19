/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import fs from 'fs';
import config from '../config/config';
import Logging from './logging';

const fsPromises = fs.promises;

async function getAbi(contractAddress: string) {
  try {
    const filePath = `${config.ethers.abiFilePath + contractAddress}.json`;
    const abi = await fsPromises.readFile(filePath, 'utf8');
    return abi;
  } catch (error) {
    Logging.error(error);
    throw error;
  }
}

export const getContract = async (contractAddress: string) => {
  try {
    const abi = await getAbi(contractAddress);
    const provider = new ethers.providers.JsonRpcProvider(config.ethers.rpcUrl);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract;
  } catch (error) {
    Logging.error(error);
    throw error;
  }
};

export const getTransactionInfo = async (transactionAddress: string) => {
  // Get transaction info
  const provider = new ethers.providers.JsonRpcProvider(config.ethers.rpcUrl);
  const transaction = await provider.getTransaction(transactionAddress);
  Logging.info(`Contract address: ${transaction.to}`);
  Logging.info(`Transaction hash: ${transaction.hash}`);
  Logging.info(`Transaction value: ${transaction.value}`);
  Logging.info(`Transaction gas limit: ${transaction.gasLimit}`);
  Logging.info(`Transaction gas price: ${transaction.gasPrice}`);
  Logging.info(`Transaction nonce: ${transaction.nonce}`);
  Logging.info(`Transaction block number: ${transaction.blockNumber}`);
  Logging.info(`Transaction timestamp: ${transaction.timestamp}`);
  Logging.info(`Transaction confirmations: ${transaction.confirmations}`);
  Logging.info(`Transaction from: ${transaction.from}`);
  Logging.info(`Transaction chainId: ${transaction.chainId}`);
  Logging.info(`Contract address: ${transaction.to}\n`);

  // Get transaction logs
  const receipt = await provider.getTransactionReceipt(transactionAddress);
  Logging.info(`Events count: ${receipt.logs.length}\n`);
  const { logs } = receipt;

  // Get logs details
  logs.forEach(async (log) => {
    const contractAddress = log.address;
    const contract = await getContract(contractAddress);
    const event = contract.interface.parseLog(log);
    Logging.info(`Event name: ${event.name}`);
    Logging.info(`Event signature: ${event.signature}\n`);
  });

  return transaction;
};
