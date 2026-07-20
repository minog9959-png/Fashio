import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductListing = ({ selectedCategory, searchKeyword, page, setPage }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchKeyword, page, setPage]);

    const fetchProducts = async () => {
        try {
            // const response = await axios.get(
            //     "http://localhost:8000/api/products"
            // );
            console.log("Selected Category:", selectedCategory);
            // let url = "http://localhost:8000/api/products";
            let url = `${import.meta.env.VITE_API_URL}/products`;

            if (selectedCategory) {
                // url = `http://localhost:8000/api/products/filter?category=${selectedCategory}`;
                url = `${import.meta.env.VITE_API_URL}/products/filter?category=${selectedCategory}`;
            }

            // if (search.trim()) {
            //     url = `http://localhost:8000/api/products/search?keyword=${search}`;
            // }

            if (searchKeyword.trim()) {
                // url = `http://localhost:8000/api/products/search?keyword=${searchKeyword}`;
                url = `${import.meta.env.VITE_API_URL}/products/search?keyword=${searchKeyword}`;
            }

            if (!selectedCategory && !searchKeyword.trim()) {
                // url = `http://localhost:8000/api/products/pagination?page=${page}`;
                url = `${import.meta.env.VITE_API_URL}/products/pagination?page=${page}`;
            }

            console.log("Current Page:", page);
            console.log("URL:", url);
            const response = await axios.get(url);
            console.log("Count:", response.data.count);
            console.log("Products:", response.data.products);
            console.log("Response:", response.data);

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

            <div className="flex justify-center gap-4 mt-10">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="px-4 py-2 font-semibold">
                    Page {page}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    className="px-5 py-2 bg-[#E7AB3C] text-white rounded"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default ProductListing;