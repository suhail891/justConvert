import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Image to PDF",
      description: "Convert multiple images into a single PDF file.",
      route: "/imageToPdf",
      icon: "🖼️",
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one document.",
      route: "/mergePdf",
      icon: "📄",
    },
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">PDF Tools</h1>

        <p className="hero-subtitle">
          Simple and fast tools to manage your PDF files.
        </p>
      </div>

      <div className="tool-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>

            <h2>{tool.title}</h2>

            <p>{tool.description}</p>

            <button
              className="tool-btn"
              onClick={() => navigate(tool.route)}
            >
              Open Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;