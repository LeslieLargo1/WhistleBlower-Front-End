import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { token, logout } = useAuth(); // Include logout from useAuth
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "https://whistle-blower-server.vercel.app/users/profile",
          requestOptions
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleNavigateToCreateNewAdmin = () => {
    navigate("/create-new-admin");
  };

  const handleNavigateToChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile">
        <h1>Admin Profile</h1>
        <p>Username: {userData?.username}</p>
        <p>Role: {userData?.role}</p>
      </div>
      <div className="buttons">
        <button onClick={handleNavigateToCreateNewAdmin}>
          Create New Admin
        </button>
        <button onClick={handleNavigateToChangePassword}>
          Change Password
        </button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};
export default AdminProfile;

