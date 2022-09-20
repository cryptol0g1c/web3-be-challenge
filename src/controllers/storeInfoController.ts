/* eslint-disable max-len */
import * as express from 'express';
import { getTransactionInfo } from '../library/w3Utils';
import TransactionModel, { TransactionInfo, TransactionDocument } from '../models/transactionModel';
import ErrorResponse from '../library/errorResponse';

class StoreInfoController {
  public path = '/transaction';

  public router = express.Router();

  public transactionInfo: TransactionInfo | undefined;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, StoreInfoController.storeInfoHandler);
  }

  public static storeInfoHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { tx } = request.body;
      const result = await StoreInfoController.storeInfo(tx as string);
      response.send(result);
    } catch (error) {
      return next(new ErrorResponse((error as Error).message, 400));
    }
  };

  public static storeInfo = async (tx:string):Promise<TransactionDocument> => {
    const { transaction, events } = await getTransactionInfo(tx);
    const transactionDocument = new TransactionModel(transaction);
    transactionDocument.events = events;
    const storeResult = await transactionDocument.save();
    return storeResult;
  };
}

export default StoreInfoController;
