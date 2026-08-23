import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/admin/Dashboard";
// import Home from "../pages/user/Home";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";
import BusList from "../pages/admin/buses/BusList";
import BusDetails from "../pages/admin/buses/BusDetails";
import CreateBus from "../pages/admin/buses/CreateBus";
import UpdateBus from "../pages/admin/buses/UpdateBus";


const AppRoutes = () => {

    return (



        <Routes>

            <Route path={"/admin"} element={<AdminLayout />}>

                <Route path={"dashboard"} element={<Dashboard />} />

                <Route path={"buses"} element={<BusList />} />

                <Route path={"buses/:id"} element={<BusDetails />} />

                <Route path={"buses/create"} element={<CreateBus />} />

                <Route path={"buses/:id/edit"} element={<UpdateBus />} />

            </Route>

            {/* <Route path="/home" element={<ProtectedRoute allowedRole="user"> <Home /> </ProtectedRoute>} /> */}


        </Routes>

    )
}

export default AppRoutes