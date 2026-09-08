import { Link } from "react-router-dom";

// Optimize Cloudinary images
const getOptimizedImage = (url, width) => {
  if (!url) return "";

  // Only optimize Cloudinary images
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  // Avoid adding transformations multiple times
  if (!url.includes("/upload/")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
};

const Products = ({ productItem }) => {
  const imageUrl = productItem?.image;

  return (
    <Link to={`/product/${productItem._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">

        {/* Product Image */}
        <img
          src={getOptimizedImage(imageUrl, 600)}
          srcSet={
            imageUrl?.includes("res.cloudinary.com")
              ? `
                ${getOptimizedImage(imageUrl, 320)} 320w,
                ${getOptimizedImage(imageUrl, 480)} 480w,
                ${getOptimizedImage(imageUrl, 600)} 600w,
                ${getOptimizedImage(imageUrl, 800)} 800w
              `
              : undefined
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 355px"
          alt={productItem.title}
          width={355}
          height={256}
          loading="lazy"
          decoding="async"
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

          <button
            type="button"
            className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Add To Cart
          </button>

        </div>
      </div>
    </Link>
  );
};

export default Products;