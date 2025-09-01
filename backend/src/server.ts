import express from 'express';
import {productRoutes} from './api/product/routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(productRoutes);

app.get('/', (_req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
