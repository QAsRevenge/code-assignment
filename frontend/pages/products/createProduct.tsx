import {useState, useEffect} from 'react';

type ProductType = {id: number; productType: string};
type Colour = {id: number; name: string};

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [productTypeId, setProductTypeId] = useState<number>();
  const [colourIds, setColourIds] = useState<number[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [typesRes, coloursRes] = await Promise.all([
          fetch('http://localhost:3001/product-types'),
          fetch('http://localhost:3001/colours'),
        ]);
        if (!typesRes.ok || !coloursRes.ok)
          throw new Error('Failed to fetch options');
        setProductTypes(await typesRes.json());
        setColours(await coloursRes.json());
      } catch (error) {
        console.error(error);
        setError(error.message || 'Unknown error');
      }
    }
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, productTypeId, colourIds}),
      });
      if (!res.ok) throw new Error('Failed to create product');
      setSuccess('Product created!');
      setName('');
      setProductTypeId(undefined);
      setColourIds([]);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {success && <div style={{color: 'green'}}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{' '}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Product Type:
            <select
              value={productTypeId ?? ''}
              onChange={(e) => setProductTypeId(Number(e.target.value))}
              required
            >
              <option value="">Select type</option>
              {productTypes.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.productType}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Colours:
            <select
              multiple
              value={colourIds.map(String)}
              onChange={(e) =>
                setColourIds(
                  Array.from(e.target.selectedOptions, (o) => Number(o.value)),
                )
              }
            >
              {colours.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
