import {z} from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1),
  productTypeId: z.number().int(),
  colourIds: z.array(z.number().int()).min(1),
});

export {ProductSchema};
