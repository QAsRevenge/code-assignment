import {productSchema} from '../schemas/productSchema';
import {z} from 'zod';

export type Product = z.infer<typeof productSchema>;
