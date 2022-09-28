import { Request, Response, NextFunction } from "express";
import express from "express";
import diContainer from "../../di-container";
import { ITransactionService } from "../../services/services.interface";

const router = express.Router();

const prefix = "/transaction";

router.get(
  `${prefix}/hash/:hash`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hash = req.params.hash;
      const transactionService = diContainer.get<ITransactionService>(
        "ITransactionService"
      );

      const response = await transactionService.getTransactionByHash(
        String(hash)
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  `${prefix}`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionService = diContainer.get<ITransactionService>(
        "ITransactionService"
      );

      const response = await transactionService.getAll();
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
);

export { router as transactionRoutes };
