import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBell, FaShoppingBag } from "react-icons/fa";
import socket from "../../socketConnection";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  };

  // useEffect admin recieved new order notification
  useEffect(() => {
    const handleNewOrder = (data) => {
      console.log("Admin received new order:", data);

      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: data.message,
          orderId: data.orderId,
        },
      ]);
    };

    socket.on("newOrder", handleNewOrder);

    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, []);

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

      {/* Page Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-400">
          Welcome back, Admin
        </p>
      </div>

      {/* Notifications */}
      <div className="relative ml-82">

        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          className="relative"
        >
          <FaBell className="text-xl text-gray-600 hover:text-orange-500 duration-300" />

          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 top-8 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50">

            <div className="px-4 py-3 border-b font-semibold text-gray-700">
              Notifications
            </div>

            {notifications.length === 0 ? (
              <p className="px-4 py-5 text-sm text-gray-500">
                No notifications
              </p>
            ) : (
              <div className="max-h-72 overflow-y-auto">

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 border-b hover:bg-gray-50"
                  >
                    <div className="flex gap-3">

                      <FaShoppingBag className="text-orange-500 mt-1" />

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {notification.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          New order received
                        </p>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>

      {/* Admin Info */}
      <div className="flex items-center gap-8">

        <div className="text-right">
          <p className="font-semibold text-gray-700">
            {admin?.user || "Admin"}
          </p>

          <p className="text-sm text-gray-400">
            {admin?.email || "Admin"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 duration-300"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default AdminTopbar;