import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const [isAdmin, setIsAdmin] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/authverify/auth/verifyadmin",
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.log("Error verifying admin:", err);
            } finally {
                setIsLoading(false); 
            }
        };

        verifyAuth();
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return isAdmin ? <Outlet /> : <Navigate to="/signup" />;
}

export default ProtectedRoute;