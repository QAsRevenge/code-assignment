import fs from 'fs/promises';
import path from 'path';
import {ProductType} from '../repo/appdb/_sequelize/models/ProductType';
import {Colour} from '../repo/appdb/_sequelize/models/Colour';
import {initSequelize} from '../repo/appdb/_sequelize/initSequelize';

async function seed() {
  const sequelize = initSequelize();
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

  await sequelize.close();
  console.log('Seeding complete!');
}
