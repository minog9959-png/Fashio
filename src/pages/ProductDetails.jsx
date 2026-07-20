import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  console.log(id);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        // `http://localhost:8000/api/products/${id}`
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );

      console.log("Response:", response.data);

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg p-6 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-[450px] object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </span>

            <span className="text-gray-500">
              (4.8 Reviews)
            </span>
          </div>

          {/* Price */}
          <h2 className="text-5xl font-bold text-[#E7AB3C] mt-6">
            ${product.price}
          </h2>

          {/* Category */}
          <div className="mt-5">
            <span className="font-semibold">
              Category:
            </span>

            <span className="ml-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
              {product.category.name}
            </span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-xl mb-2 text-gray-600">
              Description
            </h3>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">

            <button className="w-12 h-12 border rounded text-2xl hover:bg-gray-100 duration-300">
              -
            </button>

            <span className="text-xl font-semibold">
              1
            </span>

            <button className="w-12 h-12 border rounded text-2xl hover:bg-gray-200 duration-300">
              +
            </button>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <button className="bg-[#E7AB3C] hover:bg-[#d89d32] text-white px-10 py-4 rounded font-semibold duration-300 shadow-lg">
              Add To Cart
            </button>

            <button className="border px-10 py-4 rounded hover:bg-gray-200 duration-300 shadow">
              ❤️ Wishlist
            </button>

          </div>

        </div>

      </div>
    </div>
  );

};

export default ProductDetails;