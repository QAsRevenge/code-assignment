import {z} from 'zod';
import {ProductListSchema} from '../../schemas/responses/ProductListSchema';

export type ProductList = z.infer<typeof ProductListSchema>;
