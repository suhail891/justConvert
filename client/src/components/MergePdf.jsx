import React, { useState } from "react";
import axios from "axios";
import "../styles/MergePdf.css";

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Handle selected files
  const handleFiles = (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    setFiles(pdfFiles);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag events
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

  const handleMerge = async () => {
    if (files.length === 0) {
      alert("Please select PDF files");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("pdfs", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/merge/pdf/merge`,
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
      link.download = "merged.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Merge error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">PDF Merge</h1>

      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          id="pdfInput"
          hidden
        />

        <label htmlFor="pdfInput" className="drop-label">
          <p className="drop-text">Drag & Drop PDFs Here</p>
          <span>or click to browse</span>
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected PDFs:</h3>

          {files.map((file, index) => (
            <p key={index}>📄 {file.name}</p>
          ))}
        </div>
      )}

      <button className="merge-btn" onClick={handleMerge}>
        Merge PDFs
      </button>
    </div>
  );
};

export default MergePdf;