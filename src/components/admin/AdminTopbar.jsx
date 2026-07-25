import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  };

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

      {/* Admin Info */}
      <div className="flex items-center gap-5">

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