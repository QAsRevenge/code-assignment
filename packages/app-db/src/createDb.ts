import {Dialect} from 'sequelize';
import {Sequelize} from 'sequelize-typescript';
import {SCHEMA_NAME} from 'app-constants';

const DEFAULT_POSTGRES_PROPS = {
  host: 'localhost',
  dialect: 'postgres' as Dialect,
  logging: false,
  define: {
    underscored: true,
  },
  dialectOptions: {
    multipleStatements: true,
  },
};

async function createDb(dbToCreate: string, adminSequelize: Sequelize) {
  // Create DB if not exists
  await adminSequelize.query(`DO $$
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${dbToCreate}') THEN
        CREATE DATABASE "${dbToCreate}";
      END IF;
    END
  $$;`);

  await adminSequelize.close();

  // Connect to the new DB
  const dbSequelize = new Sequelize({
    ...DEFAULT_POSTGRES_PROPS,
    username: adminSequelize.config.username!,
    password: adminSequelize.config.password!,
    database: dbToCreate,
  });

  // Create "data" schema if not exists
  await dbSequelize.query(`CREATE SCHEMA IF NOT EXISTS "${SCHEMA_NAME.DATA}";`);

  await dbSequelize.close();

  console.log('Database, and schemas created!');
}

export {createDb, DEFAULT_POSTGRES_PROPS};
