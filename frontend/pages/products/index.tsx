import {useFetchProducts} from '@/hooks/useFetchProducts';
import styles from './index.module.css';

export default function ProductsListPage() {
  const {products, error} = useFetchProducts();

  return (
    <div className={styles.container}>
      <h1>Products List</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <table className={styles.table}>
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
