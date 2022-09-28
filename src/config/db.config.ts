import dotenv from "dotenv";
dotenv.config();

const DbConfig = {
  DB_HOST: String(process.env.MONGODB_HOST),
  DB_USER: String(process.env.MONGODB_USER),
  DB_PASSWORD: String(process.env.MONGODB_PASSWORD),
};

export default DbConfig;
