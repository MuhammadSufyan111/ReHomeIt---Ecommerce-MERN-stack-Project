import React, { useEffect, useState } from "react";
import { refreshCartCount } from "./header";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
    useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  

  const fetchCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.cart && Array.isArray(data.cart.items)) {
        setCartItems(data.cart.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Fetch cart failed:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (res.ok) {
        fetchCart();
        refreshCartCount(); 
      }
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCart();
        refreshCartCount(); 
      } else {
        alert(data.message || "Failed to remove product");
      }
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  const handleOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        setCartItems([]);
        refreshCartCount();
      } else {
        alert(data.message || "Order failed.");
      }
    } catch (err) {
      alert("Something went wrong while placing order.");
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
        
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${item.product.image}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.product.name}</h2>
                    <p className="text-gray-600">
                      Rs {item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-bold">
                Total: Rs {totalPrice.toLocaleString()}
              </h2>
              <button
                onClick={handleOrder}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
