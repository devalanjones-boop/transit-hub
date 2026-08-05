
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

    let [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-100">

                <AdminNavbar
                    setSidebarOpen={setSidebarOpen}
                     sidebarOpen={sidebarOpen}
                />

                <AdminSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="md:ml-64 pt-16 p-6">

                    <Outlet />

                </main>


            </div>
        </>
    )
}
export default AdminLayout