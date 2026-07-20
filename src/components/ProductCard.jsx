import { Link } from "react-router-dom";

const Products = ({ productItem  }) => {
  return (
    <Link to={`/product/${productItem._id}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      
      {/* Product Image */}
      <img
        src={productItem.image}
        alt={productItem.title}
        className="w-full h-64 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {productItem.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {productItem.category?.name}
        </p>

        <p className="text-2xl font-bold text-red-500 mt-3">
          ${productItem.price}
        </p>

        <button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Add To Cart
        </button>

      </div>
    </div>
    </Link>
  );
};

export default Products;