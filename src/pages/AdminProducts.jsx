import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  image: "",
  imagePublicId: "",
  category: "",
  subcategory: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [categories, setCategories] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  // =========================
  // Fetch Products + Categories
  // =========================

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
        `${import.meta.env.VITE_API_URL}/categories`
      );

      setProducts(productsResponse.data.products || []);
      setCategories(categoriesResponse.data.categories || []);
    } catch (error) {
      console.log("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // Reset Form
  // =========================

  const resetForm = () => {
    setFormData(initialFormData);
    setImagePreview("");
    setEditingProduct(null);
    setShowForm(false);
  };

  // =========================
  // Upload Image
  // =========================

 const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  // Check image type
  if (!file.type.startsWith("image/")) {
    Swal.fire({
      title: "Invalid File",
      text: "Please select an image file.",
      icon: "warning",
    });

    return;
  }

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    Swal.fire({
      title: "File Too Large",
      text: "Image size must be less than 5MB.",
      icon: "warning",
    });

    return;
  }

  try {
    setUploadingImage(true);

    // Local preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const uploadData = new FormData();
    uploadData.append("image", file);

    const token = localStorage.getItem("adminToken");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/products/upload-image`,
      uploadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPLOAD RESPONSE:", response.data);

    if (response.data.success) {
      let imageUrl = response.data.imageUrl;

      // Safety check:
      // If backend accidentally returns Markdown:
      // [https://example.com/image.webp](https://example.com/image.webp)
      // extract the real URL.
      if (imageUrl?.startsWith("[") && imageUrl?.includes("](")) {
        const match = imageUrl.match(/^\[.*?\]\((.*?)\)$/);

        if (match) {
          imageUrl = match[1];
        }
      }

      imageUrl = imageUrl?.trim();

      console.log("FINAL IMAGE URL:", imageUrl);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imagePublicId: response.data.publicId,
      }));

      // Show Cloudinary URL in preview
      setImagePreview(imageUrl);

    } else {
      throw new Error(
        response.data.message || "Image upload failed."
      );
    }
  } catch (error) {
    console.log("Image upload error:", error);

    setImagePreview("");

    Swal.fire({
      title: "Upload Failed",
      text:
        error.response?.data?.message ||
        error.message ||
        "Failed to upload image.",
      icon: "error",
    });
  } finally {
    setUploadingImage(false);
  }
};

  // =========================
  // Delete Product
  // =========================

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
        prevProducts.filter(
          (product) => product._id !== productId
        )
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

  // =========================
  // Add / Update Product
  // =========================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.image ||
      !formData.category ||
      !formData.subcategory
    ) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all fields and upload an image.",
        icon: "warning",
      });

      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      if (editingProduct) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/products/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await Swal.fire({
          title: "Product Updated!",
          text: "Product has been updated successfully.",
          icon: "success",
        });
      } else {
         console.log("FORM DATA BEFORE SAVING:", formData);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await Swal.fire({
          title: "Product Added!",
          text: "Product has been added successfully.",
          icon: "success",
        });
      }

      await fetchData();

      resetForm();
    } catch (error) {
      console.log("Product save error:", error);

      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong.",
        icon: "error",
      });
    }
  };

  // =========================
  // Edit Product
  // =========================

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
      imagePublicId: product.imagePublicId || "",
      category:
        product.category?._id || product.category || "",
      subcategory: product.subcategory || "",
    });

    setImagePreview(product.image || "");

    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* =========================
          Header
      ========================= */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all products.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
          onClick={() => {
            setEditingProduct(null);
            setFormData(initialFormData);
            setImagePreview("");
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* =========================
          Product Form
      ========================= */}

      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="mb-8 rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            {editingProduct
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Product Title */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Title
              </label>

              <input
                type="text"
                value={formData.title}
                required
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

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                type="number"
                value={formData.price}
                required
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

            {/* Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                value={formData.description}
                required
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

            {/* =========================
                Cloudinary Image Upload
            ========================= */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Product Image
              </label>

              <div className="rounded-lg border-2 border-dashed border-gray-300 p-5">
                <label className="flex cursor-pointer flex-col items-center justify-center">
                  <span className="mb-3 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                    {uploadingImage
                      ? "Uploading..."
                      : "Choose Image"}
                  </span>

                  <span className="text-sm text-gray-500">
                    JPG, PNG, WEBP — Max 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                {/* Image Preview */}

                {imagePreview && (
                  <div className="mt-5 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-48 w-48 rounded-lg object-cover shadow"
                    />
                  </div>
                )}

                {/* Upload Status */}

                {formData.image && !uploadingImage && (
                  <p className="mt-3 text-center text-sm text-green-600">
                    ✓ Image uploaded successfully
                  </p>
                )}
              </div>
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={formData.category}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3 outline-none"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Subcategory
              </label>

              <select
                value={formData.subcategory}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subcategory: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3 outline-none"
              >
                <option value="">
                  Select Subcategory
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="HandBag">
                  HandBag
                </option>

                <option value="Shoes">
                  Shoes
                </option>

                <option value="Accessories">
                  Accessories
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={uploadingImage}
              className="rounded-lg bg-black px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border px-5 py-2.5 text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* =========================
          Products Table
      ========================= */}

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-500">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">
            No products found.
          </p>
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
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
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
                        type="button"
                        className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-600"
                        onClick={() =>
                          handleEditProduct(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="ml-3 rounded bg-red-100 px-3 py-1 text-sm text-red-600"
                        onClick={() =>
                          handleDeleteProduct(product._id)
                        }
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