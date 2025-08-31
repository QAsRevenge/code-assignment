import {Umzug, SequelizeStorage} from 'umzug';
import {Sequelize} from 'sequelize';

function createUmzug(sequelize: Sequelize, logging = false) {
  return new Umzug({
    migrations: {glob: __dirname + '/migrations/*.js'},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      tableName: 'sequelize_meta',
      schema: 'data',
    }),
    logger: logging ? console : undefined,
  });
}

export {createUmzug};
