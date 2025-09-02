import {Router, IRouter} from 'express';
import {
  createProduct,
  getProductById,
  listProducts,
  getProductTypes,
  getProductColours,
} from '../controllers/productController';
import {controllerWrapper} from '../../utils/controllerWrapper';

const productRoutes: IRouter = Router();

productRoutes.post('/products', controllerWrapper(createProduct));
productRoutes.get('/products', controllerWrapper(listProducts));
productRoutes.get('/products/:id', controllerWrapper(getProductById));
productRoutes.get('/product-types', controllerWrapper(getProductTypes));
productRoutes.get('/colours', controllerWrapper(getProductColours));

export {productRoutes};
