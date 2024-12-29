import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./showCustomers.css"
import axios from "axios";
import { apiurl } from "../../../../config/config.js";

function ShowUsers(){
    const [getUsers, setGetUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Fetching the Customers Data
    const fetchUserData = async() => {
        try{
            setLoading(true);
            const response = await axios.get(`${apiurl}/users/getAllUsers`, {withCredentials:true})
            setGetUsers(response.data);
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false);
        }
    };

    //View Details of the Customer 
    const handleView = (userId) => {
           navigate(`/admin/customer/view/${userId}`);
    }

    //deleting Customer
    const handleDelete = async(userId) => {
        try{
        await axios.delete(`http://localhost:8000/users/delete/${userId}`,{withCredentials:true})
        alert("User has been deleted successfully")
        setGetUsers(getUsers.filter((user) => user._id !== userId))
        }
        catch(err){
            alert("Error,Unable to delete the User", err)
        }
    };

    useEffect(() => {
        fetchUserData();
    },[])

    if(loading)return <>loading, please wait....</>
    if(error)return <>Error, {error}</>
    return(
        <>
        <div className="container">
            <div className="uSection">
                <table className="uContent">
                    <tr>
                        <th>S.no</th>
                        <th>User_id</th>
                        <th>User_name</th>
                        <th>User_mail</th>
                        <th colSpan='2'>operations</th>
                    </tr>
                    {getUsers?.map((item, index) => (
                        <>
                        <tr key={item._id}>
                            <td>{index}</td>
                            <td>{item._id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <button
                                    onClick={() => handleView(item._id)}
                                    className="btn btn-success"
                                >view
                                </button>
                            </td>
                            <td>
                                <button
                                   onClick={() => handleDelete(item._id)}
                                   className="btn btn-danger"
                                >
                                delete
                                </button>
                            </td>
                        </tr>
                        </>
                    ))}
                </table>
            </div>
        </div>
        </>
    )
};
export default ShowUsers;