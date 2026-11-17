
import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(fetch("https://jimjam-store-api.onrender.com/products"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) => Number(product.stock) < 10
  ).length;

  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening in your store.</p>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      <section className="stats-grid">
        <div className="stat-card">
          <Package />
          <h3>Total Products</h3>
          <p>{loading ? "Loading..." : totalProducts}</p>
        </div>

        <div className="stat-card">
          <ShoppingCart />
          <h3>Total Orders</h3>
          <p>0</p>
        </div>

        <div className="stat-card">
          <DollarSign />
          <h3>Total Revenue</h3>
          <p>KSh 0</p>
        </div>

        <div className="stat-card">
          <AlertTriangle />
          <h3>Low Stock</h3>
          <p>{loading ? "Loading..." : lowStock}</p>
        </div>
      </section>

      <section className="welcome-card">
        <h2>Welcome to JimJam Store</h2>
        <p>
          Manage your products, monitor stock levels, and keep
          your store organized from one place.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
