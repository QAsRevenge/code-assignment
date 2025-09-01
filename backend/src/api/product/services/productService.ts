import {Product} from '../../../repo/appdb/_sequelize/models/Product';
import {ProductColour} from '../../../repo/appdb/_sequelize/models/ProductColour';
import {Product as ProductInput} from '../types/Product';

export const productService = {
  async createProduct(input: ProductInput) {
    const product = await Product.create(
      {
        name: input.name,
        productTypeId: input.productTypeId,
        colours: input.colourIds.map((id) => ({id})),
      },
      {include: [ProductColour]},
    );
    return product;
  },
};
