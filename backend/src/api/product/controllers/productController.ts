import {Request} from 'express';
import {ProductService} from '../services/ProductService';
import {ProductSchema} from '../schemas/validation/ProductSchema';

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  async createProduct(req: Request) {
    const safeParsedResult = ProductSchema.safeParse(req.body);
    if (!safeParsedResult.success) {
      return {status: 400, body: {error: safeParsedResult.error}};
    }
    const product = await this.productService.createProduct(
      safeParsedResult.data,
    );
    return {status: 201, body: product};
  }

  async listProducts() {
    const products = await this.productService.listProducts();
    return {status: 200, body: products};
  }

  async getProductById(req: Request) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return {status: 400, body: {error: 'Invalid product id'}};
    }
    const product = await this.productService.getProductById(id);
    if (!product) {
      return {status: 404, body: {error: 'Product not found'}};
    }
    return {status: 200, body: product};
  }

  async getProductTypes() {
    const productTypes = await this.productService.getProductTypes();
    return {status: 200, body: productTypes};
  }

  async getProductColours() {
    const colours = await this.productService.getProductColours();
    return {status: 200, body: colours};
  }
}
