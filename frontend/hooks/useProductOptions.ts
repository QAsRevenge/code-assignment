import {useState, useEffect} from 'react';

type ProductType = {id: number; productType: string};
type Colour = {id: number; name: string};

export function useProductOptions() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        const [typesRes, coloursRes] = await Promise.all([
          fetch('http://localhost:3001/product-types'),
          fetch('http://localhost:3001/colours'),
        ]);
        if (!typesRes.ok || !coloursRes.ok)
          throw new Error('Failed to fetch options');
        setProductTypes(await typesRes.json());
        setColours(await coloursRes.json());
        setError(null);
      } catch (error: any) {
        setError(error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchOptions();
  }, []);

  return {productTypes, colours, loading, error};
}
