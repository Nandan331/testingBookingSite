import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get userId from params
import axios from "axios";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./editCustomer.css"

function EditCustomer() {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [originalDetails, setOriginalDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetching user Details by UserId
    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8000/users/getUser/${userId}`,
                { withCredentials: true }
            );
            setUserDetails(response.data);
            setOriginalDetails(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Saving updated user details
    const handleSave = async () => {
        try {
            if (
                userDetails.username === originalDetails.username &&
                userDetails.email === originalDetails.email &&
                userDetails.password === originalDetails.password
            ) {
                alert("No changes were made");
                return;
            }
            await axios.put(
                `http://localhost:8000/users/update/${userId}`,
                userDetails,
                {withCredentials: true}
            );
            alert("User details updated successfully!");
            fetchUserDetails();
        } catch (err) {
            alert("Error updating user details: " + err.message);
        }
    };

    if (loading) return <>Loading, please wait....</>;
    if (error) return <>Error, {error}</>;

    return (
        <div className="fDetails container">
            <div className="fSections">
            <form className="form-control fControl">
            <h4 style={{fontWeight:600}}>Customer name: {userDetails.username}</h4>
                <div className="form-control">
                    <label>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={userDetails.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <label>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={userDetails.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSave}
                >
                    Save
                </button>
            </form>
            </div>
        </div>
    );
}

export default EditCustomer;
