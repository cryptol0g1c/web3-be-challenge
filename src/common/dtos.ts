export interface IAbiDto {
  address: String;
  content: String;
}

export interface ITransactionDto {
  transactionHash: String;
  from: String;
  to: String;
  amountIn: Number;
  amountOutMin: Number;
  deadline: Number;
  path: String[];
}
