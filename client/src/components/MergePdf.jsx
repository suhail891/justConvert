import React, { useState } from "react";
import axios from "axios";

const MergePdf=()=> {

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);
    console.log("Selected PDFs:", selectedFiles);

    setFiles(selectedFiles);

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
        "http://10.225.84.71:5001/merge",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
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

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>PDF Merge</h1>
      <br />

      <button>
        <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileChange}
      />
      </button>

      <br /><br />

      <button onClick={handleMerge}>
        Merge PDFs
      </button>

      <p>{files.length} PDFs selected</p>
     
    </div>

  );

}

export default MergePdf;