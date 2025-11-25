import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
  "All Products",
  "Mobile",
  "Furniture",
  "Electronics",
  "Home Appliances",
  "Tools & Equipment",
  "Kitchen & Dining",
  "Home Decor",
  "Vehicles",
  "Sports & Outdoor",
  "Books & Stationery",
  "Clothing & Accessories",
  "Toys & Baby"
  ];

const handleCategoryClick = (category) => {
  if (category === "All Products") {
    navigate("/products/All");
  } else {
    navigate(`/products/${encodeURIComponent(category)}`);
  }
  setDropdownOpen(false);
};

  return (
    <nav className="shadow-sm bg-white relative z-20  hidden md:block">
      <ul className="flex justify-around px-6 py-2 text-[12px] font-medium items-center [ul&>]">
        <li
          className="relative cursor-pointer flex items-center hover:text-black border-none"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          All
          <RiArrowDropDownLine className="text-[20px]" />

          {dropdownOpen && (
            <ul className="absolute top-6 left-0 bg-white shadow-lg border rounded-md w-48 z-50 animate-fadeIn">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="px-4 py-2 text-[13px] hover:bg-blue-50 cursor-pointer border-none"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li
          onClick={() => handleCategoryClick("Furniture")}
          className="cursor-pointer"
        >
          Furniture
        </li>
        <li
          onClick={() => handleCategoryClick("Electronics")}
          className="cursor-pointer"
        >
          Electronics
        </li>
        <li
          onClick={() => handleCategoryClick("Home Appliances")}
          className="cursor-pointer"
        >
          Home Appliances
        </li>
        <li
          onClick={() => handleCategoryClick("Tools & Equipment")}
          className="cursor-pointer"
        >
          Tools & Equipment
        </li>
        <li
          onClick={() => handleCategoryClick("Kitchen & Dining")}
          className="cursor-pointer"
        >
          Kitchen & Dining
        </li>
        <li
          onClick={() => handleCategoryClick("Home Decor")}
          className="cursor-pointer"
        >
          Home Decor
        </li>
        <li
          onClick={() => handleCategoryClick("Vehicles")}
          className="cursor-pointer"
        >
          Vehicles
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
