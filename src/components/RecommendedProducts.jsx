import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/products"; 

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data)
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getRandomProducts = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const recommended = getRandomProducts(products, 12);

  if (loading) return <p className="text-center my-4">Loading recommended products...</p>;

  return (
    <section className="mt-10 px-6 pb-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Recommended Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {recommended.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-white rounded-sm shadow-md p-4 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
          >
            {product.image && (
              <img
                src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`}
                alt={product.name}
                className="w-full h-50 object-contain rounded-lg mb-3"
              />
            )}

            <h3 className="text-center text-lg font-bold truncate">
              {product.name}
            </h3>

            <div className="text-[#facc15] flex justify-center gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-blue-600 font-bold text-sm mt-2 text-center">
              Rs {product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
