import {describe, vi, beforeEach, it, expect} from 'vitest';
import {ProductService} from './ProductService';

describe('ProductService', () => {
  const repo = {
    createProduct: vi.fn(),
    listProducts: vi.fn(),
    getProductById: vi.fn(),
    getProductTypes: vi.fn(),
    getProductColours: vi.fn(),
  };
  const service = new ProductService(repo as any);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should call repository createProduct with correct input', async () => {
      const input = {name: 'Test Product', productTypeId: 1, colourIds: [1, 2]};
      await service.createProduct(input);
      expect(repo.createProduct).toHaveBeenCalledWith(input);
    });
  });

  describe('listProducts', () => {
    it('should call repository listProducts with productTypeId', async () => {
      await service.listProducts(1);
      expect(repo.listProducts).toHaveBeenCalledWith(1);
    });

    it('should call repository listProducts without productTypeId', async () => {
      await service.listProducts();
      expect(repo.listProducts).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getProductById', () => {
    it('should call repository getProductById with correct id', async () => {
      await service.getProductById(1);
      expect(repo.getProductById).toHaveBeenCalledWith(1);
    });
  });

  describe('getProductTypes', () => {
    it('should call repository getProductTypes', async () => {
      await service.getProductTypes();
      expect(repo.getProductTypes).toHaveBeenCalled();
    });
  });

  describe('getProductColours', () => {
    it('should call repository getProductColours', async () => {
      await service.getProductColours();
      expect(repo.getProductColours).toHaveBeenCalled();
    });
  });
});
