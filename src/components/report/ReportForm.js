import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isAnonymous: false,
    involveOthers: false,
    priorityId: 1,
    categoryId: 1,
    media: null,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      try {
        const categoriesResponse = await fetch(
          "https://whistle-blower-server.vercel.app/categories/all",
          {
            method: "GET",
            headers: myHeaders,
          }
        );
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data);
        } else {
          console.error("Failed to fetch categories: Invalid data format");
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
  }, [token]);

  const uploadMedia = async () => {
    const formMedia = new FormData();
    formMedia.append("file", formData.media);
    formMedia.append("upload_preset", "ml_default");

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/whistleblower/upload";
    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formMedia,
      });
      if (!response.ok) {
        console.error(`Cloudinary upload failed: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error during Cloudinary upload:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let base64Media = "";
    if (formData.media) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.media);
      reader.onloadend = () => {
        base64Media = reader.result.split(',')[1];
      };
      reader.onerror = () => {
        console.error("FileReader error");
        return;
      };
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
  
    const body = JSON.stringify({
      title: formData.title,
      description: formData.description,
      isAnonymous: formData.isAnonymous,
      involveOthers: formData.involveOthers,
      media: base64Media,
      // ...other formData fields you might have
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/reports/create",
        requestOptions
      );
  
      if (!response.ok) {
        console.error(`Report creation failed: ${response.statusText}`);
        return;
      }
  
      const result = await response.json();
      if (result.success) {
        console.log("Report successfully created.");
        navigate("/dashboard/client");
      } else {
        console.error("Failed to create report:", result.message);
      }
    } catch (error) {
      console.error("Error during report creation:", error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

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
