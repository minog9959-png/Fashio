import axios from "axios";
import { useEffect, useState } from "react";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.log("User ID not found");
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/wishlist/${userId}`
            );

            console.log("Wishlist Response:", response.data);

            setWishlistItems(response.data.wishlistItems);
        } catch (error) {
            console.log("Wishlist Error:", error);
        } finally {
            setLoading(false);
        }
    };

    //delete wishlist function:

    const handleDeleteWishlist = async (wishlistId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/wishlist/${wishlistId}`
    );

    alert(response.data.message);

    // Remove item from screen immediately
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== wishlistId)
    );

  } catch (error) {
    console.log("Delete Wishlist Error:", error);

    alert(
      error.response?.data?.message || "Failed to remove from wishlist"
    );
  }
};

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return (
        <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">
                My Wishlist
            </h1>

            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="border rounded-lg p-4">

                            <img
                                src={item.product?.image || ""}
                                alt={item.product?.title || "Product Unavailable"}
                                className="w-full h-64 object-cover rounded"
                            />

                            <h2 className="text-lg font-semibold mt-4">
                                {item.product?.title || "Product Unavailable"}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {item.product?.category?.name || "N/A"}
                            </p>

                            <p className="text-xl font-bold text-red-500 mt-2">
                                ${item.product?.price || 0}
                            </p>

                            <button
                                onClick={() => handleDeleteWishlist(item._id)}
                                className="w-full mt-4 bg-red-500 text-white py-2 rounded"
                            >
                                Remove
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;