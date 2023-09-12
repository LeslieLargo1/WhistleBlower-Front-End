import React from 'react';
import { useState } from 'react';
import './styles/style.css';
import Accordion from './Accordion';

const Register = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can access the form data in the 'formData' object
    // and perform actions like sending it to a server or validating it.
    console.log(formData);
  };



  const bglink = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"


  return (
    <section className="registerBody" style={{ display: 'flex' }} >
      <div className="registerLeft" style={{ backgroundImage: `url(${bglink})`, backgroundSize: "cover", backgroundRepeat: " no-repeat", width: '465px', height: '500px' }}>
        <Accordion />
      </div>
      <div className='register-right'>
        <div className='buttonsTop'>
          <button className="button1" type="submit">Register</button>
          <button className="button2" type="button" >Sign In </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='userSection'>
            <label htmlFor="username">Username:</label>
            <input
              className=''
              type="text"
              placeholder="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='emailSection'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='passwordSection'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='button3'>
            <button className="registerEnd" type="submit">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
