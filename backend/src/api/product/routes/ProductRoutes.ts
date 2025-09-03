import {Router, IRouter} from 'express';
import {controllerWrapper} from '../../utils/controllerWrapper';
import {ProductController} from '../controllers/ProductController';
import {ProductService} from '../services/ProductService';
import {SeqProductRepository} from '../repositories/SeqProductRepository';

export class ProductRoutes {
  public readonly router: IRouter;

  constructor() {
    const productController = new ProductController(
      new ProductService(new SeqProductRepository()),
    );
    this.router = Router();

    this.router.post(
      '/products',
      controllerWrapper(
        productController.createProduct.bind(productController),
      ),
    );
    this.router.get(
      '/products',
      controllerWrapper(productController.listProducts.bind(productController)),
    );
    this.router.get(
      '/products/:id',
      controllerWrapper(
        productController.getProductById.bind(productController),
      ),
    );
    this.router.get(
      '/product-types',
      controllerWrapper(
        productController.getProductTypes.bind(productController),
      ),
    );
    this.router.get(
      '/colours',
      controllerWrapper(
        productController.getProductColours.bind(productController),
      ),
    );
  }
}
