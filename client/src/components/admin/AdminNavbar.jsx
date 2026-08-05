import { useLocation, useNavigate } from "react-router-dom"
import { Menu, Bell, UserCircle } from "lucide-react";



const AdminNavbar = ({ setSidebarOpen,sidebarOpen }) => {


    let navigate = useNavigate();
    let location = useLocation();


    let getPageAction = () => {

        let path = location.pathname;

        if (path === "/admin/buses") {

            return {
                label: "Add Bus",
                action: () => navigate("/admin/buses/create")
            }
        }

        if (path === "/admin/buses/create" ||
            path.startsWith("/admin/buses/update") ||
            path.startsWith("/admin/buses/details")
        ) {
            return {
                label: "Bus List",
                action: () => navigate("/admin/buses")
            }
        }

        if (path === "/admin/route") {

            return {
                label: "Add Route",
                action: () => navigate("/admin/route/create")
            }
        }

        if (path === "/admin/route/create" ||
            path.startsWith("/admin/route/update") ||
            path.startsWith("/admin/route/details")
        ) {
            return {
                label: "Route List",
                action: () => navigate("/admin/route")
            }
        }

        if (path === "/admin/stop") {

            return {
                label: "Add Stop",
                action: () => navigate("/admin/stop/create")
            }
        }

        if (path === "/admin/stop/create" ||
            path.startsWith("/admin/stop/update") ||
            path.startsWith("/admin/stop/details")
        ) {
            return {
                label: "Stop List",
                action: () => navigate("/admin/stop")
            }
        }

        if (path === "/admin/schedule") {

            return {
                label: "Add Schedule",
                action: () => navigate("admin/schedule/create")
            }
        }

        if (path === "/admin/schedule/create" ||
            path.startsWith("/admin/schedule/update") ||
            path.startsWith("/admin/schedule/details")
        ) {
            return {
                label: "Schedule List",
                action: () => navigate("/admin/schedule")
            }
        }

        if (path === "/admin/fare") {
            return {
                label: "Add Fare",
                action: () => navigate("/admin/fare/create")
            }
        }

        if (path === "/admin/fare/create" ||
            path.startsWith("/admin/fare/update") ||
            path.startsWith("/admin/fare/details")
        ) {
            return {
                label: "Fare List",
                action: () => navigate("/admin/fare")
            }
        }

        if (path === "/admin/notification") {

            return {
                label: "Add Notification",
                action: () => navigate("/admin/notification/create")
            }
        }

        if (path === "/admin/notification/create" ||
            path.startsWith("/admin/notification/details")
        ) {
            return {
                label: "Notification List",
                action: () => navigate("admin/notification")
            }
        }

        return null;
    };

    let pageAction = getPageAction();



    return (
        <>

            <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu size={24} />
                    </button>

                    <h1 className="text-xl font-bold text-blue-600">
                        TransitHub
                    </h1>

                </div>


                <div>
                    {pageAction && (
                        <button
                            onClick={pageAction.action}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {pageAction.label}
                        </button>
                    )}
                </div>


                <div className="flex items-center gap-4">

                    <button onClick={() => navigate("/admin/notification")}
                        className="relative p-2 rounded-lg hover:bg-gray-100">
                        <Bell size={22} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                        <UserCircle size={28} />
                        <span className="hidden md:block text-sm font-medium">
                            Admin
                        </span>
                    </button>

                </div>

            </nav>

        </>

    )
}

export default AdminNavbar