import React, { useState } from "react"
import "./styles/style.css"

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: 0,
    priorityId: 0,
    media: null,
    isAnonymous: false,
    involveOthers: false,
    status: "Pending",
  })

  // Mock data for categories and priorities
  const categories = [
    { id: 1, name: "Financial" },
    { id: 2, name: "HR" },
    { id: 3, name: "Technical" },
  ]

  const priorities = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      media: e.target.files[0],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission, likely making an API call.
  }

  return (
    <div className="report-form-container">
      <form onSubmit={handleSubmit} className="flex-form">
        <div className="flex-container">
          <div className="title-report">
           < h2>Report Form</h2></div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex-container top">
          <div className="category">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="priority">
            <label htmlFor="priorityId">Priority</label>
            <select
              id="priorityId"
              name="priorityId"
              value={formData.priorityId}
              onChange={handleChange}
              required
            >
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-container bottom">
          <div div className="checkboxes">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      isAnonymous: !formData.isAnonymous,
                    })
                  }
                />
                Submit Anonymously
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="involveOthers"
                  checked={formData.involveOthers}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      involveOthers: !formData.involveOthers,
                    })
                  }
                />
                Involve Others
              </label>
            </div>
          </div>
          <div className="media">
            <label htmlFor="media">Media</label>
            <input
              type="file"
              id="media"
              name="media"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  )
}

export default ReportForm
