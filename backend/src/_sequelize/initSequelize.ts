import {Sequelize} from 'sequelize-typescript';
import {SCHEMA_NAME} from './constants';
import * as models from './models';
import {parsePostgresEnv} from '../config/postgres';

const DEFAULT_SCHEMA = SCHEMA_NAME.DATA;

/**
 * Initializes a Sequelize instance with the provided configuration.
 * If configuration is not provided, it defaults the settings.
 *
 * @returns An instance of Sequelize configured for the application.
 * @throws If there is an error during initialization.
 */
function initSequelize(): Sequelize {
  const postgresEnv = parsePostgresEnv();

  return new Sequelize({
    database: postgresEnv.database,
    host: postgresEnv.host,
    dialect: 'postgres',
    username: postgresEnv.username,
    password: postgresEnv.password,
    port: postgresEnv.port,
    logging: false,
    models: Object.values(models),
    define: {
      // Use snake_case for table names and column names
      // to comply with postgres naming conventions
      underscored: true,
      schema: DEFAULT_SCHEMA,
    },
  });
}

export {initSequelize};
