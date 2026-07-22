import axios from "axios";
import { useEffect, useState } from "react";
// const userId = localStorage.getItem("userId");
// console.log("UserId =", userId);
const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      // if (!token) {
      //   navigate("/login", {
      //     state: { from: "cart" }
      //   });
      //   return;
      // }
      const response = await axios.get(
        // `${import.meta.env.VITE_API_URL}/cart/6a69f7b37c693b5acf03fb96`
        `${import.meta.env.VITE_API_URL}/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(response.data.cartItems);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load cart");
    } finally {

      setLoading(false);

    }
  };
  //Delete
  const handleDelete = async (cartId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchCartItems();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to delete item"
      );
    }
  };
  //Update button increase
  const handleIncrease = async (cartId, currentQuantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/${cartId}`,
        {
          quantity: currentQuantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert(response.data.message);

      fetchCartItems();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  };
  //update - button decrease
  const handleDecrease = async (cartId, currentQuantity) => {

    if (currentQuantity === 1) {
      return;
    }

    try {

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/${cartId}`,
        {
          quantity: currentQuantity - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert(response.data.message);

      fetchCartItems();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Failed to update quantity"
      );

    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {
        cartItems.map((item) => (

          <div
            key={item._id}
            className="flex justify-between items-center border rounded-lg p-5 mb-5"
          >

            {/* Left Side */}
            <div className="flex items-center gap-6">

              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-28 h-28 object-cover rounded"
              />

              <div>

                <h2 className="text-2xl font-semibold">
                  {item.product.title}
                </h2>

                <p className="mt-2">
                  Price: ${item.product.price}
                </p>

                <p className="mt-2 font-semibold">
                  Total: $
                  {item.product.price * item.quantity}
                </p>

              </div>

            </div>

            {/* Right Side */}
            <div className="text-center">

              <p className="mb-3 font-semibold">
                Quantity
              </p>

              <div className="flex items-center gap-3 justify-center">

                <button onClick={() => handleDecrease(item._id, item.quantity)} className="w-10 h-10 border rounded hover:bg-gray-200">
                  -
                </button>

                <span className="text-lg font-bold">
                  {item.quantity}
                </span>

                <button onClick={() => handleIncrease(item._id, item.quantity)}
                  className="w-10 h-10 border rounded hover:bg-gray-200">
                  +
                </button>

              </div>

              <button onClick={() => handleDelete(item._id)} className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>

            </div>

          </div>

        ))
      }

      {/* Cart Summary */}

      <div className="flex justify-end mt-8">

        <div className="border rounded-lg p-6 w-80">

          <h2 className="text-2xl font-bold mb-4">
            Cart Summary
          </h2>

          <p className="text-lg mb-4">
            <span className="font-semibold">
              Subtotal:
            </span>{" "}
            ${subtotal}
          </p>

          <button className="w-full bg-[#E7AB3C] text-white py-3 rounded hover:bg-[#d89d32]">
            Proceed To Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Cart;