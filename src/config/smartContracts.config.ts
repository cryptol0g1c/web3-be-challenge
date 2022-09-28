import dotenv from "dotenv";
dotenv.config();

const SmartContractConfig = {
  AVALANCHE_NETWORK: String(process.env.AVALANCHE_NETWORK),
  JOE_DOE_CONTRACT_ADDRESS: String(process.env.JOE_DOE_CONTRACT_ADDRESS),
  AVAX_CONTRACT_ADDRESS: String(process.env.AVAX_CONTRACT_ADDRESS),
  SNOWTRACE_API: String(process.env.SNOWTRACE_API),
  SNOWTRACE_API_KEY: String(process.env.SNOWTRACE_API_KEY),
};

export default SmartContractConfig;
