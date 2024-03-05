import React from 'react'
import avatar from "../../../assets/images/avatar.png";
export default function Navbar({adminData}) {
  console.log(adminData);
  return (
    <div className="container bg-light my-2 p-0 rounded-4">
    <nav className="navbar navbar-expand-lg navbar-transparent">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex mx-md-auto align-items-center w-75">
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <img src={avatar} />
                  </div>
                  <h5>{adminData?.userName}</h5>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa-solid fa-angle-down"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa-solid fa-bell"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
}
