import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders(response.data.orders);
        } catch (error) {
            console.log("Fetch orders error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            const token = localStorage.getItem("adminToken");

            await axios.put(
                `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/status`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchOrders();

            Swal.fire({
                title: "Status Updated!",
                text: "Order status has been updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {
            console.log("Update order status error:", error);

            Swal.fire({
                title: "Error!",
                text:
                    error.response?.data?.message ||
                    "Failed to update order status.",
                icon: "error",
            });
        }
    };

    //useEffect
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Orders
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage all customer orders.
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">

                {loading ? (
                    <p className="text-gray-500">
                        Loading orders...
                    </p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">
                        No orders found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-3">Order</th>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Products</th>
                                    <th className="pb-3">Total</th>
                                    <th className="pb-3">Payment</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b"
                                    >

                                        <td className="py-4 text-sm text-gray-600">
                                            #{order._id.slice(-6)}
                                        </td>

                                        <td className="py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {order.user?.name || "N/A"}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {order.user?.email || "N/A"}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {order.items?.length || 0} item(s)
                                        </td>

                                        <td className="py-4 font-medium text-gray-800">
                                            ${order.totalPrice}
                                        </td>

                                        <td className="py-4">
                                            {order.paymentStatus}
                                        </td>

                                        {/* <td className="py-4">
                                               {order.status}
                                                    </td> */}

                                        <td className="py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(order._id, e.target.value)
                                                }
                                                className="rounded-md border px-3 py-2 text-sm outline-none"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString()
                                                : "N/A"}
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

export default AdminOrders;