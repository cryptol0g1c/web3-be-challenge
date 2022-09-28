import { Document } from "mongoose";

export interface ITransaction extends Document {
  transactionHash: String;
  from: String;
  to: String;
  amountIn: Number;
  amountOutMin: Number;
  deadline: Number;
  path: String[];
}

export interface IAbi extends Document {
  address: String;
  content: String;
}
