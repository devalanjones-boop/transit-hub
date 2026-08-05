import { useState } from "react";
import { Bell, Bus, CalendarDays, ChevronDown, ChevronRight, IndianRupee, LayoutDashboard, LogOut, MapPin, MessageSquare, Route, Users, X } from "lucide-react"
import { Navigate, NavLink, replace } from "react-router-dom";




const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {


    let [openMenu, setOpenMenu] = useState(null);

    let toggleMenu = (menu) => {

        setOpenMenu(openMenu === menu ? null : menu);
    }

    let menuClass = ({ isActive }) =>

        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`;




    return (

        <>

            {/* {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )} */}

            <aside
                className={`fixed top-16 left-0 z-40
                    h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0

                `}
            >

                <div className="flex items-center justify-between px-5 border-b border-gray-200">



                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                    >
                        {/* <X size={22} /> */}

                    </button>

                </div>

                <nav className="p-4 space-y-2">

                    <NavLink
                        to="/admin/dashboard"
                        className={menuClass}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>

                    </NavLink>

                    {/* Users */}
                    <NavLink
                        to="/admin/users"
                        className={menuClass}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <Users size={20} />
                        <span>Users</span>

                    </NavLink>


                    {/* Buses */}
                    <div>

                        <button
                            onClick={() => toggleMenu("buses")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <Bus size={20} />
                                <span>Buses</span>
                            </div>

                            {openMenu === "buses" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "buses" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/buses"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Bus List
                                </NavLink>

                                <NavLink
                                    to="/admin/buses/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Bus
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Routes */}
                    <div>

                        <button
                            onClick={() => toggleMenu("routes")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <Route size={20} />
                                <span>Routes</span>
                            </div>

                            {openMenu === "routes" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "routes" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/routes"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Route List
                                </NavLink>

                                <NavLink
                                    to="/admin/routes/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Route
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Stops */}
                    <div>

                        <button
                            onClick={() => toggleMenu("stops")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <MapPin size={20} />
                                <span>Stops</span>
                            </div>

                            {openMenu === "stops" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "stops" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/stops"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Stop List
                                </NavLink>

                                <NavLink
                                    to="/admin/stops/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Stop
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Fares */}
                    <div>

                        <button
                            onClick={() => toggleMenu("fares")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <IndianRupee size={20} />
                                <span>Fares</span>
                            </div>

                            {openMenu === "fares" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "fares" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/fares"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Fare List
                                </NavLink>

                                <NavLink
                                    to="/admin/fares/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Fare
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Schedules */}
                    <div>

                        <button
                            onClick={() => toggleMenu("schedules")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <CalendarDays size={20} />
                                <span>Schedules</span>
                            </div>

                            {openMenu === "schedules" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "schedules" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/schedules"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Schedule List
                                </NavLink>

                                <NavLink
                                    to="/admin/schedules/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Schedule
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Notifications */}
                    <div>

                        <button
                            onClick={() => toggleMenu("notifications")}
                            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <Bell size={20} />
                                <span>Notifications</span>
                            </div>

                            {openMenu === "notifications" ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {openMenu === "notifications" && (
                            <div className="ml-8 mt-1 space-y-1">

                                <NavLink
                                    to="/admin/notifications"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Notification List
                                </NavLink>

                                <NavLink
                                    to="/admin/notifications/create"
                                    className={menuClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Add Notification
                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* Feedbacks */}
                    <NavLink
                        to="/admin/feedbacks"
                        className={menuClass}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <MessageSquare size={20} />
                        <span>Feedbacks</span>

                    </NavLink>

                    <button onClick={() => {

                        localStorage.removeItem(token);
                        Navigate("/login", { replace: true });
                    }}
                        className="w=full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        <span>LogOut</span>


                    </button>



                </nav>


            </aside>

        </>
    )
}

export default AdminSidebar