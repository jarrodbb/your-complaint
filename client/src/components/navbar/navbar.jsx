import React from "react";
import "./navbar.css";

import AuthService from "../../utils/auth";

import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const currentPage = useLocation().pathname;
  const isAuthenticated = AuthService.loggedIn();
  // console.log();

  const handleLogout = () => {
    AuthService.logout();
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Link for "Home" */}
        <Link to="/" className={currentPage === "/" ? "nav-link active" : "nav-link"} data-text="Home">
          <i className="far fa fa-home"></i>
          Home
        </Link>
        {/* Link for "Profile" */}
        <Link to="/profile" data-text="Profile">
          <i className="far fa-user"></i>
          Profile
        </Link>
        <a href="#skills" data-text="Skills">
          <i className="far fa-file-code"></i>
          Skills
        </a>
        {/* Link for "Contact" */}
        <Link to="/contact" className={currentPage === "/contact" ? "nav-link active" : "nav-link"}>
          <i className="far fa fa-phone"></i>
          Contact
        </Link>
        {/* Link for "Terms and Conditions" */}
        <Link to="/terms" className={currentPage === "/terms" ? "nav-link active" : "nav-link"}>
          <i className="far fa fa-book"></i>
          T&Cs
        </Link>
        {/* Link for "Donate" */}
        <Link to="/donate" className={currentPage === "/donate" ? "nav-link active" : "nav-link"}>
          <i className="far fa-heart"></i>
          Donate
        </Link>
        {/* Link for "Signup/Signin" */}
        {/* Conditional rendering for "Sign-up/Sign-in" or "Logout" */}
        {isAuthenticated ? (
          // Render Logout button if user is authenticated
          <button onClick={handleLogout}>
            <i className="far fa-user"></i> Logout
          </button>
        ) : (
          // Render Login button if user is not authenticated
          <Link to="/SignUp" className={currentPage === "/donate" ? "nav-link active" : "nav-link"}>
            <i className="far fa-user-circle"></i>
            SIGN UP/IN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
