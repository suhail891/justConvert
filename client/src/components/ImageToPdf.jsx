import React, { useState } from "react";
import axios from "axios";
import "../styles/ImageToPdf.css";

const ImageToPdf = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

 
  const handleFiles = (selectedFiles) => {
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      ["image/png", "image/jpeg"].includes(file.type)
    );

    setFiles(imageFiles);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Please select images");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/convert/pdf/image-to-pdf`,
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "images.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Image to PDF</h1>

      {/* Drag & Drop Area */}
      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          id="fileInput"
          hidden
        />

        <label htmlFor="fileInput" className="drop-label">
          <p className="drop-text">Drag & Drop Images Here</p>
          <span>or click to browse</span>
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Images:</h3>

          {files.map((file, index) => (
            <p key={index}>📷 {file.name}</p>
          ))}
        </div>
      )}

      <button className="convert-btn" onClick={handleConvert}>
        Convert to PDF
      </button>
    </div>
  );
};

export default ImageToPdf;