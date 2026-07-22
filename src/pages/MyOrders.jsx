import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchOrders();
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

          {orders.map((order) => (

            <div
              key={order._id}
              className="border rounded-lg p-6"
            >

              <div className="flex justify-between mb-4">

                <h2 className="text-xl font-bold">
                  Order
                </h2>

                <span className="font-semibold">
                  {order.status}
                </span>

              </div>

              {order.items.map((item) => (

                <div
                  key={item.product._id}
                  className="flex items-center gap-4 border-t py-4"
                >

                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>

                    <h3 className="font-semibold">
                      {item.product.title}
                    </h3>

                    <p>
                      Price: ${item.product.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                </div>

              ))}

              <div className="border-t pt-4 mt-4">

                <p className="text-lg font-bold">
                  Total: ${order.totalPrice}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default MyOrders;