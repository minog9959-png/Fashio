import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-md fixed left-0 top-0">

      {/* Logo / Title */}
      <div className="h-20 flex items-center px-6 border-b">
        <h1 className="text-2xl font-bold text-orange-500">
          FASHIO
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>📦</span>
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>📂</span>
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>🛒</span>
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>👥</span>
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/newsletter"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`
          }
        >
          <span>📧</span>
          <span>Newsletter</span>
        </NavLink>

      </nav>

    </aside>
  );
};

export default AdminSidebar;