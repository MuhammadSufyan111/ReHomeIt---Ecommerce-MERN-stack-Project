import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DisplayProducts from "./displayproducts";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      try {
        const res = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Search Results for "{query}"</h2>
      <DisplayProducts products={products} />
    </div>
  );
};

export default SearchResults;
