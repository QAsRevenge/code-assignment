import {Request, Response} from 'express';
import {productService} from '../services/productService';
import {productSchema} from '../schemas/productSchema';

export async function createProduct(req: Request, res: Response) {
  const parsedResult = productSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(400).json({error: parsedResult.error});
  }
  console.log(parsedResult.data);
  try {
    const product = await productService.createProduct(parsedResult.data);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create product'});
  }
}
