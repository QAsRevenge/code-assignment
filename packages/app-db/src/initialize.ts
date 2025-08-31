import {Sequelize} from 'sequelize-typescript';
import {createDb, DEFAULT_POSTGRES_PROPS} from './createDb';
import {PostgresDatabase} from 'app-constants';

async function initialize() {
  const adminSequelize = new Sequelize({
    ...DEFAULT_POSTGRES_PROPS,
    logging: console.log,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
  });

  await createDb(PostgresDatabase.POSTGRES_DB, adminSequelize);
}

initialize()
  .then(() => {
    console.log('Database setup completed successfully.');
  })
  .catch((error) => {
    console.error('Error during database setup:', error);
  });
