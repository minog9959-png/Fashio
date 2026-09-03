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
  // useEffect(() => {
  //   const handleNewOrder = (data) => {
  //     console.log("Admin received new order:", data);

  //     setNotifications((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now(),
  //         message: data.message,
  //         orderId: data.orderId,
  //       },
  //     ]);
  //   };

  //   socket.on("newOrder", handleNewOrder);

  //   return () => {
  //     socket.off("newOrder", handleNewOrder);
  //   };
  // }, []);

  useEffect(() => {
    if (!socket) return;

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
    <header className="flex h-20 w-full items-center justify-between bg-white px-4 shadow-sm sm:px-6 md:px-8">

      {/* Page Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-400">
          Welcome back, Admin
        </p>
      </div>

      {/* Right Side */}

      <div className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8">

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <FaBell className="text-xl text-gray-600 hover:text-orange-500 duration-300" />

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-8 z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">

              <div className="border-b px-4 py-3 font-semibold text-gray-700">
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
                      className="border-b px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex gap-3">

                        <FaShoppingBag className="mt-1 text-orange-500" />

                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
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
        <div className="hidden text-right md:block">
          <p className="font-semibold text-gray-700">
            {admin?.user || "Admin"}
          </p>

          <p className="text-sm text-gray-400">
            {admin?.email || "Admin"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-orange-500 px-5 py-2 text-white duration-300 hover:bg-orange-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default AdminTopbar;