import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedOrder, setSelectedOrder] = useState(null);
    //view details
    const [showDetails, setShowDetails] = useState(false);

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

    //Handle view details
    const handleViewDetails = async (orderId) => {
        try {
            const token = localStorage.getItem("adminToken");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedOrder(response.data.order);
            setShowDetails(true);

        } catch (error) {
            console.log("Fetch order details error:", error);

            Swal.fire({
                title: "Error!",
                text:
                    error.response?.data?.message ||
                    "Failed to fetch order details.",
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

            <div className="rounded-lg bg-white p-3 sm:p-6 shadow-sm">

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

                        <table className="w-full min-w-[1100px] text-left">

                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="px-4 py-3 whitespace-nowrap">Order</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Customer</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Products</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Total</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Payment</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Status</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Date</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b"
                                    >

                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            #{order._id.slice(-6)}
                                        </td>

                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {order.user?.name || "N/A"}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {order.user?.email || "N/A"}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 text-gray-600">
                                            {order.items?.length || 0} item(s)
                                        </td>

                                        <td className="py-4 px-4 font-medium text-gray-800">
                                            ${order.totalPrice}
                                        </td>

                                        <td className="py-4 px-4">
                                            {order.paymentStatus}
                                        </td>

                                        {/* <td className="py-4">
                                               {order.status}
                                                    </td> */}

                                        <td className="py-4 px-4">
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

                                        <td className="py-4 px-4 text-gray-600">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => handleViewDetails(order._id)}
                                                className="rounded-lg bg-black px-4 py-2 text-sm text-white whitespace-nowrap hover:bg-gray-800"
                                            >
                                                View Details
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}
            </div>

            {showDetails && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Order Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Order #{selectedOrder._id.slice(-6)}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowDetails(false);
                                    setSelectedOrder(null);
                                }}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>
                        </div>

                        {/* Customer */}
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-3 font-semibold text-gray-800">
                                Customer Information
                            </h3>

                            <p className="text-gray-600">
                                <span className="font-medium">Name:</span>{" "}
                                {selectedOrder.user?.name || "N/A"}
                            </p>

                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {selectedOrder.user?.email || "N/A"}
                            </p>
                        </div>

                        {/* Products */}
                        <div className="mb-6">
                            <h3 className="mb-4 font-semibold text-gray-800">
                                Products
                            </h3>

                            <div className="space-y-3">
                                {selectedOrder.items?.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex items-center gap-3">

                                            <img
                                                src={item.product?.image}
                                                alt={item.product?.title}
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />

                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {item.product?.title || "Product unavailable"}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                        </div>

                                        <p className="font-medium text-gray-800">
                                            ${item.product?.price || 0}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-t pt-4">

                            <div className="mb-2 flex justify-between">
                                <span className="text-gray-600">
                                    Payment Status
                                </span>

                                <span className="font-medium">
                                    {selectedOrder.paymentStatus}
                                </span>
                            </div>

                            <div className="mb-2 flex justify-between">
                                <span className="text-gray-600">
                                    Order Status
                                </span>

                                <span className="font-medium">
                                    {selectedOrder.status}
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>

                                <span>
                                    ${selectedOrder.totalPrice}
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminOrders;