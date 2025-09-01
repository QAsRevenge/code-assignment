import {Router, IRouter} from 'express';
import {createProduct} from '../controllers/productController';

const productRoutes: IRouter = Router();

productRoutes.post('/products', createProduct);

export {productRoutes};
