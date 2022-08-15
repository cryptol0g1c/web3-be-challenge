import { Router } from "express";
import {
  getTransactionDetails,
  saveTransaction,
  getDecodeTransaction,
  getAllTransactions,
  getAbiDetail,
  getByteCode,
  getEventLogs
} from "../controller/controllers";
import { isValidHash } from "../middleware/isValidHash";

const router = Router();

router.get("/detail/:txHash", isValidHash,getTransactionDetails);
router
  .post("/transaction", saveTransaction)
  .get("/:txHash",isValidHash, getDecodeTransaction);

router.get("/transaction/get-all", getAllTransactions);

router.get("/contract/abi", getAbiDetail);
router.get("/contract/bytecode", getByteCode);
router.get("/contract/get-logs/:contractAddress/:address", getEventLogs)

export default router;
