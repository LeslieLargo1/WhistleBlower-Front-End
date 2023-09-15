import React, { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import './styles/style.css';
import { FaPlus, FaTimes } from 'react-icons/fa';

const NewCategoryComponent = () => {
  const { token } = useAuth();
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const clearInput = () => {
    setCategoryName('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/categories/create",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ name: categoryName }),
        }
      )

      if (response.ok) {
        console.log("Category created successfully")
        alert("Category created successfully")
        clearInput()
      } else {
        console.log("Failed to create category")
        alert("Failed to create category")
      }
    } catch (error) {
      console.error("An error occurred:", error)
      alert("An error occurred. Please try again")
    }
  }
  return (
    <div className="inline-form">
      <h4 className="form-title">Create New Category</h4>
      <form onSubmit={handleFormSubmit} className="category-form">
        <label>
          <input
            type="text"
            value={categoryName}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
          <button type="submit" className="icon-button" title="Create Category">
            <FaPlus />
          </button>
          <button type="button" className="icon-button" onClick={clearInput} title="Clear">
            <FaTimes />
          </button>
      </form>
    </div>
  );
};

export default NewCategoryComponent;