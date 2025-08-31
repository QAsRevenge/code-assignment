import {z} from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const postgresEnvConfig = z
  .object({
    POSTGRES_HOST: z.string().default('localhost'),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_DB: z.string().default('postgres'),
    POSTGRES_DB_USER: z.string().default('app_user'),
    POSTGRES_DB_PASSWORD: z.string(),
  })
  .transform((o) => ({
    HOST: o.POSTGRES_HOST,
    PORT: o.POSTGRES_PORT,
    DATABASE: o.POSTGRES_DB,
    DB_USER: o.POSTGRES_DB_USER,
    DB_PASSWORD: o.POSTGRES_DB_PASSWORD,
  }));

const parsePostgresEnv = () => postgresEnvConfig.parse(process.env);

export {parsePostgresEnv};
