import {useState} from 'react';

type CreateProductInput = {
  name: string;
  productTypeId?: number;
  colourIds: number[];
};

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createProduct = async (input: CreateProductInput) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error('Failed to create product');
      setSuccess('Product created!');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {createProduct, loading, error, success};
}
