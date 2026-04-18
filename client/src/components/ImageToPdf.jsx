import React, { useState } from "react";
import axios from "axios";

const ImageToPdf=()=> {

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);

    console.log("Selected files:", selectedFiles); // debug

    setFiles(selectedFiles);

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
        "http://localhost:3000/api/pdf/image-to-pdf",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data)
      const blob = new Blob([response.data], { type: "application/pdf" });
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
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Image to PDF</h1>
      <br />
      <button>
        <input
        type="file"
        multiple
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
      />
      </button>

      <br /><br />

      <button onClick={handleConvert}>
        Convert to PDF
      </button>

      <p>{files.length} images selected</p>


    </div>
  );
}

export default ImageToPdf;