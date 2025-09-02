import {useEffect, useState} from 'react';

type Product = {
  id: number;
  name: string;
  productType: string;
  colours: string;
};

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
    }
    fetchProducts();
  }, []);

  return {products, error};
}
