import {useEffect, useState} from 'react';
import {useProductOptions} from '@/hooks/useProductOptions';
import {useCreateProduct} from '@/hooks/useCreateProduct';
import styles from './createProduct.module.css';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [productTypeId, setProductTypeId] = useState<number>();
  const [colourIds, setColourIds] = useState<number[]>([]);
  const {
    productTypes,
    colours,
    loading: optionsLoading,
    error: optionsError,
  } = useProductOptions();

  const {
    createProduct,
    loading: createLoading,
    error: createError,
    success,
  } = useCreateProduct();

  useEffect(() => {
    if (success) {
      setName('');
      setProductTypeId(undefined);
      setColourIds([]);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({name, productTypeId, colourIds});
  };

  if (optionsLoading) return <div>Loading options...</div>;

  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>
      {optionsError && <div className={styles.error}>{optionsError}</div>}
      {createError && <div className={styles.error}>{createError}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>
            Name:{' '}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={createLoading}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label>
            Product Type:
            <select
              value={productTypeId ?? ''}
              onChange={(e) => setProductTypeId(Number(e.target.value))}
              required
              disabled={createLoading}
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
        <div className={styles.field}>
          <label>Colours:</label>
          <ul className={styles.checkboxList}>
            {colours.map((c) => (
              <li key={c.id} className={styles.checkboxItem}>
                <label>
                  <input
                    type="checkbox"
                    value={c.id}
                    checked={colourIds.includes(c.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColourIds([...colourIds, c.id]);
                      } else {
                        setColourIds(colourIds.filter((id) => id !== c.id));
                      }
                    }}
                    disabled={createLoading}
                  />
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" disabled={createLoading}>
          {createLoading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
