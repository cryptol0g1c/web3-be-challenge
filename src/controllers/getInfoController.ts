/* eslint-disable no-console */
import * as express from 'express';
import TransactionModel, { TransactionDocument } from '../models/transactionModel';

class GetInfoController {
  public path = '/get';

  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, GetInfoController.getTransactionHandler);
  }

  public static getTransactionHandler = async (_: express.Request, response: express.Response) => {
    try {
      const lastTransaction = await GetInfoController.getLastTransaction();
      response.send(lastTransaction);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  public static getLastTransaction = async ():Promise<TransactionDocument> => {
    const lastTransaction = await TransactionModel.findOne().sort('-createdAt');
    return lastTransaction as TransactionDocument;
  };
}

export default GetInfoController;
