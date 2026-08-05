import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"


const ProtectedRoute = ({ children, allowedRole }) => {

    let token = localStorage.getItem("token")

    if (!token) {

        return <Navigate to={"/login"} replace />
    }

    try {

        let decoded = jwtDecode(token)

        if (decoded.role === allowedRole) {

            return children
        }


    } catch (error) {

        localStorage.removeItem(token)

        return <Navigate to={"/login"} replace />
    }


}

export default ProtectedRoute