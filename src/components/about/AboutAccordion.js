import { useState } from "react";
import "./styles/aboutAccordion.css";

const AboutAccordion = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected((prevSelected) => (prevSelected === index ? null : index));
  };

  const data = [
    {
      question: "Our Mission",
      answer: "Our Mission is to foster transparency, integrity, and accountability within our organization and the wider community. We are committed to providing a secure and confidential platform for individuals to report wrongdoing, ensuring their voices are heard, and taking decisive action against misconduct.",
      imageSrc: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    },
    {
      question: "Values",
      answer: "Integrity - We uphold the highest standards of honesty and ethical conduct. We believe in doing what is right, even when it's difficult.",
      imageSrc: "https://images.unsplash.com/photo-1637919649104-c292cbbbd97b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    {
      question: "Whistleblower Protection",
      answer: "We prioritize the safety and well-being of whistleblowers. We provide safeguards to ensure their anonymity and protect them from retaliation.",
      imageSrc: "https://images.unsplash.com/photo-1558021211-6d1403321394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80",
    },
  ];

  return (
    <div className="section1">
      <div className="aboutAccordion">
        {data.map((item, index) => (
          <div className="item" key={item.question}>
            <div className="aboutTitle" onClick={() => toggle(index)}>
              <h2>{item.question}</h2>
              <span className="plus">{selected === index ? "-" : "+"}</span>
            </div>
            {selected === index && (
              <div className="answerAbout">
                <p className="aboutPara">{item.answer}</p>
                <img className="pic" src={item.imageSrc} alt={item.question} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutAccordion;
