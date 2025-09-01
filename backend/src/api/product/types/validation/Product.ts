import {ProductSchema} from '../../schemas/validation/ProductSchema';
import {z} from 'zod';

export type Product = z.infer<typeof ProductSchema>;
