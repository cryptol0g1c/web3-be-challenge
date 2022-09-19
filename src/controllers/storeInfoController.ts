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

  public static storeInfoHandler = async (_: express.Request, response: express.Response) => {
    try {
      const result = await StoreInfoController.storeInfo();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  public static storeInfo = async ():Promise<TransactionDocument> => {
    const { transaction, events } = await getTransactionInfo(config.ethers.transactionAddress);
    const transactionDocument = new TransactionModel(transaction);
    transactionDocument.events = events;
    const storeResult = await transactionDocument.save();
    return storeResult;
  };
}

export default StoreInfoController;
