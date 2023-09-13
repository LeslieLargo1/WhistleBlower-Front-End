import React from "react"
import "./styles/style.css"
import Aboutaccordion from "./Aboutaccordion.js"

const About = () => {
  return (
    <>

      <div className="page">
        <div className="opening">
          <h3 className="openingTitle">Helping Millions <br></br>Work Better</h3>
          <div className="image"> </div>
        </div>
        <Aboutaccordion />
      </div>
    </>
  )
}

export default About
