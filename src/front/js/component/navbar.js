import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation(); // renderizar con ruta
  console.log(location.pathname);

  return (
    <>
      {store.token && store.token != "" && store.token != undefined ? (
        <nav className="navbar navbar-light bg-dark text-link-light  ">
          <Link to="/">
            <button className="btn btn-info  m-2  text-dark  h1  ">Home</button>
          </Link>

          <div className="container">
            <button className="btn btn-info  m-2  h1 text-dark">
              Click me!
            </button>
            {store.message}
            <div className="ml-auto">
              <Link to="/private">
                <button className="btn btn-info   text-dark m-2 h1 text-light ">
                  perfil
                </button>
              </Link>

              <Link to="/">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    actions.logout();
                  }}
                >
                  Log Out
                </button>
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light bg-dark  ">
          <div className="container">
            <Link to="/">
              <button className="btn btn-info   text-dark mb-0 h1 text-light ">
                Home
              </button>
            </Link>
            <div className="ml-auto">
              <Link to="/login">
                <button className="btn btn-info mx-2">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-info">Register</button>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

// export default Navbar;
