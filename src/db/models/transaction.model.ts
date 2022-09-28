import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amountIn: {
    type: Number,
    required: true,
  },
  amountOutMin: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Number,
    required: true,
  },
  path: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
