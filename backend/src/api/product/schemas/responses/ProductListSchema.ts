import {z} from 'zod';

const ProductListSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    productType: z.object({productType: z.string()}),
    colours: z.array(z.object({name: z.string()})),
  })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    productType: data.productType.productType,
    colours: data.colours.map((c) => c.name).join(', '),
  }));

const ProductListSchemaArray = z.array(ProductListSchema);

export {ProductListSchema, ProductListSchemaArray};
