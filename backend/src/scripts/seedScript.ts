import fs from 'fs/promises';
import path from 'path';
import {ProductType} from '../_sequelize/models/ProductType';
import {Colour} from '../_sequelize/models/Colour';
import {initSequelize} from '../_sequelize/initSequelize';
import {Sequelize} from 'sequelize-typescript';

export async function seedData(sequelize: Sequelize) {
  await sequelize.authenticate();

  // Seed Product Types
  const productTypesPath = path.resolve(
    __dirname,
    '../scripts/data/product-types.txt',
  );
  const productTypes = (await fs.readFile(productTypesPath, 'utf-8'))
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  for (const type of productTypes) {
    await ProductType.findOrCreate({where: {productType: type}});
  }

  // Seed Colours
  const coloursPath = path.resolve(__dirname, '../scripts/data/colours.txt');
  const colours = (await fs.readFile(coloursPath, 'utf-8'))
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  for (const colour of colours) {
    await Colour.findOrCreate({where: {name: colour}});
  }
}

async function seedPostgres() {
  const sequelize = initSequelize();
  await sequelize.authenticate();
  await seedData(sequelize);
  await sequelize.close();
  console.log('Seeding postgres complete!');
}

if (require.main === module) {
  seedPostgres().catch(console.error);
}
