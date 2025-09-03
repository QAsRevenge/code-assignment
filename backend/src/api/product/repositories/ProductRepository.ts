import {Colour, ProductType} from '../../../repo/appdb/_sequelize/models';
import {ProductDetail} from '../types/responses/ProductDetail';
import {ProductList} from '../types/responses/ProductList';

export interface ProductRepository {
  /**
   * Creates a new product with the specified details.
   * @param product - An object containing the product details:
   * @returns A promise that resolves when the product is successfully created.
   * */
  createProduct(product: {
    name: string;
    productTypeId: number;
    colourIds: number[];
  }): Promise<void>;

  /**
   * Retrieves a list of products
   * @returns A promise that resolves to an array of products
   * @param productTypeId - Optional ID to filter products by their type.
   * */
  listProducts(productTypeId?: number): Promise<ProductList[]>;

  /**
   * Retrieves detailed information about a specific product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the product details, or null if not found.
   * */
  getProductById(id: number): Promise<ProductDetail>;

  /**
   * Retrieves a list of all product types.
   * @returns A promise that resolves to an array of product types.
   * */
  getProductTypes(): Promise<ProductType[]>;

  /**
   * Retrieves a list of all available colours.
   * @returns A promise that resolves to an array of colours.
   * */
  getProductColours(): Promise<Colour[]>;
}
