import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
  InternalLogFile: "internal.log",
  AvaxAddress: String(process.env.AVAX_CONTRACT_ADDRESS),
  PORT: String(process.env.PORT),
  EnableConsumer: process.env.ENABLE_CONSUMER === "true",
};

export default AppConfig;
