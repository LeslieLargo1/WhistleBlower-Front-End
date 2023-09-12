import { useState } from "react"
import "./styles/accordion.css"

const Accordion = () => {
  const [selected, setSelected] = useState(null)

  const toggle = (indexOf) => {
    setSelected((prevSelected) => (prevSelected === indexOf ? null : indexOf))
  }

  const data = [
    {
      question: "What is Whistleblowing?",
      answer:
        "Internal whistleblowing is when someone makes a report within an organization. Often companies implement internal whistleblowing channels for this purpose so that employees and other stakeholders can speak up if they become aware of misconduct. Employees can also report to their line manager.",
    },
    {
      question: "What is a Whistleblowing hotline?",
      answer:
        "It's a website that can be used to submit a report. Accessible from any location and provides a central contact point for whistleblowers. Whistleblowers fill out a case report form about the case and are free to leave their personal data. The reporting system creates a mailbox through which the case manager can communicate further with the whistleblower. If the compliance manager receives a report, he or she examines the case and initiates further steps.",
    },
    {
      question: "Processing times?",
      answer:
        "The company is obliged to confirm receipt of the report to the whistleblower within seven days. The whistleblower must be informed of any action taken within three months, the status of the internal investigation and its outcome.",
    },
  ]

  return (
    <div className="wrapper">
      <div className="accordion">
        {data.map((item, indexOf) => (
          <div className="item" key={indexOf}>
            <div className="title" onClick={() => toggle(indexOf)}>
              <h2>{item.question}</h2>
              <span className="plus">{selected === indexOf ? "-" : "+"}</span>
            </div>
            {selected === indexOf && (
              <div className="answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accordion
