/* eslint-disable max-len */
import * as express from 'express';
import ErrorResponse from '../library/errorResponse';
import config from '../config/config';
import Logging from '../library/logging';

class DownloadController {
  public path = '/contract';

  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(`${this.path}/abi`, DownloadController.getABIHandler);
    this.router.get(`${this.path}/bin`, DownloadController.getContractHandler);
  }

  public static getABIHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { hash } = request.query;
      const fileName = `${hash}.json`;
      Logging.info(`Downloading ${fileName}`);
      return response.sendFile(fileName, { root: config.ethers.abiFilePath });
    } catch (error) {
      return next(new ErrorResponse((error as Error).message, 400));
    }
  };

  public static getContractHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const fileName = 'traderjoe.bin';
      const filePath = './artifacts/contracts/';
      Logging.info(`Downloading ${fileName}`);
      return response.sendFile(fileName, { root: filePath });
    } catch (error) {
      return next(new ErrorResponse((error as Error).message, 400));
    }
  };
}

export default DownloadController;
