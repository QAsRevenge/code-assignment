import {
  Product,
  Colour,
  ProductType,
} from '../../../repo/appdb/_sequelize/models';
import {Product as ProductInput} from '../types/validation/Product';

export const productService = {
  async createProduct(input: ProductInput) {
    const product: Product = await Product.create({
      name: input.name,
      productTypeId: input.productTypeId,
    });
    await product.$set('colours', input.colourIds);
    return product;
  },

  async listProducts(productTypeId?: number) {
    const where = productTypeId ? {productTypeId: productTypeId} : {};
    return Product.findAll({
      where,
      attributes: ['id', 'name'],
      include: [
        {model: ProductType, attributes: ['productType']},
        {model: Colour, attributes: ['name'], through: {attributes: []}},
      ],
      order: [['createdAt', 'DESC']],
    });
  },

  async getProductById(id: number) {
    return Product.findByPk(id, {
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
  },
};
