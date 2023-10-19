import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgJssolarHome from "../../img/imgJssolarHome.jpg";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div
      className="text-center "
      style={{ backgroundColor: "rgb(149,223,232)" }}
    >
      <h1 className="text-dark pt-4">Home</h1>
      <p>
        <img src={imgJssolarHome} />
      </p>
      <div className="alert alert-info">{store.message}</div>
      <p></p>
    </div>
  );
};
