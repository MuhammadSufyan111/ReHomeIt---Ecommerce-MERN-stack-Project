import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { refreshCartCount } from "./header";

const API_URL = "http://localhost:5000/api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) return alert("Please log in first!");
    if (quantity < 1 || quantity > product.stock) return alert("Invalid quantity");
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id, quantity }),
    });

    const data = await res.json();
    
    if (res.ok) { 
      refreshCartCount();
      alert("Added to cart!"); 
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`http://localhost:5000/${product.image}`}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-2">
            Rs {product.price.toLocaleString()}
          </p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">Stock Available: {product.stock}</p>

          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-1 w-20"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
