import React from 'react';
import "./styles/style.css";

const mockUserData = {
  id: 6,
  username: "Leslie",
  email: "leslie@example.com",
  role: "client",
  // Add other mock user data here
};

export const ProfileAdmin = () => {
  return (
    <div className="profile-ADMIN">
      <div className="div">
        <img className="logowhistleblower" alt="logoWhistleblower" src="./styles/logoWhistleblower.png" />
        <div className="overlap-group">
          {/* Your navigation elements */}
        </div>
        <div className="overlap">
          <div className="flexcontainer">
            <p className="text">
              <span className="text-wrapper-3">Welcome,&nbsp;</span>
              <span className="text-wrapper-4">{mockUserData.username}</span>
            </p>
            <p className="text">
              <span className="text-wrapper-5">{mockUserData.role}</span>
            </p>
          </div>
        </div>
        <div className="line" alt="Line" src="./styles/line-1.svg" />
        <div className="flexcontainer-2">
          <p className="p">
            <span className="text-wrapper">Name:</span>
            <span className="text-wrapper-6">
              {mockUserData.username}
              <br />
            </span>
          </p>
          <p className="p">
            <span className="text-wrapper">Email:</span>
            <span className="text-wrapper-6"> {mockUserData.email} </span>
          </p>
        </div>
        <div className="text-wrapper-7">Personal info:</div>
        <div className="img" alt="Line" src="./styles/line-1.svg" />
        <div className="div-wrapper">
          <button className="text-wrapper-8">Inbox</button>
        </div>
        <div className="overlap-3">
          <button className="text-wrapper-10">Change password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
