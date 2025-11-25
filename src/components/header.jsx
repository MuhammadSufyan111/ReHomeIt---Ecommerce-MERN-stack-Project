import React, { useState, useEffect } from "react";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export let refreshCartCount = () => {};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchCartCount = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://rehomeit-ecommerce-website.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.cart?.items) {
        const count = data.cart.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setCartCount(count);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
    refreshCartCount = fetchCartCount; 
  }, [token]);

  const categories = [
    "All Products",
    "Furniture",
    "Electronics",
    "Home Appliances",
    "Tools & Equipment",
    "Kitchen & Dining",
    "Home Decor",
    "Vehicles",
    "Sports & Outdoor",
    "Books & Stationery",
  ];

  const handleCategoryClick = (category) => {
    navigate(
      category === "All Products" || category === "All"
        ? "/products/All"
        : `/products/${encodeURIComponent(category)}`
    );
    setMenuOpen(false);
  };

  const handleSellClick = () => {
    if (!user) return navigate("/login");
    if (user.role === "seller") navigate("/seller/dashboard");
    else navigate("/become-seller");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <header className="bg-[#016B61] text-white relative">
      <div className="bg-[#007e71] p-[5px]">
        <ul className="flex text-[10px] gap-x-5 font-medium justify-end px-8">
          <li>
            <button
              onClick={handleSellClick}
              className="bg-[#FEB21A] text-black px-3 py-1 rounded-sm font-semibold hover:bg-yellow-400 transition-colors"
            >
              Sell On App
            </button>
          </li>

          <li>
            <Link to="/help" className="hover:text-[#FEB21A] transition-colors">
              Help & Support
            </Link>
          </li>

          {user ? (
            <li
              className="relative group"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="text-yellow-300 font-semibold flex items-center gap-1">
                {user.name || user.email}
                <svg
                  className={`w-3 h-3 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-50">
                  {(user.role === "buyer" || user.role === "seller") && (
                    <button
                      onClick={() => navigate("/my-orders")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      🧾 My Orders
                    </button>
                  )}

                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-[#FEB21A] transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#FEB21A] transition-colors">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex justify-between items-center m-auto px-6 md:px-10 py-2 md:w-[90%]">
        <button
          className="text-[28px] text-[#FEB21A] md:hidden hover:cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>

        <Link
          to="/"
          className="logo text-[#FEB21A] font-bold text-[22px] tracking-wide hidden md:block"
        >
          RehomeIt
        </Link>

        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-[#e0fff9] text-gray-800 px-4 py-2 text-sm rounded-full w-56 md:w-64 outline-none focus:ring-2 focus:ring-[#FEB21A]"
          />
          <button
            className="absolute right-2 text-gray-600 text-lg"
            onClick={handleSearch}
          >
            <IoSearch />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user?.role !== "admin" && (
            <button
              onClick={() => navigate("/cart")}
              className="relative text-white text-2xl hover:text-yellow-400"
            >
              <IoCartOutline />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-[#016B61] border-t border-[#007e71] shadow-lg md:hidden animate-fadeIn">
          <ul className="flex flex-col py-3 text-center">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-2 text-[14px] hover:bg-[#007e71] cursor-pointer border-b border-[#007e71]"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
