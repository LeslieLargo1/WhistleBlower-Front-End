import React from "react"
import "./styles/Success.css"

export const Success = () => {
  return (
    <div className="report-submitted">
      <div className="div">
        <img
          className="solid-thumbs-up"
          alt="Solid thumbs up"
          src="fa6-solid-thumbs-up.svg"
        />
        <p className="your-report-has-been">
          <span className="text-wrapper"> Your report has been submitted!</span>
          <span className="span">Success!</span>
        </p>
      </div>
    </div>
  )
}

export default Success
