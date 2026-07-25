import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">

        {/* Topbar */}
        <AdminTopbar />

        {/* Page Content */}
        <section className="p-6">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default AdminLayout;