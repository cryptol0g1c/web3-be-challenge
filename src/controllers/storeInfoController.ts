import * as express from 'express';
import { getTransactionInfo, getContract } from '../library/blockchain';
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
    const transactionInfo = await getTransactionInfo(config.ethers.transactionAddress);
    const transaction = new TransactionModel(transactionInfo);
    const storeResult = await transaction.save();
    return storeResult;
  };
}

export default StoreInfoController;
