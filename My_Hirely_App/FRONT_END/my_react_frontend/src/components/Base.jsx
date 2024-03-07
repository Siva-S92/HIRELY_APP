import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/commoncss/common.css"

function Base() {
  const navigate = useNavigate();

  const handleLogOut = ()=> {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand text-warning fw-bold" href="/#">
              HIRELY
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  ALL-POSTS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/user" >
                  My Account
                </a>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link btn btn-sm btn-outline-secondary text-danger  fw-bold" onClick={handleLogOut}>
                  Logout
                </button>
              </li>
            </ul>
            
            <div className="d-flex">
                <button className="btn btn-sm mx-1 px-4 btn-outline-warning" onClick={ () => navigate("/login") }>Login</button>
                <button className="btn btn-sm mx-1 px-4 btn-outline-warning" onClick={ () => navigate("/signup") }>Signup</button>
            </div>
          </div>
        </div>
      </nav>

      
    </>
  );
}

export default Base;
