import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#003833] text-gray-300 mt-10 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            RehomeIt
          </h2>
          <p className="text-sm mt-3 text-gray-400">
            Buy and sell used home items easily — from furniture to electronics.
            Reuse. Recycle. ReCart.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/")}
              className="hover:text-white cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/products/All")}
              className="hover:text-white cursor-pointer"
            >
              All Products
            </li>
            <li
              onClick={() => navigate("/signup")}
              className="hover:text-white cursor-pointer"
            >
              Sign Up
            </li>
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer"
            >
              Login
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/products/Furniture")}
              className="hover:text-white cursor-pointer"
            >
              Furniture
            </li>
            <li
              onClick={() => navigate("/products/Electronics")}
              className="hover:text-white cursor-pointer"
            >
              Electronics
            </li>
            <li
              onClick={() => navigate("/products/Home Appliances")}
              className="hover:text-white cursor-pointer"
            >
              Home Appliances
            </li>
            <li
              onClick={() => navigate("/products/Vehicles")}
              className="hover:text-white cursor-pointer"
            >
              Vehicles
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 text-xl"
            >
              <FaLinkedin />
            </a>
          </div>

          <p className="text-sm text-gray-400">
            📧 suffianfarooqi@gmail.com <br />
            📞 +92 300 0000000
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ReHomeIt — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
