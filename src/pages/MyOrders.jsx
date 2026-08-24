import axios from "axios";
import { useEffect, useState } from "react";
import socket from "../socketConnection";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders Response:", response.data);

      setOrders(response.data.orders);
    } catch (error) {
      console.log("Orders Error:", error);

      alert(
        error.response?.data?.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  //Invoice download in pdf

  const downloadInvoice = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(file);

      window.open(url, "_blank");

    } catch (error) {
      console.log("Invoice Error:", error);
      alert("Failed to open invoice");
    }
  };

  //create strip checkout
  const handlePayment = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`,
        {
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Stripe Response:", response.data);

      // Stripe Checkout page par redirect
      window.location.href = response.data.url;

    } catch (error) {
      console.log("Payment Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to start payment"
      );
    }
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);


  // update of socket.io and added
  useEffect(() => {
  fetchOrders();

  const handleOrderStatusUpdated = (data) => {
    console.log("MyOrders received status update:", data);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === data.orderId
          ? {
              ...order,
              status: data.status,
            }
          : order
      )
    );
  };

  socket.on("orderStatusUpdated", handleOrderStatusUpdated);

  return () => {
    socket.off("orderStatusUpdated", handleOrderStatusUpdated);
  };
}, []);

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-6">

        {orders.map((order) => {

  const allProductsAvailable = order.items.every(
    (item) => item.product !== null
  );

  return (
    <div
      key={order._id}
      className="border rounded-lg p-6"
    >

      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          Order
        </h2>

        {/* status badge and colors: */}
        <span
  className={`px-3 py-1 rounded-full text-sm font-semibold
    ${
      order.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : order.status === "Processing"
        ? "bg-blue-100 text-blue-700"
        : order.status === "Shipped"
        ? "bg-purple-100 text-purple-700"
        : order.status === "Delivered"
        ? "bg-green-100 text-green-700"
        : order.status === "Cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    }
  `}
>
  {order.status}
</span>

      </div>

      {order.items.map((item, itemIndex) => (

        <div
          key={item.product?._id || itemIndex}
          className="flex items-center gap-4 border-t py-4"
        >

          <img
            src={item.product?.image || item.image || null}
            alt={item.product?.title || item.title || "Product"}
            className="w-20 h-20 object-cover rounded"
          />

          <div>

            <h3 className="font-semibold">
              {item.product?.title || item.title || "Product unavailable"}
            </h3>

            <p>
              Price: ${item.product?.price ?? item.price ?? 0}
            </p>

            <p>
              Quantity: {item.quantity}
            </p>

          </div>

        </div>

      ))}

      <div className="border-t pt-4 mt-4">

        <p className="text-lg font-bold mb-4">
          Total: ${order.totalPrice}
        </p>

        <div className="flex gap-4 items-center">

          {order.paymentStatus !== "Paid" && allProductsAvailable && (
            <button
              onClick={() => handlePayment(order._id)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Pay Now
            </button>
          )}

          {order.paymentStatus === "Paid" && (
            <button
              onClick={() => downloadInvoice(order._id)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              View Invoice
            </button>
          )}

        </div>

      </div>

    </div>
  );
})}

        </div>
      )}

    </div>
  );
};

export default MyOrders;