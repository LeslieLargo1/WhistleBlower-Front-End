import React, { useState, useEffect } from "react"
import "./styles/style.css"
import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"

const ReportForm = () => {
  const { token } = useAuth()
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
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

  const uploadMedia = async () => {
    const formMedia = new FormData()
    formMedia.append("file", formData.media)
    formMedia.append("upload_preset", "ml_default")

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/whistleblower/upload"
    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formMedia,
      })
      if (!response.ok) {
        console.error(`Cloudinary upload failed: ${response.statusText}`)
        return
      }
      const data = await response.json()
      return data ? data.url : ""
    } catch (error) {
      console.error("Error during Cloudinary upload:", error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let mediaUrl = ""
    if (formData.media) {
      mediaUrl = await uploadMedia()
    }

    let base64Media = ""
    if (formData.media) {
      const reader = new FileReader()
      reader.readAsDataURL(formData.media)
      reader.onloadend = () => {
        base64Media = reader.result.split(",")[1]
      }
      reader.onerror = () => {
        console.error("FileReader error")
        return
      }
    }

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    const body = JSON.stringify({
      title: formData.title,
      description: formData.description,
      isAnonymous: formData.isAnonymous,
      involveOthers: formData.involveOthers,
      categoryId: formData.categoryId,
      submitted_at: formattedDate,
      priorityId: formData.priorityId,
      media: mediaUrl,
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
    }

    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/reports/create",
        requestOptions
      )

      if (!response.ok) {
        console.error(`Report creation failed: ${response.statusText}`)
        return
      }

      const result = await response.json()
      if (result.success) {
        console.log("Report successfully created.")
        navigate("/dashboard/client")
      } else {
        console.error("Failed to create report:", result.message)
      }
    } catch (error) {
      console.error("Error during report creation:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className="report-form-container">
      <form onSubmit={handleSubmit} className="flex-form">
        <div className="flex-container">
          <div className="title-report">
            <h2>Report Form</h2>
          </div>
          <div className="top">
            <div className="title-container">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="flex-container top">
              <div className="category">
                <label htmlFor="categoryId">Category</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required={true}
            />
          </div>{" "}
          <div className="priority">
            <label htmlFor="priorityId">Priority</label>
            <select
              id="priorityId"
              name="priorityId"
              value={formData.priorityId}
              onChange={handleChange}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>
        {/*<div className="media">
          <label htmlFor="media">Media</label>
          <input type="file" id="media" name="media" onChange={handleChange} />
        </div>*/}
        <div className="buttons">
          <button type="submit">Submit Report</button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm
