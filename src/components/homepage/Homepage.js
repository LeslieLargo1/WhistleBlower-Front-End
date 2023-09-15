import React, { useState } from "react"
import "./styles/style.css"
import { useNavigate } from "react-router"

const Homepage = () => {
  const [videoLoaded, setVideoLoaded] = useState(false) 
  const navigate = useNavigate()
  const takeAction = () => {
    navigate("/register")
  }

  
  return (
    <>
      <div className="home-page">
        {!videoLoaded && <span className="background-image fallback"></span>}
        <video
          className="background-video"
          autoPlay
          loop
          muted
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src="https://res.cloudinary.com/whistleblower/video/upload/v1694814905/wistleblower/coverr-waves-in-the-sea-in-indonesia-8666-1080p_vumejd.mp4"
            type="video/mp4"
          />
        </video>
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