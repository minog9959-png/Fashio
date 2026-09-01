import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });

    const [categories, setCategories] = useState([]);

    const [editingProduct, setEditingProduct] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const productsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/products`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const categoriesResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`,
            );

            setProducts(productsResponse.data.products);
            setCategories(categoriesResponse.data.categories);

        } catch (error) {
            console.log("Data fetch error:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
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

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.description ||
            !formData.price ||
            !formData.image ||
            !formData.category
        ) {
            Swal.fire({
                title: "Missing Information",
                text: "Please fill in all fields.",
                icon: "warning",
            });

            return;
        }

        try {
            const token = localStorage.getItem("adminToken");

            if (editingProduct) {
                // UPDATE PRODUCT

                await axios.put(
                    `${import.meta.env.VITE_API_URL}/admin/products/${editingProduct._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                Swal.fire({
                    title: "Product Updated!",
                    text: "Product has been updated successfully.",
                    icon: "success",
                });

            } else {
                // ADD PRODUCT

                await axios.post(
                    `${import.meta.env.VITE_API_URL}/admin/products`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                Swal.fire({
                    title: "Product Added!",
                    text: "Product has been added successfully.",
                    icon: "success",
                });
            }

            // Get latest products
            await fetchData();

            // Reset form
            setFormData({
                title: "",
                description: "",
                price: "",
                image: "",
                category: "",
            });

            setEditingProduct(null);
            setShowForm(false);

        } catch (error) {
            console.log("Product save error:", error);

            Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
            });
        }
    };

    //edit or update

    const handleEditProduct = (product) => {
        setEditingProduct(product);

        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category?._id || product.category,
        });

        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-8 flex items-center justify-between">
                {/* Heading + button */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Products
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all products.
                    </p>
                </div>

                <button
                    className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
                    onClick={() => setShowForm(true)}
                >
                    + Add Product
                </button>
            </div>

            {/* Add Product Form */}
            {showForm && (
                <form onSubmit={handleAddProduct} className="mb-8 rounded-lg bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-xl font-semibold text-gray-800">
                        Add New Product
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Product Title
                            </label>

                            <input
                                type="text"
                                value={formData.title} required
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3 outline-none"
                                placeholder="Enter product title"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Price
                            </label>

                            <input
                                type="number"
                                value={formData.price} required
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3 outline-none"
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Description
                            </label>

                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3 outline-none"
                                rows="4"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Image URL
                            </label>

                            <input
                                type="text"
                                value={formData.image} required
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3 outline-none"
                                placeholder="Enter image URL"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Category
                            </label>

                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border p-3 outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="mt-6 flex gap-3">

                        <button
                            type="submit"
                            className="rounded-lg bg-black px-5 py-2.5 text-white"
                        >
                            {editingProduct ? "Update Product" : "Add Product"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingProduct(null);

                                setFormData({
                                    title: "",
                                    description: "",
                                    price: "",
                                    image: "",
                                    category: "",
                                });
                            }}
                            className="rounded-lg border px-5 py-2.5 text-gray-700"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}


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
                                                className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-600"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="rounded bg-red-100 px-3 py-1 text-sm text-red-600 ml-3"
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