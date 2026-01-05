import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, logout } from "../../utils/auth";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🌙 Dark mode effect
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  // 📜 Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30; // Reduced threshold
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // 🔐 Logout
  const handleLogout = () => {
    logout(); // remove token
    navigate("/login");
  };

  // 🏠 Handle logo click
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={handleLogoClick}>
        Er. Shivam08
      </div>

      <ul className="nav-links">
        <NavLink to="/" end>
          <span>🏠</span> Home
        </NavLink>
        <NavLink to="/about">
          <span>👤</span> About
        </NavLink>
        <NavLink to="/skills">
          <span>💻</span> Skills
        </NavLink>
        <NavLink to="/projects">
          <span>🚀</span> Projects
        </NavLink>
        <NavLink to="/tools">
          <span>🛠️</span> Tools
        </NavLink>
        <NavLink to="/friends">
          <span>👥</span> Friends
        </NavLink>

        {/* 🔐 Auth-based links */}
        {isAuthenticated() ? (
          <>
            <NavLink to="/admin">
              <span>📊</span> Dashboard
            </NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              <span>🔓</span> <span className="btn-text">Logout</span>
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <span>🔐</span> Login
          </NavLink>
        )}

        {/* 🌙 Theme toggle */}
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <span>☀️</span> : <span>🌙</span>}
          <span className="btn-text">{darkMode ? " Light" : " Dark"}</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
