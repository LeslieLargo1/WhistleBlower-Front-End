import React from "react"
import "./styles/style.css"
import { useNavigate } from "react-router"


const Homepage = () => {
  const navigate = useNavigate();
  const takeAction = () => {
    navigate("/register");
  };

  return (
    <>
      {/* <div className="hero-image">
        <div className="overlay"></div>
      </div> */}
      <div className="home-page">
        <div className="content-container">
          <h1 className="title-hero">Whistleblower</h1>
          <p className="info-text">
            Unlawful activities and abuse of law may occur in any organization.
            Be the change and take action now.
          </p>
          <div className="action-section">
            <button className="action-button" onClick={takeAction}>
              <p className="action-text">Take Action</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
