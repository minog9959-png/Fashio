import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductListing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/products"
            );

            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">
                Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {products.map((productItem) => (
                <ProductCard
                    key={productItem._id}
                      // ya ProductCard.jsx ko da ga data
                    productItem={productItem}
                />
            ))}
            </div>
        </div>
    );
};

export default ProductListing;