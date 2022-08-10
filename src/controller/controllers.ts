import { NextFunction, Request, Response } from "express";
import { provider } from "../utils/rpc_connection";
import { getContractData } from "./contract_data";
import { collections } from "../config/database";
import { decodeGas } from "../utils/gasDecode";
import { QueryError } from "../utils/Error";
import path from 'path';

export const getTransactionDetails = async (req: Request, res: Response, next: NextFunction) => {
  const txHash: string = req.params.txHash;
  try {
    const transaction = await provider.getTransaction(txHash);
    const { data } = transaction;
    const contract_address: string = `0x${data.substring(data.length - 40)}`;
    const contract = await getContractData(contract_address);
    return res.status(200).send({
      status: 200,
      transaction,
      contract_detail: contract,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const saveTransaction = async (req: Request, res: Response) => {
  const txHash: string = req.body.txHash;
  try {
    const transaction = await provider.getTransaction(txHash);
    const result = await collections.transaction_data?.insertOne(transaction);

    return res.status(201).send({
      status: 201,
      data: transaction,
      detail: `Transaction saved successfully, Id: ${result?.insertedId}`,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const getDecodeTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const hash = req.params.txHash;
  try {
    const result = await collections.transaction_data?.findOne({ hash });
    if (!result) throw new QueryError(400, "invalid txHash", `${hash} Could not found`);

    const decodeTransaction = decodeGas(result);

    return res.status(200).send({
      status: 200,
      data: decodeTransaction,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await collections.transaction_data?.find().toArray();
    if (!result) throw new QueryError(400, "bad Request", 'Could not found transactions');

    const decodeArrayOfTrans = result!.map((o) => decodeGas(o));

    return res.status(200).send({
      status: 200,
      data: decodeArrayOfTrans,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const getAbiDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).sendFile(path.join(__dirname, '../public', 'abi.json'))
      } catch (error) {
        res.status(400).send(error);
        console.log(error);
      }
}

export const getByteCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
      return res.status(200).sendFile(path.join(__dirname, '../public', 'bytecode.json'))
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
}