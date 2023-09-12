import React from "react";
import "./Success.css";

export const ReportSubmitted = () => {
  return (
    <div className="report-submitted">
      <div className="div">
        <img className="solid-thumbs-up" alt="Solid thumbs up" src="fa6-solid-thumbs-up.svg" />
        <p className="your-report-has-been">
          <span className="text-wrapper">
            Your report has been <br />
          </span>
          <span className="span">Submitted</span>
        </p>
      </div>
    </div>
  );
};
