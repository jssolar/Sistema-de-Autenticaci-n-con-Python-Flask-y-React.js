import React, { useContext } from "react";
import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container-register">
      <div className="d-flex ">
        <form
          action="/register"
          method="POST"
          className="formulario"
          onSubmit={(e) => actions.submitRegister(e, navigate)}
        >
          <h4 className="text-center">Register</h4>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            id="inputEmail1"
            aria-describedby="emailHelp"
            required
            name="email"
            value={store.newUser.email}
            onChange={actions.handleChangeRegister}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="form-control mb-2"
            id="password"
            required
            value={store.newUser.password}
            onChange={(e) => actions.handleChangeRegister(e)}
          />
          <label htmlFor="password">Repetir Password</label>
          <input
            type="password"
            placeholder="Password"
            name="rep_password"
            className="form-control mb-2"
            id="rep_password"
            required
            value={store.newUser.rep_password}
            onChange={(e) => actions.handleChangeRegister(e)}
          />
          <button type="submit" className="boton-register">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
