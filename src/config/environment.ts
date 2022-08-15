import dotenv from 'dotenv';
dotenv.config();

interface Environment {
    RPC: string | undefined,
    PORT: number,
    NODE_ENV:string | undefined,
    API_VERSION:string,
    MONGO_URI: string,
    DB_NAME: string,
}

const configEnv = (): Environment => {
    return {
        RPC: process.env.RPC,
        PORT: process.env.PORT ? Number(process.env.PORT): 5001,
        NODE_ENV: process.env.NODE_env,
        API_VERSION: process.env.API_VERSION? process.env.API_VERSION : 'v1',
        MONGO_URI: process.env.MONGO_URI!,
        DB_NAME: process.env.DB_NAME!,
    }
}

export const config = configEnv();
