import React, { useState, useEffect } from "react"
import "./styles/style.css"
import { useAuth } from "../AuthContext/AuthContext"

const ReportForm = () => {
  const { token } = useAuth()
  const [categories, setCategories] = useState([])
  const [priorities, setPriorities] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isAnonymous: false,
    involveOthers: false,
    priorityId: 1,
    categoryId: 1,
    media: null,
  })

  useEffect(() => {
    const fetchInitialData = async () => {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", `Bearer ${token}`)

      try {
        const categoriesResponse = await fetch(
          "https://whistle-blower-server.vercel.app/categories/all",
          {
            method: "GET",
            headers: myHeaders,
          }
        )
        const categoriesData = await categoriesResponse.json()

        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data)
        } else {
          console.error("Failed to fetch categories: Invalid data format")
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error)
      }
    }

    fetchInitialData()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      media: e.target.files[0],
    })
  }

  const uploadMedia = async () => {
    const formMedia = new FormData()
    formMedia.append("file", formData.media)
    formMedia.append("upload_preset", "ml_default")

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/whistleblower/upload"

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formMedia,
    })

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mediaUrl = await uploadMedia()

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...formData,
        media: mediaUrl,
      }),
      redirect: "follow",
    }

    fetch(
      "https://whistle-blower-server.vercel.app/reports/create",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
  }

  return (
    <div className="report-form-container">
      <form onSubmit={handleSubmit} className="flex-form">
        <div className="flex-container">
          <div className="title-report">
            <h2>Report Form</h2>
          </div>
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
        </div>
        <div className="flex-container bottom">
          <div className="checkboxes">
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
        <div className="buttons">
          <button type="submit">Submit Report</button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm
