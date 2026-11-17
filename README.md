
# JimJam Store - E-commerce Admin Dashboard

A responsive React application for managing an online store. The dashboard allows administrators to view products, add new products, edit existing products, search products, and delete products.

## Features

- Dashboard with dynamic product statistics.
- View all available products.
- Search products by name.
- Add new products.
- View individual product details.
- Edit existing product information.
- Delete products.
- Responsive user interface.
- Automated component and functionality tests.

## Technologies Used

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Lucide React
- JSON Server
- Vitest
- React Testing Library

## Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   └── Sidebar.test.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── AddProduct.jsx
│   ├── EditProduct.jsx
│   └── ProductDetails.jsx
├── test/
│   └── setup.js
├── App.jsx
├── App.css
└── index.css

db.json
```

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd ecommerce-admin-dashboard
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the JSON Server in one terminal:

```bash
npx json-server db.json --port 3000
```

Start the React development server in another terminal:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## API Endpoint

The application uses JSON Server as a simulated backend.

Products endpoint:

```text
http://localhost:3000/products
```

Supported operations:

- GET - Retrieve products.
- POST - Add a product.
- PATCH - Update a product.
- DELETE - Remove a product.

## Testing

Run automated tests:

```bash
npm test
```

Run tests once without watch mode:

```bash
npm test -- --run
```

## Production Build

```bash
npm run build
```

## Code Quality

```bash
npm run lint
```

## Author

**Jonathan Jimmy Machora (JIMJAM)**
