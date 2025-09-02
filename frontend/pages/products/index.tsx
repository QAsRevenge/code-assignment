import {useEffect, useState} from 'react';

type Product = {
  id: number;
  name: string;
  productType: string;
  colours: string;
};

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:3001/products');
        console.log(res);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Colours</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.productType}</td>
              <td>{p.colours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
