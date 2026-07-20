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
      `http://localhost:8000/api/products/${id}`
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
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold">
        Product Details
      </h1>
       <div className="max-w-7xl mx-auto py-10">

    <img
      src={product.image}
      alt={product.title}
      className="w-80"
    />

    <h1 className="text-3xl font-bold mt-5">
      {product.title}
    </h1>

    <p className="text-xl text-red-500 mt-3">
      ${product.price}
    </p>

    <p className="mt-3">
      {product.description}
    </p>

    <p className="mt-3">
      Category: {product.category.name}
    </p>

  </div>
    </div>
  );
};

export default ProductDetails;