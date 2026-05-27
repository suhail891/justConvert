import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        📄 PDF Tools
      </div>

      <div className="nav-links">
        <button
          className={
            location.pathname === "/" ? "nav-btn active" : "nav-btn"
          }
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          className={
            location.pathname === "/imageToPdf"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => navigate("/imageToPdf")}
        >
          Image to PDF
        </button>

        <button
          className={
            location.pathname === "/mergePdf"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => navigate("/mergePdf")}
        >
          Merge PDF
        </button>
      </div>
    </nav>
  );
};

export default NavBar;