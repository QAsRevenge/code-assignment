import {SeqProductRepository} from '../repositories/SeqProductRepository';
import {Product as ProductInput} from '../types/validation/Product';

export class ProductService {
  constructor(private readonly productRepository: SeqProductRepository) {}

  public async createProduct(input: ProductInput) {
    return this.productRepository.createProduct(input);
  }

  public async listProducts(productTypeId?: number) {
    return this.productRepository.listProducts(productTypeId);
  }

  public async getProductById(id: number) {
    return this.productRepository.getProductById(id);
  }

  public async getProductTypes() {
    return this.productRepository.getProductTypes();
  }

  public async getProductColours() {
    return this.productRepository.getProductColours();
  }
}
