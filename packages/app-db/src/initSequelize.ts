import {Sequelize} from 'sequelize-typescript';
import {parsePostgresEnv} from './config/postgres';
import {Dialect} from 'sequelize';

const postgresEnv = parsePostgresEnv();

/**
 * Initializes a Sequelize instance with configuration from environment
 * variables.
 *
 * @returns An instance of Sequelize configured for the application.
 * @throws If there is an error during initialization.
 */
function initSequelize(): Sequelize {
  return new Sequelize({
    database: postgresEnv.DATABASE,
    host: postgresEnv.HOST,
    dialect: 'postgres' as Dialect,
    port: postgresEnv.PORT,
    logging: false,
    username: postgresEnv.DB_USER,
    password: postgresEnv.DB_PASSWORD,
    define: {
      underscored: true,
    },
  });
}

export {initSequelize};
