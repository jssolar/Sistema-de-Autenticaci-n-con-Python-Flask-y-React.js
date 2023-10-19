import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container-register">
      <div className="d-flex ">
        <form
          className="formulario"
          onSubmit={(e) => actions.handleSubmitLogin(e, navigate)}
        >
          <h4 className="text-center">Login</h4>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={store.email}
            onChange={(e) => actions.handleChangeLogin(e)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            value={store.password}
            onChange={(e) => actions.handleChangeLogin(e)}
          />
          <button type="submit" className="boton-register">
            Iniciar sesión
          </button>
          <div className="text-center mt-2">
            <Link to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
