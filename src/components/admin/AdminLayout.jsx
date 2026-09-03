import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
  <AdminSidebar />

  <main className="ml-64 min-h-screen w-[calc(100%_-_16rem)]">
    <AdminTopbar />

    <section>
      <Outlet />
    </section>
  </main>
</div>
  );
};

export default AdminLayout;