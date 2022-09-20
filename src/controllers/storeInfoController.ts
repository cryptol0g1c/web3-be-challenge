import * as express from 'express';
import { getTransactionInfo } from '../library/w3Utils';
import TransactionModel, { TransactionInfo, TransactionDocument } from '../models/transactionModel';
import config from '../config/config';

class StoreInfoController {
  public path = '/store';

  public router = express.Router();

  public transactionInfo: TransactionInfo | undefined;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, StoreInfoController.storeInfoHandler);
  }

  public static storeInfoHandler = async (request: express.Request, response: express.Response) => {
    try {
      const { tx } = request.query;
      const result = await StoreInfoController.storeInfo(tx as string);
      response.send(result);
    } catch (error) {
      response.send(error);
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
