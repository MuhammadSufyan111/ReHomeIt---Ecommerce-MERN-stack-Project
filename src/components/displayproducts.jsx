import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayProducts = ({ products: propsProducts }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propsProducts && propsProducts.length) {
      setProducts(propsProducts);
      setLoading(false);
    } else if (categoryName) {
      fetchCategoryProducts();
    }
  }, [categoryName, propsProducts]);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(
        `https://rehomeit-ecommerce-website.onrender.com/products/category/${categoryName}`
      );
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  if (products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {categoryName && (
        <h2 className="text-2xl font-semibold mb-4 bg-[#016B61] p-3 rounded-md text-white text-center">
           {categoryName}
        </h2>
      )}
      {!categoryName && (
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      )}

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="shadow-md p-4 rounded-lg cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.image ? `https://rehomeit-ecommerce-website.onrender.com/${product.image}` : "/placeholder.png"}
              alt={product.name}
              className="w-full h-50 object-contain rounded"
            />
            <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
            <p className="text-green-600 font-bold">Rs {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
