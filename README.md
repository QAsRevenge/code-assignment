## Usage

This application uses pnpm as package manager to facilitate a monorepo structure,
with workspaces and simulated package private.

The backend is built with Node.js, Express, and Postgres.
It utilizes Sequelize as the ORM and Umzug (a sister project of sequelize) for database migrations.
The frontend is built with Next.js.

To get started:

1. Clone the repository
2. Run `pnpm install`
3. Copy the envTemplates to .env files in both the backend and `packages/app-db` directories
4. In the root, run `docker-compose up --build`, this will start both the backend and frontend.
5. If the postgres database is not initialized, you need to run the migration scripts
   - Navigate to the backend directory
   - Run `pnpm db:up` to create the tables and schemas in the database.
6. To seed the Postgres database, run `pnpm db:seed` in the backend directory.

The frontend will be available at `http://localhost:3002` and the backend at `http://localhost:3001`.

pgAdmin will also be available at `http://localhost:5050` if you want to inspect the database.

The backend exposes these endpoints:

- `POST /products` - Create a new product
- `GET /products` - Get a list of products
- `GET /products/:id` - Get details of a product by ID
- `GET /product-types` - Get a list of product product-types
- `GET /colours` - Get a list of colours

The frontend has two pages:

- `/products` - Shows a table of all products in the database
- `/products/createProduct` - A form to create a new product

## Objective

- Develop a REST API that reads information about products from database. You can use C#, JavaScript or GO. You can use any database engine.
- Develop a frontend for it using React or any other library you prefer.
- You can use any libraries or tools you prefer.
- Publish your project to Github and be ready to share it. Preferably keep git history of your work. - Share link to Github one working day before interview to recruiter.

## Data model

The database should be capable of storing information about the following entities:

- _Product_
  Each product should have a Name (text), a Product Type, and multiple associated Colours. - _Product Type_
- _Colour_
  For example, a Product with id = 1 could have Product Type = Sofa and Colours = Blue, Ruby. You may add additional tables and columns as needed.

## Sample Data Loading

Load the contents of product-types.txt into the ProductType table. Do the same for colours.txt and Colour table.

## API Endpoints

Create the following endpoints:

- Add a new product. The payload must contain: name, product type id, colour id.
- Returns a list of products. The payload must contain: id, name of product.
- Returns details about a product by id. The payload must contain: id, name, product type, colours associated with that product.

## User interface

The user interface should have two pages:

- Create a New Product: A page to create a new product.
- View Products List: A page displaying a list of products in a table with the following columns: Product Id, Product Name, Product Type, and a comma-separated list of Colours. The data should be ordered by the creation date, with the newest entries at the top.
