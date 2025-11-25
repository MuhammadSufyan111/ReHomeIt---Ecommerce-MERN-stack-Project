import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://rehomeit-ecommerce-website.onrender.com/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setOrders(data || []);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-xl font-semibold">You must be logged in to view your orders.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-lg">Loading your orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-xl font-semibold">No orders found</h2>
        <p className="text-sm">You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#016B61] mb-6">My Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-[#016B61] text-white">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-600">{order._id.slice(-6)}</td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {order.items && order.items.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {order.items.map((item) => (
                        <li key={item._id}>
                          {item.product?.name || "Unknown Product"} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-semibold">
                  Rs {order.totalAmount?.toLocaleString() || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
