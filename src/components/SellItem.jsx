import React, { useState } from "react";

const SellItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    Discription: "",
    image: "",
    sellerName: "",
    phNo: "",
    address: "",
    upload: new Date().toLocaleDateString(),
    price: "",
    Catagory: "",
    Condition: "",
  });

  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sell Your Item
        </h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-green-600 font-semibold text-lg mb-2">
              Your item has been submitted successfully!
            </h3>
            <p className="text-gray-600 text-sm">
              (You can now view it on your products page.)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Gym Dumbbell Set 20kg"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                name="Discription"
                value={formData.Discription}
                onChange={handleChange}
                placeholder="Write a short description..."
                className="w-full border rounded-md px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <select
                name="Catagory"
                value={formData.Catagory}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Tools & Equipment">Tools & Equipment</option>
                <option value="Kitchen & Dining">Kitchen & Dining</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Sports & Outdoor">Sports & Outdoor</option>
                <option value="Books & Stationery">Books & Stationery</option>
                <option value="Clothing & Accessories">Clothing & Accessories</option>
                <option value="Toys & Baby Products">Toys & Baby Products</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Condition
              </label>
              <input
                type="text"
                name="Condition"
                value={formData.Condition}
                onChange={handleChange}
                placeholder="e.g. New, 9/10, 10/10"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Price (PKR)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Seller Name
                </label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phNo"
                  value={formData.phNo}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Township, Lahore"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded-md px-3 py-2 bg-white"
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-48 h-40 object-cover rounded-md shadow-md"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Item
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellItem;
