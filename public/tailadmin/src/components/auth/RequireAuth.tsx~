import {JSX, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            navigate("/signin");
            return;
        }

        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://doova.tools";

        axios.get(`${API_BASE_URL}/api/check`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            // Authenticated, do nothing
        }).catch(() => {
            navigate("/signin");
        });
    }, [navigate]);


    return children;
}
