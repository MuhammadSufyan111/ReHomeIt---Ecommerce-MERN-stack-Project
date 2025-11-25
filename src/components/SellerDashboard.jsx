import React, { useEffect, useState } from "react";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", stock: "", category: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const API_URL = "https://rehomeit-ecommerce-website.onrender.com/api/seller";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/my-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(data);
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.category) return alert("All fields required");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      const url = editingId ? `${API_URL}/product/${editingId}` : `${API_URL}/product`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");

      setForm({ name: "", price: "", stock: "", category: "", image: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, stock: product.stock, category: product.category, image: null });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/product/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error deleting");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>

      <form className="bg-white p-4 rounded mb-6 shadow-md max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">{editingId ? "Edit Product" : "Add Product"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full mb-2">
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Kitchen & Dining">Kitchen & Dining</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Sports & Outdoor">Sports & Outdoor</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Furniture">Furniture</option>
          <option value="Mobile">Mobile</option>
          <option value="Tools & Equipment">Tools & Equipment</option>
          <option value="Clothing & Accessories">Clothing & Accessories</option>
          <option value="Toys & Baby">Toys & Baby</option>


        </select>
        <input type="file" name="image" onChange={handleChange} className="mb-2" />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">My Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow-md">
              {p.image && (
                <img
                  src={`https://rehomeit-ecommerce-website.onrender.com/${p.image.replaceAll("\\", "/")}`}
                  alt={p.name}
                  className="h-40 w-full object-cover mb-2"
                />
              )}
              <h3 className="font-bold">{p.name}</h3>
              <p>Price: ${p.price}</p>
              <p>Stock: {p.stock}</p>
              <p>Category: {p.category}</p>
              <div className="mt-2 flex gap-2">
                <button className="bg-blue-500 text-white py-1 px-2 rounded" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
