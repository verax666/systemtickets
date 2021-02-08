import React from 'react'
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import Faq from '../../components/Faq/faq';
import ReportTable from '../../components/ReportsTable/reportsTable';
import NavBar from '../../components/NavBar/navBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../privateRoute/auth/auth';
import CotizadorClient from '../Cotizador/CotizadorClient/cotizadorclient';
import Des_Helper from '../../components/Description_Helper/Des_Helper';

function FaqView() {
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
    const { setAuthTokensClients } = useAuth();

    const classes = useStyles();
    const [change, setChange] = useState(false);
    useEffect(() => {
    }, [change]);

    const exit = () => {
        setAuthTokensClients(false)
        localStorage.removeItem("istokenClient")
        setChange(true);
    }

    return (<>
        {!change ?
            <>
                <NavBar title={"Helper"} tickets={"/helper/tickets"} cotizaciones={""} logout={<IconButton className={classes.btnend} onClick={() => exit()}><ExitToAppIcon /></IconButton>} />
                < Grid container >
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} > <Des_Helper /></Grid>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} >  <Faq /></Grid>
                    <Grid item xl={7} lg={7} md={7} sm={12} xs={12}><ReportTable typeuser="client" /></Grid>
                </Grid>
            </>
            :
            <Redirect to="/" />
        }</>
    );

}

export default FaqView;