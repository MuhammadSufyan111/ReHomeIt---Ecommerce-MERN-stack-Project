import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onClose, onProductAdded }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/seller/products", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Product added successfully!");
      onProductAdded();
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#016B61]">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Product Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
            value={form.price}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="border p-2 rounded"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Home Appliances</option>
            <option>Groceries</option>
            <option>Sports</option>
            <option>Toys</option>
          </select>
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            className="border p-2 rounded"
            value={form.stock}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={form.image}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-[#016B61] text-white py-2 rounded hover:bg-[#028f7e]"
          >
            Add Product
          </button>
        </form>

        {message && (
          <p className="text-center text-[#016B61] mt-3">{message}</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
