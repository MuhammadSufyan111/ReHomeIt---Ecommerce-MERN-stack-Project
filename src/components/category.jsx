import React from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Mobile", image: "./images/category/mobile.jpg" },
    { name: "Furniture", image: "./images/category/chair.jpg" },
    { name: "Electronics", image: "./images/category/electronics.jpg" },
    { name: "Home Appliances", image: "./images/category/appliances.jpg" },
    { name: "Vehicles", image: "./images/category/fordgt.jpg" },
    { name: "Home Decor", image: "./images/category/rugs.jpg" },
    { name: "Tools & Equipment", image: "./images/category/drill.jpg" },
    { name: "Kitchen & Dining", image: "./images/category/cookware.jpg" },
    { name: "Sports & Outdoor", image: "./images/category/sports-tools.jpg" },
    { name: "Books & Stationery", image: "./images/category/books.jpg" },
    { name: "Clothing & Accessories", image: "./images/category/clothes.jpg" },
    { name: "Toys & Baby Products", image: "./images/category/toys.jpg" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div
      className="catagories grid grid-cols-6 mt-8 w-[90%] lg:w-[70%]  mx-auto text-center gap-1
      [&>.cat]:shadow-md [&>.cat]:pt-3 [&>.cat]:pb-1
      [&>.cat>img]:m-auto [&>.cat>img]:w-[75px] [&>.cat>img]:h-[70px]
      [&>.cat>img]:object-cover [&>.cat>h3]:text-sm"
    >
      {categories.map((cat, index) => (
        <div
          key={index}
          className={`cat${index + 1} cat cursor-pointer hover:scale-105 transition-transform`}
          onClick={() => handleCategoryClick(cat.name)}
        >
          <img src={cat.image} alt={cat.name} />
          <h3>{cat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Category;