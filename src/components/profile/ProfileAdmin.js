import React from 'react';

import "./styles/style.css";

export const ProfileAdmin = () => {
  return (
    <div className="profile-ADMIN">
      <div className="div">
        <img className="logowhistleblower" alt="logoWhistleblower" src="./styles/logoWhistleblower.png" />
        <div className="overlap-group">
          {/* <div className="nav-bar" /> */}
          {/* <p className="HOME-ABOUT-CONTACT">
            <span className="text-wrapper">HOME&nbsp;&nbsp; ABOUT&nbsp;&nbsp; CONTACT&nbsp;&nbsp;</span>
            <span className="text-wrapper"> INBOX</span>
            <span className="span">&nbsp;</span>
          </p> */}
          <button className="sign-out-button">SIGN OUT</button>

        </div>
        <div className="overlap">
          <div className="flexcontainer">
            <p className="text">
              <span className="text-wrapper-3">
                Welcome,
                <br />
              </span>
            </p>
            <p className="text">
              <span className="text-wrapper-4">
                Bray Wyatt
                <br />
              </span>
            </p>
            <p className="text">
              <span className="text-wrapper-5">Admin</span>
            </p>
          </div>
        </div>
        <div className="line" alt="Line" src="./styles/line-1.svg" />
        <div className="flexcontainer-2">
          <p className="p">
            <span className="text-wrapper">Name:</span>
            <span className="text-wrapper-6">
              {" "}
              Bray Wyatt
              <br />
            </span>
          </p>
          <p className="p">
            <span className="text-wrapper">Email:</span>
            <span className="text-wrapper-6"> b.wyatt@gmail.com </span>
          </p>
        </div>
        <div className="text-wrapper-7">Personal info:</div>
        <div className="img" alt="Line" src="./styles/line-1.svg" />
        <div className="div-wrapper">
          <button className="text-wrapper-8">Inbox</button>
        </div>
        {/* <div className="overlap-2">
          <p className="text-wrapper-9">© 2023 Whistleblower. All rights reserved.</p>
        </div> */}
        <div className="overlap-3">
          <button className="text-wrapper-10">Change password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
