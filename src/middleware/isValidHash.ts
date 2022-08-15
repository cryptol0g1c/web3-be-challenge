import { utils } from "ethers";
import { NextFunction, Request, Response } from "express";

export const isValidHash = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const txHash = req.params.txHash;
  if (!utils.isHexString(txHash, 32)) {
    res.status(404).json({
      detail: "Invalid Hash!",
      type: "Bad Request",
      code: 404,
    });
  }
  next();
};
