import {Router, IRouter} from 'express';
import {
  createProduct,
  getProductById,
  listProducts,
} from '../controllers/productController';
import {controllerWrapper} from '../../utils/controllerWrapper';

const productRoutes: IRouter = Router();

productRoutes.post('/products', controllerWrapper(createProduct));
productRoutes.get('/products', controllerWrapper(listProducts));
productRoutes.get('/products/:id', controllerWrapper(getProductById));

export {productRoutes};
