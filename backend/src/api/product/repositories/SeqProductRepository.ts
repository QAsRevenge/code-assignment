import {ProductType, Colour, Product} from '../../../_sequelize/models';
import {ProductDetailSchema} from '../schemas/responses/ProductDetailSchema';
import {ProductListSchemaArray} from '../schemas/responses/ProductListSchema';
import {ProductDetail} from '../types/responses/ProductDetail';
import {ProductList} from '../types/responses/ProductList';
import {Product as ProductInput} from '../types/validation/Product';
import {ProductRepository} from './ProductRepository';

export class SeqProductRepository implements ProductRepository {
  async createProduct(input: ProductInput): Promise<void> {
    const product: Product = await Product.create({
      name: input.name,
      productTypeId: input.productTypeId,
    });
    await product.$set('colours', input.colourIds);
  }
  async listProducts(productTypeId?: number): Promise<ProductList[]> {
    const where = productTypeId ? {productTypeId: productTypeId} : {};
    const products = await Product.findAll({
      where,
      attributes: ['id', 'name'],
      include: [
        {model: ProductType, attributes: ['productType']},
        {model: Colour, attributes: ['name'], through: {attributes: []}},
      ],
      order: [['createdAt', 'DESC']],
    });
    return ProductListSchemaArray.parse(products);
  }
  async getProductById(id: number): Promise<ProductDetail> {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductType,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Colour,
          attributes: {exclude: ['createdAt', 'updatedAt']},
          through: {attributes: []},
        },
      ],
      attributes: {exclude: ['createdAt', 'updatedAt']},
    });
    return ProductDetailSchema.parse(product);
  }
  getProductTypes(): Promise<ProductType[]> {
    return ProductType.findAll({
      attributes: ['id', 'productType'],
    });
  }
  getProductColours(): Promise<Colour[]> {
    return Colour.findAll({attributes: ['id', 'name']});
  }
}
