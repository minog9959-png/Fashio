import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //use effect
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const statsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ordersResponse = await axios.get(
          "http://localhost:8000/api/admin/dashboard/recent-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(statsResponse.data.stats);
        setRecentOrders(ordersResponse.data.orders);
      } catch (error) {
        console.log("Dashboard data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Welcome back, Admin! Here's what's happening with your store.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Users */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {stats.totalUsers}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +12% from last month
          </p>
        </div>

        {/* Products */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Products
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {stats.totalProducts}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +8% from last month
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {stats.totalOrders}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +15% from last month
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            ${stats.totalRevenue}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +10% from last month
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          {loading ? (
            <p className="py-4 text-gray-500">
              Loading orders...
            </p>
          ) : recentOrders.length === 0 ? (
            <p className="py-4 text-gray-500">
              No recent orders found.
            </p>
          ) : (
            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b">

                    <td className="py-4">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="py-4">
                      {order.user?.name}
                    </td>

                    <td className="py-4">
                      ${order.totalPrice}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Paid
              </span> */}

                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;