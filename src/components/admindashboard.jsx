import React, { useEffect, useState } from "react";
import Header from "./header";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) =>
  u.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          fetch("https://rehomeit-ecommerce-website.onrender.com/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://rehomeit-ecommerce-website.onrender.com/api/admin/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://rehomeit-ecommerce-website.onrender.com/api/orders/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        setUsers(usersData || []);
        setProducts(productsData || []);
        setOrders(ordersData || []);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`https://rehomeit-ecommerce-website.onrender.com/api/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleUser = async (id) => {
    try {
      const res = await fetch(`https://rehomeit-ecommerce-website.onrender.com/api/admin/user/toggle/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isActive: data.user.isActive } : u))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`https://rehomeit-ecommerce-website.onrender.com/api/admin/product/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  return (
    <div>
    <div className="p-6 bg-gray-50 min-h-screen">
        
      <h1 className="text-3xl font-bold text-[#016B61] mb-8">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {["users", "products", "orders"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold capitalize ${
              activeTab === tab
                ? "text-[#016B61] border-b-4 border-[#016B61]"
                : "text-gray-500 hover:text-[#016B61]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "users" && (
  <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">

    <input
      type="text"
      placeholder="Search user by name..."
      className="mb-4 p-2 border rounded w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <h2 className="text-xl font-semibold mb-4">All Users</h2>

          <table className="w-full text-sm">
            <thead className="bg-[#016B61] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 text-center">{u.role}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        u.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleUser(u._id)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded mr-2"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "products" && (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <table className="w-full text-sm">
            <thead className="bg-[#016B61] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-left">Seller</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-center">{p.category}</td>
                  <td className="p-3 text-center">Rs {p.price}</td>
                  <td className="p-3 text-center">{p.stock}</td>
                  <td className="p-3">{p.seller?.name || "Unknown"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          <table className="w-full text-sm">
            <thead className="bg-[#016B61] text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3 text-left">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="p-3">{o._id.slice(-6)}</td>
                  <td className="p-3 text-center">{o.user?.name || "Unknown"}</td>
                  <td className="p-3 text-center">{o.status}</td>
                  <td className="p-3 text-center">Rs {o.totalAmount}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside">
                      {o.items.map((i) => (
                        <li key={i._id}>
                          {i.product?.name} × {i.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div></div>
  );
};

export default AdminDashboard;
