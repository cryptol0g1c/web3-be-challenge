/* eslint-disable max-len */
/* eslint-disable no-console */
import * as express from 'express';
import TransactionModel, { TransactionDocument } from '../models/transactionModel';
import ErrorResponse from '../library/errorResponse';

class GetInfoController {
  public path = '/get';

  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, GetInfoController.getTransactionHandler);
  }

  public static getTransactionHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const lastTransaction = await GetInfoController.getLastTransaction();
      response.send(lastTransaction);
    } catch (error: any) {
      return next(new ErrorResponse((error as Error).message, 400));
    }
  };

  public static getLastTransaction = async ():Promise<TransactionDocument> => {
    const lastTransaction = await TransactionModel.findOne().sort('-createdAt');
    return lastTransaction as TransactionDocument;
  };
}

export default GetInfoController;
