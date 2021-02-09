import { Button, TextField } from "@material-ui/core";
import Axios from "axios";
import axios from "../../axios/Config"
import { useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/navBar";
import { useAuthAdmin, useAuthLogin } from "../PrivateRoutes/contexts/contextRoutes";
import useStyles from './loginEmployescss'

function LoginEmployed() {
    const { setAuthTokensEmployes } = useAuthAdmin();
    const { setAuthLogin } = useAuthLogin();
    const [change, setchange] = useState(true)
    const [errorUser, setErrorUser] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    const classes = useStyles();

    const checkFields = () => {  // Revisar si estan llenos los campos
        const getuser = document.getElementById("user").value;
        const getpassword = document.getElementById("password").value;
        switch (true) {
            case getuser === "" && getpassword === "":
                setErrorPass(true);
                setErrorUser(true);
                break;
            case getuser === "":
                setErrorUser(true);
                break;
            case getpassword === "":
                setErrorPass(true);
                break;
            default:
                checklogin(getuser, getpassword)
                break;
        }
    }
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const checklogin = async (user, pass) => {  // Revisar si existe el usuario y contraseña
        let params = {};
        params["user"] = user;
        params["password"] = pass;
        params["page"] = 0;
        params["size"] = 5;
        await axios.get("/api/developer/", { cancelToken: source.token, params }).then(res => {
            if (res.data.dev.length) {
                localStorage.setItem("tokenDeveloper", user);
                localStorage.setItem("iddeveloper", res.data);
                setAuthTokensEmployes(true);
                setAuthLogin(true)
                setchange(false)
            } else {
                console.log("false")
            }
        }).catch(err => { console.log(err) });
    }

    useEffect(() => { // Ejecutar de nuevo el componente en caso que cambie el estado change
        return () => {
            source.cancel();
        };
    }, [change])


    return (
        <>{change ?
            <>
                <NavBar title="Iniciar Sesión" />
                <form className={classes.root} autoComplete="off">
                    <TextField error={errorUser} id="user" required label="Usuario" />
                    <TextField error={errorPass} id="password" required label="Password" />
                    <Button className={classes.btn} onClick={() => checkFields()}>Iniciar Sesión</Button >

                </form>
            </>
            : <Redirect to="/admin/tickets" />}
        </>

    );

}

export default LoginEmployed;

