import React, { useContext, useEffect } from "react";
import imagenPrivada from "../../img/imagenPrivada.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/Register.css";

const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  }, [store.token]);

  return (
    <>
      {store.token && (store.token != store.token) != undefined ? (
        <div
          className="text-center "
          style={{ backgroundColor: "rgb(149,223,232)" }}
        >
          <h1 className="text-light pt-4  ">
            {"Hola, esta es mi ruta privada " + store.email}
          </h1>
          <p>
            <img src={imagenPrivada} className="imagen rounded-circle" />
          </p>
          <div className="alert alert-info">{store.message}</div>
          <p>
            <a href="https://start.4geeksacademy.com/starters/react-flask">
              Read documentation
            </a>
          </p>
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center">No tienes acceso a esta sección</h1>
          <Link to={"/"}>
            <button
              className="btn btn-info p-1 m-1 text-center"
              onClick={actions.logout}
            >
              Volver
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Private;
