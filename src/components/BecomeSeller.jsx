import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "seller") {
      navigate("/seller/dashboard");
    }
  }, [navigate]);

  const handleUpgrade = async () => {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/seller/become`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      console.log(res);
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.role = "seller";
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("🎉 You are now a seller! Redirecting...");
      setTimeout(() => navigate("/seller/dashboard"), 1500);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fffd] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-[#016B61]/20 text-center">
        <h2 className="text-2xl font-bold text-[#016B61] mb-4">
          Upgrade to Seller
        </h2>
        <p className="text-gray-600 mb-6">
          Click the button below to become a seller on <b>RehomeIt</b>.
        </p>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-[#016B61] text-white py-2 rounded-md font-semibold hover:bg-[#007e71] transition-all disabled:opacity-70"
        >
          {loading ? "Upgrading..." : "Become a Seller"}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("🎉") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BecomeSeller;
