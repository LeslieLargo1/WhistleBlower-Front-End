import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

const CreateNewAdminForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreateNewAdmin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/register-admin",
        requestOptions
      );
      const data = await response.json();
      if (data.success) {
        console.log('New admin created successfully');
        navigate("/dashboard/admin");
      } else {
        console.log('Failed to create new admin');
      }
    } catch (error) {
      console.error("Failed to create new admin:", error);
    }
  };

  return (
    <div className="new-admin-form">
      <h1>Create New Admin</h1>
      <form onSubmit={handleCreateNewAdmin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className="create-button">Create</button>
      </form>
    </div>
  );
};

export default CreateNewAdminForm;