import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";

import { getAllBuses } from "../../../services/busService";
import { useState } from "react";


const BusList = () => {

    let navigate = useNavigate();

    let [buses, setBuses] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");




    return (<></>)
}