import mongoose from 'mongoose';

export interface TransactionEvent {
  name: string;
  signature: string;
  arguments: any;
}
export interface TransactionInfo {
    hash: string
    blockNumber?: number
    blockHash?: string
    timestamp?: number
    confirmations: number
    from: string
    raw?: string
    to: string
    events: TransactionEvent[]
}

export interface TransactionDocument extends TransactionInfo, mongoose.Document {
  createdAt: Date;
}

const transactionSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  confirmations: {
    type: Number,
    required: true,
  },
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Number,
    required: false,
  },
  raw: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  to: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
});

transactionSchema.index({ createdAt: 1 });

export default mongoose.model<TransactionDocument>('Transaction', transactionSchema);
