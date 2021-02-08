import React, { useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ReportTable from "../../components/ReportsTable/reportsTable";
import { useEffect } from "react";
import CotizadorAdmin from "../Cotizador/CotizadorAdmin/cotizadorAdmin";
import { useAuthAdmin, useAuthLogin } from "../privateRoute/auth/auth";
import { IconButton, makeStyles } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
        btnend: {
            position: "absolute",
            right: "20px",
        },
    });
    const { setAuthTokensEmployes } = useAuthAdmin();
    const { setLogin } = useAuthLogin();
    const [change, setChange] = useState(false);
    const classes = useStyles();


    useEffect(() => {
    }, [change]);

    const exit = () => {
        setAuthTokensEmployes(false)
        setLogin(false);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("istokenEmployes");
        setChange(true);
    }
    return (
        <> {!change ?
            <>
                <BrowserRouter>
                    <NavBar title={"Dashboard"} tickets={"/admin/tickets"} cotizaciones={"/admin/cotizaciones"} logout={<IconButton className={classes.btnend} onClick={() => exit()}><ExitToAppIcon /></IconButton>} sidebar>    </NavBar>

                    <Switch>
                        <Route path="/admin/tickets" >
                            <ReportTable isadmin typeuser="admin" />
                        </Route>
                        <Route path="/admin/cotizaciones">
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

