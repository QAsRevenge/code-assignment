import {Dialect} from 'sequelize';
import {Sequelize} from 'sequelize-typescript';
import {SCHEMA_NAME} from 'app-constants';
import {migrate} from 'app-db';

const DEFAULT_POSTGRES_PROPS = {
  host: 'localhost',
  dialect: 'postgres' as Dialect,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  logging: false,
  define: {
    underscored: true,
  },
  dialectOptions: {
    multipleStatements: true,
  },
};

type SqlProps = {
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  dialect?: Dialect;
  logging?: boolean;
};

export class SqlDbTestUtils {
  public static async createDb(sqlProps?: SqlProps) {
    const dbName = sqlProps?.database || 'test_db';
    const props: SqlProps = {...DEFAULT_POSTGRES_PROPS, ...sqlProps};
    const adminSequelize = new Sequelize({
      ...props,
      ...DEFAULT_POSTGRES_PROPS,
    });
    // Check if DB exists, create if not
    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`,
    );
    if ((results as any[]).length === 0) {
      await adminSequelize.query(`CREATE DATABASE "${dbName}";`);
    }

    // Connect to the new DB
    const sequelize = new Sequelize({
      ...DEFAULT_POSTGRES_PROPS,
      username: adminSequelize.config.username!,
      password: adminSequelize.config.password!,
      database: dbName,
    });

    // Create "data" schema if not exists
    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${SCHEMA_NAME.DATA}";`);
    await migrate(sequelize);
    return {
      dbName,
      sequelize,

      async close() {
        if (!sequelize) {
          throw new Error('Sequelize instance is not defined.');
        }
        await sequelize.close();
      },
    };
  }
}

export type SqlTestDb = Awaited<ReturnType<typeof SqlDbTestUtils.createDb>>;
