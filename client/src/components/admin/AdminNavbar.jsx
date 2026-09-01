import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Menu, Bell, UserCircle } from "lucide-react";



const AdminNavbar = ({ setSidebarOpen, sidebarOpen }) => {


    let navigate = useNavigate();
    let location = useLocation();
    let { id } = useParams();


    let getPageAction = () => {

        let path = location.pathname;

        if (path === "/admin/buses") {

            return {
                label: "Add Bus",
                action: () => navigate("/admin/buses/create")
            }
        }

        if (path === "/admin/buses/create" ||
            path.startsWith(`/admin/buses/${id}/edit`) ||
            path.startsWith(`/admin/buses/${id}`)
        ) {
            return {
                label: "Bus List",
                action: () => navigate("/admin/buses")
            }
        }

        if (path === "/admin/routes") {

            return {
                label: "Add Route",
                action: () => navigate("/admin/routes/create")
            }
        }

        if (path === "/admin/routes/create" ||
            path.startsWith(`/admin/routes/${id}/edit`) ||
            path.startsWith(`/admin/routes/${id}`)
        ) {
            return {
                label: "Route List",
                action: () => navigate("/admin/routes")
            }
        }

        if (path === "/admin/stops") {

            return {
                label: "Add Stop",
                action: () => navigate("/admin/stops/create")
            }
        }

        if (path === "/admin/stops/create" ||
            path.startsWith("/admin/stops/update") ||
            path.startsWith("/admin/stops/details")
        ) {
            return {
                label: "Stop List",
                action: () => navigate("/admin/stops")
            }
        }

        if (path === "/admin/schedules") {

            return {
                label: "Add Schedule",
                action: () => navigate("admin/schedules/create")
            }
        }

        if (path === "/admin/schedules/create" ||
            path.startsWith("/admin/schedules/update") ||
            path.startsWith("/admin/schedules/details")
        ) {
            return {
                label: "Schedule List",
                action: () => navigate("/admin/schedules")
            }
        }

        if (path === "/admin/fares") {
            return {
                label: "Add Fare",
                action: () => navigate("/admin/fares/create")
            }
        }

        if (path === "/admin/fares/create" ||
            path.startsWith("/admin/fares/update") ||
            path.startsWith("/admin/fares/details")
        ) {
            return {
                label: "Fare List",
                action: () => navigate("/admin/fares")
            }
        }

        if (path === "/admin/notifications") {

            return {
                label: "Add Notification",
                action: () => navigate("/admin/notifications/create")
            }
        }

        if (path === "/admin/notifications/create" ||
            path.startsWith("/admin/notifications/details")
        ) {
            return {
                label: "Notification List",
                action: () => navigate("admin/notifications")
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