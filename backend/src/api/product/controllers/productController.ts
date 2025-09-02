import {Request} from 'express';
import {productService} from '../services/productService';
import {ProductSchema} from '../schemas/validation/ProductSchema';
import {ProductDetailSchema} from '../schemas/responses/ProductDetailSchema';
import {ProductListSchemaArray} from '../schemas/responses/ProductListSchema';
import {ProductList} from '../types/responses/ProductList';
import {ProductDetail} from '../types/responses/ProductDetail';

export async function createProduct(req: Request) {
  const safeParsedResult = ProductSchema.safeParse(req.body);
  if (!safeParsedResult.success) {
    return {status: 400, body: {error: safeParsedResult.error}};
  }
  const product = await productService.createProduct(safeParsedResult.data);
  return {status: 201, body: product};
}

export async function listProducts() {
  const products = await productService.listProducts();
  const formattedResult: ProductList[] = ProductListSchemaArray.parse(products);
  return {status: 200, body: formattedResult};
}

export async function getProductById(req: Request) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return {status: 400, body: {error: 'Invalid product id'}};
  }
  const product = await productService.getProductById(id);
  if (!product) {
    return {status: 404, body: {error: 'Product not found'}};
  }
  const formattedResult: ProductDetail = ProductDetailSchema.parse(product);
  return {status: 200, body: formattedResult};
}

export async function getProductTypes() {
  const productTypes = await productService.getProductTypes();
  return {status: 200, body: productTypes};
}

export async function getProductColours() {
  const colours = await productService.getProductColours();
  return {status: 200, body: colours};
}
