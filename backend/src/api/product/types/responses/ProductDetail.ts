import {z} from 'zod';
import {ProductDetailSchema} from '../../schemas/responses/ProductDetailSchema';

export type ProductDetail = z.infer<typeof ProductDetailSchema>;
