import { useState } from "react";
import './styles/accordion.css';



const Accordion = () => {
    const [expand1, setExpand1] = useState(false);
    const [expand2, setExpand2] = useState(false);
    const [expand3, setExpand3] = useState(false);

    const toggleExpand1 = () => setExpand1(prevExpand1 => !prevExpand1);
    const toggleExpand2 = () => setExpand2(prevExpand2 => !prevExpand2);
    const toggleExpand3 = () => setExpand3(prevExpand3 => !prevExpand3);


    return (
        <div className="accordion">
            <div className="question">
                <button onClick={toggleExpand1}>What is Whistleblowing? +</button>
                {expand1 && <div className="answer">Internal whistleblowing is when someone makes a report within an organisation. Often companies implement internal whistleblowing channels for this purpose so that employees and other stakeholders can speak up if they become aware of misconduct. Employees can also report to their line manager.</div>}
            </div>
            <div className="question">
                <button onClick={toggleExpand2}>What is a Whistleblowing hotline? +</button>
                {expand2 && <div className="answer">
                    A digital whistleblowing hotline is a software application that  can use to submit a report – via a website. It is also accessible at any time and from any location and provides a central contact point for whistleblowers. When reporting, whistleblowers fill out a case report form which requests important information about the case. Whistleblowers are free to leave their personal data. The reporting system creates a mailbox through which the case manager can communicate further with the whistleblower. If the compliance manager receives a report, he or she examines the case and initiates further steps.</div>}
            </div>
            <div className="question">
                <button onClick={toggleExpand3}>Processing times? +</button>
                {expand3 && <div className="answer">The company is obliged to confirm receipt of the report to the whistleblower within seven days. The whistleblower must be informed of any action taken within three months, the status of the internal investigation and its outcome.
                </div>}
            </div>
        </div>

    );

}


export default Accordion;