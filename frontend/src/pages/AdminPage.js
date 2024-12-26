import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import AdminNavbar from "../components/AdminPanel/adminNavbar.js";
import ShowHotels from "../components/AdminPanel/AdminHotel/ShowHotels/showHotels.js";
import ShowUsers from "../components/AdminPanel/AdminCustomer/ShowCustomers/showCustomers.js";
// import ShowRooms from "../components/AdminPanel/AdminRooms/ShowRooms/showRooms.js";

function Admin() {
  const [activeTab, setActiveTab] = useState("hotels");

  const renderContent = () => {
    switch (activeTab) {
      case "hotels":
        return <ShowHotels />;
      case "users":
        return <ShowUsers />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <AdminNavbar />
        <div className="tab-container" style={styles.tabContainer}>
          <button
            className={`tab ${activeTab === "hotels" ? "active" : ""}`}
            style={{
              ...styles.tab,
              ...(activeTab === "hotels" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("hotels")}
          >
            Show Hotels
          </button>
          <button
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            style={{
              ...styles.tab,
              ...(activeTab === "users" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("users")}
          >
            Show Users
          </button>
        </div>
        <div className="tab-content" style={styles.tabContent}>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

const styles = {
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  tab: {
    padding: "10px 20px",
    margin: "0 10px",
    border: "none",
    background: "lightgray",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeTab: {
    background: "#007bff",
    color: "white",
    fontWeight: "bold",
    borderBottom: "3px solid #0056b3",
  },
  tabContent: {
    margin: "20px",
    textAlign: "center",
  },
};

export default Admin;
