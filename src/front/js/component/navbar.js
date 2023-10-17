import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-dark text-link-light  ">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1 text-light ">Home</span>
          </Link>
          <div className="ml-auto">
            <Link to="/login">
              <button className="btn btn-primary">login</button>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-light bg-dark text-link-light  ">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1 text-light ">Home</span>
          </Link>
          <div className="ml-auto">
            <Link to="/register">
              <button className="btn btn-primary">register</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
