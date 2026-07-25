import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("adminToken");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/admin/products`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProducts(response.data.products);
            } catch (error) {
                console.log("Products fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    //Product delete function:
    const handleDeleteProduct = async (productId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/products/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );

            await Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

        } catch (error) {
            console.log("Delete product error:", error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete product.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Products
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage all products.
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">

                {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-3">Product</th>
                                    <th className="pb-3">Price</th>
                                    <th className="pb-3">Category</th>
                                    <th className="pb-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="h-12 w-12 rounded object-cover"
                                                />

                                                <span className="font-medium text-gray-800">
                                                    {product.title}
                                                </span>

                                            </div>
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            ${product.price}
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {product.category?.name || "N/A"}
                                        </td>

                                        <td className="py-4">
                                            <button
                                                className="rounded bg-red-100 px-3 py-1 text-sm text-red-600"
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminProducts;