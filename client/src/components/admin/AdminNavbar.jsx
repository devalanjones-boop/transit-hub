import { useNavigate } from "react-router-dom";
import { Menu, Bell, UserCircle } from "lucide-react";

const AdminNavbar = ({ setSidebarOpen, sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold text-blue-600">TransitHub</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/notifications")}
          className="relative rounded-lg p-2 hover:bg-gray-100"
        >
          <Bell size={22} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100">
          <UserCircle size={28} />
          <span className="hidden text-sm font-medium md:block">Admin</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
