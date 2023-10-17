import React from "react";

const Login = () => {
  return (
    <div className="container-register">
      <div className="d-flex ">
        <form action="/home" method="POST" className="formulario">
          <h4 className="text-center">Login</h4>
          <label htmlFor="email">Email: </label>
          <input type="email" placeholder="Email" name="email"></input>
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password" name="password"></input>
          <button type="submit" className="boton-register">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
