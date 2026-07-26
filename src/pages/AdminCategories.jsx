import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    //admin fetch/get categories:
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );

            setCategories(response.data.categories);
        } catch (error) {
            console.log("Fetch categories error:", error);
        } finally {
            setLoading(false);
        }
    };

    //admin add/create & update category:
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            Swal.fire({
                title: "Missing Name",
                text: "Please enter a category name.",
                icon: "warning",
            });

            return;
        }

        try {
            if (editingCategory) {
                // UPDATE
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/categories/${editingCategory._id}`,
                    {
                        name: categoryName.trim(),
                    }
                );

                Swal.fire({
                    title: "Category Updated!",
                    text: "Category has been updated successfully.",
                    icon: "success",
                });

            } else {
                // ADD
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/categories`,
                    {
                        name: categoryName.trim(),
                    }
                );

                Swal.fire({
                    title: "Category Added!",
                    text: "Category has been added successfully.",
                    icon: "success",
                });
            }

            await fetchCategories();

            setCategoryName("");
            setEditingCategory(null);
            setShowForm(false);

        } catch (error) {
            console.log("Category save error:", error);

            Swal.fire({
                title: "Error!",
                text:
                    error.response?.data?.message ||
                    "Failed to save category.",
                icon: "error",
            });
        }
    };

    // Admin edit category
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setCategoryName(category.name);
        setShowForm(true);
    };

    //Admin delete category
    const handleDeleteCategory = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This category will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/categories/${id}`
    );

    await fetchCategories();

    Swal.fire({
      title: "Deleted!",
      text: "Category has been deleted successfully.",
      icon: "success",
    });

  } catch (error) {
    console.log("Delete category error:", error);

    Swal.fire({
      title: "Error!",
      text:
        error.response?.data?.message ||
        "Failed to delete category.",
      icon: "error",
    });
  }
};

    // useEffect:
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Categories
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all categories.
                    </p>
                </div>

                <button className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
                    onClick={() => setShowForm(true)}>
                    + Add Category
                </button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleAddCategory}
                    className="mb-8 rounded-lg bg-white p-6 shadow-sm"
                >
                    <h2 className="mb-5 text-xl font-semibold text-gray-800">
                        {editingCategory ? "Edit Category" : "Add New Category"}
                    </h2>

                    <label className="mb-2 block text-sm font-medium">
                        Category Name
                    </label>

                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="w-full rounded-lg border p-3 outline-none"
                    />

                    <div className="mt-5 flex gap-3">

                        <button
                            type="submit"
                            className="rounded-lg bg-black px-5 py-2.5 text-white"
                        >
                            {editingCategory ? "Update Category" : "Add Category"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingCategory(null);
                                setCategoryName("");
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
                    <p className="text-gray-500">
                        Loading categories...
                    </p>
                ) : categories.length === 0 ? (
                    <p className="text-gray-500">
                        No categories found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Created At</th>
                                    <th className="pb-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category) => (
                                    <tr
                                        key={category._id}
                                        className="border-b"
                                    >
                                        <td className="py-4 font-medium text-gray-800">
                                            {category.name}
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {category.createdAt
                                                ? new Date(
                                                    category.createdAt
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="py-4">
                                            <div className="flex gap-2">

                                                <button className="rounded-md bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600"
                                                    onClick={() => handleEditCategory(category)}>
                                                    Edit
                                                </button>

                                                <button className="rounded-md bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600"
                                                onClick={()=>handleDeleteCategory(category._id)} >
                                                    Delete
                                                </button>

                                            </div>
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

export default AdminCategories;