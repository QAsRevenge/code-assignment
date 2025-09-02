import express from 'express';
import {productRoutes} from './api/product/routes/productRoutes';
import {initSequelize} from './repo/appdb/_sequelize/initSequelize';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(productRoutes);

app.get('/', (_req, res) => {
  res.send('API is running!');
});

async function startServer() {
  try {
    const sequelize = initSequelize();
    await sequelize.authenticate();
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
}

startServer();
