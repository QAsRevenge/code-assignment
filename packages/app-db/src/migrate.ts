import {Sequelize} from 'sequelize';
import {createUmzug} from './createUmzug';

async function migrate(sequelize: Sequelize) {
  await createUmzug(sequelize).up();
}

export {migrate};
