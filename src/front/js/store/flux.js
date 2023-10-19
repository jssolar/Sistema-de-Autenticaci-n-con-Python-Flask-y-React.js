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

      //-----< mensage desde el back >-------------->
      message: null,

      //-----< login >---------->
      email: "",
      password: "",
      token: null,
    },
    actions: {
      //-----< código jsolar >------------------------------------------------>
      //-----< mantenser sesión >----------------------------------------------->
      keepingSession: () => {
        const token = sessionStorage.getItem("token");
        console.log("application loaded");
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        }
      },

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
          const { url, email, password, token } = getStore();
          let info = { email, password, token };
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
            setStore({ token: data });
            sessionStorage.setItem("token", JSON.stringify(data));
            navigate("/private");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
            console.error("Correo o Contraseña incorrectas");
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

      // VERIFICA QUE EXISTA EL TOKEN
      checkUser: () => {
        if (sessionStorage.getItem("token")) {
          setStore({
            token: JSON.parse(sessionStorage.getItem("token")),
          });
        }
      },
      //-----< cerrar sesion >---------------------------------->
      logout: () => {
        if (sessionStorage.getItem("token")) {
          console.log("login out");
          setStore({
            token: null,
          });
          sessionStorage.removeItem("token");
        }
      },

      getMessage: async () => {
        try {
          const store = getStore();
          const options = {
            headers: {
              Authorization: "Bearer " + store.token,
              "Content-Type": "application/json",
            },
          };
          // fetching data from the backend
          const resp = await fetch("http://127.0.0.1:3001/api/hello", options);
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data.message;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
    },
  };
};

export default getState;
