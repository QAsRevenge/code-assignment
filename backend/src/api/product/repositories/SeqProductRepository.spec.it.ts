import {SqlDbTestUtils, SqlTestDb} from 'test-utils';
import {SeqProductRepository} from './SeqProductRepository';
import {
  describe,
  beforeAll,
  vi,
  it,
  expect,
  beforeEach,
  afterAll,
} from 'vitest';
import {
  Product,
  Colour,
  ProductType,
  ProductColour,
} from '../../../_sequelize/models';

describe('SeqProductRepository', () => {
  let productRepo: SeqProductRepository;
  let testDb: SqlTestDb;
  const timeout = 10 * 6000;

  beforeAll(async () => {
    vi.setSystemTime(new Date('2025-01-01'));
    testDb = await SqlDbTestUtils.createDb();
    testDb.sequelize.addModels([Product, Colour, ProductType, ProductColour]);
    productRepo = new SeqProductRepository();
  }, timeout);

  // This is very hacky and should be done in test-utils but for demonstration purposes..
  beforeEach(async () => {
    await testDb.sequelize.query(
      'TRUNCATE TABLE "data"."product_colours", "data"."products", "data"."colours", "data"."product_types" RESTART IDENTITY CASCADE;',
    );
  }, timeout);

  afterAll(async () => {
    await testDb.close();
  });

  it('should create a product', async () => {
    const colour1 = await Colour.create({name: 'Red', id: 1});
    const colour2 = await Colour.create({name: 'Blue', id: 2});
    const productType = await ProductType.create({productType: 'Shirt', id: 1});

    await productRepo.createProduct({
      name: 'Test Shirt',
      productTypeId: productType.id,
      colourIds: [colour1.id, colour2.id],
    });

    const products = await Product.findAll({
      include: [{model: Colour}, {model: ProductType}],
    });
    expect(products).toMatchSnapshot();
  });

  it('should list products with no productTypeId specified', async () => {
    const colour1 = await Colour.create({name: 'Red'});
    const colour2 = await Colour.create({name: 'Blue'});
    const productType1 = await ProductType.create({productType: 'Shirt'});
    const productType2 = await ProductType.create({productType: 'Pants'});

    const product1 = await Product.create({
      name: 'Test Shirt 1',
      productTypeId: productType1.id,
      createdAt: new Date('2024-01-01'),
    });
    await product1.$set('colours', [colour1.id]);

    const product2 = await Product.create({
      name: 'Test Pants 1',
      productTypeId: productType2.id,
      createdAt: new Date('2024-06-01'),
    });
    await product2.$set('colours', [colour2.id]);

    const products = await productRepo.listProducts();
    expect(products).toMatchSnapshot();
  });

  it('should list products with productTypeId specified', async () => {
    const colour1 = await Colour.create({name: 'Red'});
    const colour2 = await Colour.create({name: 'Blue'});
    const productType1 = await ProductType.create({productType: 'Shirt'});
    const productType2 = await ProductType.create({productType: 'Pants'});

    const product1 = await Product.create({
      name: 'Test Shirt 1',
      productTypeId: productType1.id,
      createdAt: new Date('2024-01-01'),
    });
    await product1.$set('colours', [colour1.id]);

    const product2 = await Product.create({
      name: 'Test Pants 1',
      productTypeId: productType2.id,
      createdAt: new Date('2024-06-01'),
    });
    await product2.$set('colours', [colour2.id]);

    const products = await productRepo.listProducts(productType1.id);
    expect(products).toMatchSnapshot();
  });

  it('should get product by id', async () => {
    const colour1 = await Colour.create({name: 'Red'});
    const colour2 = await Colour.create({name: 'Blue'});
    const productType1 = await ProductType.create({productType: 'Shirt'});

    const product1 = await Product.create({
      name: 'Test Shirt 1',
      productTypeId: productType1.id,
      createdAt: new Date('2024-01-01'),
    });
    await product1.$set('colours', [colour1.id, colour2.id]);

    const product = await productRepo.getProductById(product1.id);
    expect(product).toMatchSnapshot();
  });

  it('should get all product types', async () => {
    await ProductType.create({productType: 'Shirt'});
    await ProductType.create({productType: 'Pants'});

    const productTypes = await productRepo.getProductTypes();
    expect(productTypes).toMatchSnapshot();
  });

  it('should get all product colours', async () => {
    await Colour.create({name: 'Red'});
    await Colour.create({name: 'Blue'});

    const colours = await productRepo.getProductColours();
    expect(colours).toMatchSnapshot();
  });
});
