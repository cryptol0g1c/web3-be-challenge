import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.RPC_URL || '';
const TRANSACTION_ADDRESS = process.env.TRANSACTION_ADDRESS || '';
const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9650;

const config = {
  ethers: {
    rpcUrl: RPC_URL,
    transactionAddress: TRANSACTION_ADDRESS,
  },
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

export default config;
