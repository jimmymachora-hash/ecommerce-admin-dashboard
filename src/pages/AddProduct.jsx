
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://jimjam-store-api.onrender.com/products";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [error, setError] = useState("");

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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add product.");
      }

      navigate("/products");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="form-page">
      <h1>Add New Product</h1>
      <p>Enter the details of your new product.</p>

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

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
