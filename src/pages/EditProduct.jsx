
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      navigate(`/products/${id}`);
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="form-page">
      <h1>Edit Product</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={formData.category} onChange={handleChange} required />

        <label htmlFor="price">Price (KSh)</label>
        <input id="price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} required />

        <label htmlFor="stock">Stock Quantity</label>
        <input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="image">Image URL</label>
        <input id="image" name="image" type="url" value={formData.image} onChange={handleChange} required />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
