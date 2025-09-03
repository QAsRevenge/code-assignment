import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {Colour, Product, ProductColour, ProductType} from '../models';
import {SqlTestDb, SqlDbTestUtils} from 'test-utils';

describe('Product Model', () => {
  let testDb: SqlTestDb;
  const timeout = 60 * 1000;

  beforeAll(async () => {
    vi.setSystemTime(new Date('2025-01-01'));
    testDb = await SqlDbTestUtils.createDb();

    testDb.sequelize.addModels([Product, ProductColour, ProductType, Colour]);
  }, timeout);

  // This is very hacky and should be done in test-utils but for demonstration purposes..
  beforeEach(async () => {
    await testDb.sequelize.query(
      'TRUNCATE TABLE "data"."product_colours", "data"."products", "data"."colours", "data"."product_types" RESTART IDENTITY CASCADE;',
    );
  }, timeout);

  afterAll(async () => {
    if (testDb) {
      await testDb.close();
    }
  }, timeout);

  it(
    'can create a product',
    async () => {
      // Arrange
      const productType = await ProductType.create({
        productType: 'Test Type',
      });

      const product = await Product.create({
        name: 'Test Product',
        productTypeId: productType.id,
      });

      // Act & Assert
      expect(await Product.findByPk(product.id)).toMatchSnapshot();
    },
    timeout,
  );

  it(
    'cannot create Product with name as null',
    async () => {
      // Act & Assert
      const productType = await ProductType.create({productType: 'Test Type'});
      await expect(
        Product.create({name: null, productTypeId: productType.id}),
      ).rejects.toThrowError('notNull Violation: Product.name cannot be null');
    },
    timeout,
  );

  it(
    'cannot create Product with productTypeId as null',
    async () => {
      // Act & Assert
      await expect(
        Product.create({name: 'Test Product', productTypeId: null}),
      ).rejects.toThrowError(
        /notNull Violation: Product.productTypeId cannot be null/,
      );
    },
    timeout,
  );
});
