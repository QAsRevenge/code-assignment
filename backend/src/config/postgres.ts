import {z} from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const postgresEnvConfig = z
  .object({
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
  })
  .transform((o) => ({
    host: o.POSTGRES_HOST,
    port: o.POSTGRES_PORT,
    username: o.POSTGRES_USER,
    password: o.POSTGRES_PASSWORD,
    database: o.POSTGRES_DB,
  }));

const parsePostgresEnv = () => postgresEnvConfig.parse(process.env);

export {parsePostgresEnv};
