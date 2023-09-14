import React, { useState } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import "./styles/style.css"

const NewCategoryComponent = () => {
  const { token } = useAuth()
  const [categoryName, setCategoryName] = useState("")

  const handleInputChange = (e) => {
    setCategoryName(e.target.value)
  }
  const clearInput = () => {
    setCategoryName("")
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button type="submit" className="create-button">
            Create
          </button>
          <button type="button" className="clear-button" onClick={clearInput}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCategoryComponent
