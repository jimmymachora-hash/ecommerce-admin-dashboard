
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <header className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage all products in your store.</p>
        </div>

        <Link to="/products/add" className="add-button">
          <PlusCircle size={18} />
          Add Product
        </Link>
      </header>

      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <strong>
                KSh {Number(product.price).toLocaleString()}
              </strong>
              <p>Stock: {product.stock}</p>
              <Link to={`/products/${product.id}`}>
                View Details
              </Link>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
