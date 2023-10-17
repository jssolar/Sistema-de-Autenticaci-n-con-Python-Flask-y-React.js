const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: "http://127.0.0.1:3001",

      //-----< creacion/registro  usuario >----->
      users: [],
      newUser: {
        email: "",
        password: "",
        rep_password: "",
      },
      user: "",

      isAuthenticated: false,
      //-----< login >---------->
      // email: "",
      // password: "",
      currentUser: null,
    },
    actions: {
      //--------------------------------------------------------------------------------------------------------------------->
      //-----< código jsolar >------------------------------------------------>

      //---------< funcion para  registro  de usuario >----------------->

      handleChangeRegister: (e) => {
        const { newUser } = getStore();
        e.preventDefault();
        newUser[e.target.name] = e.target.value;
        setStore({ newUser });
        console.log("newUser:", getStore().newUser);
      },

      submitRegister: (e, navigate) => {
        //********************************************************************* */
        e.preventDefault();
        if (getStore().newUser.password === getStore().newUser.rep_password) {
          getActions().saveUser(navigate);
        } else {
          alert("las contraseñas no coinciden");
        }
      },

      saveUser: async (navigate) => {
        try {
          const { url, newUser } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            alert("Registro exitoso!!");
            const data = await response.json();
            console.log("data", data);
            navigate("/login");
          } else {
            throw Error("Error al registrar");
          }
        } catch (error) {
          console.error(error);
        }
      },
      //----------< Login usuario >---------------------------------------------->

      //---- funcion para  login  de usuario------------------------------------------->
      handleSubmitLogin: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password, currentUser };
          const response = await fetch(`${url}/api/login`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.access_token) {
            setStore({ currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/profile");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
            console.error(
              "Usuario No registrado / Correo o Contraseña incorrectas"
            );
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
      },

      handleChangeLogin: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },

      // VERIFICA QUE EXISTA EL USUARIO
      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },

      logout: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
      },
    },
  };
};

export default getState;
