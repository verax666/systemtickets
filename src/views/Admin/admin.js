import React, { useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ReportTable from "../../components/ReportsTable/reportsTable";
import { useEffect } from "react";
import CotizadorAdmin from "../Cotizador/CotizadorAdmin/cotizadorAdmin";
import { useAuthAdmin, useAuthLogin } from "../PrivateRoutes/contexts/contextRoutes";
import { Button, makeStyles } from "@material-ui/core";

export default function Admin() {
    const useStyles = makeStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        btn: {
            marginRight: "40px"
        },
        center: {
            textAlign: "center"
        },
        closeSesion: {
            position: "absolute",
            right: "30px",
            top: "15px",
            backgroundColor: "#6D8EEE",
            color: "white",
            "&:hover": {
                backgroundColor: "white",
                color: "#6D8EEE"
            }
        }
    });
    const { setAuthTokensEmployes } = useAuthAdmin();
    const { setAuthLogin } = useAuthLogin();
    const [change, setChange] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        document.title = "Administrador Inicio"
    })
    useEffect(() => {
    }, [change]);

    const exit = () => {
        setAuthTokensEmployes(false)
        setAuthLogin(false);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("istokenEmployes");
        setChange(true);
    }
    return (
        <> {!change ?
            <>
                <BrowserRouter>
                    <NavBar title={"Dashboard"} tickets={"/admin/tickets"} cotizaciones={"/admin/cotizaciones"} logout={<Button onClick={() => exit()} className={classes.closeSesion}>Cerrar Sesión</Button>} sidebar>    </NavBar>
                    <Switch>
                        <Route exact path="/admin/tickets" >
                            <ReportTable isadmin typeuser="admin" />
                        </Route>
                        <Route exact path="/admin/cotizaciones">
                            <CotizadorAdmin />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </> :
            <Redirect to="/login" />
        }
        </>
    )
}

