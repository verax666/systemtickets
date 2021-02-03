import { Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from "react-router-dom";
import ReportTable from "../../components/ReportsTable/reportsTable";
import Home from "../Home/home";
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
            marginRight: "10px"
        },
        center: {
            textAlign: "center"
        },
        btnend: {
            position: "absolute",
            right: "0px"
        },
    });
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });
    const [vista, setVista] = React.useState(<ReportTable typeuser={"admin"} />);

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography variant="h6" className={classes.center}>Administrador</Typography>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => setVista(<ReportTable typeuser={"admin"} />)} >
                    Tickets
                </ListItem>
                <ListItem button onClick={() => setVista(<Home />)} >
                    Cotizaciones
                </ListItem>

            </List>
        </div>
    );
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const exit = () => {
        localStorage.removeItem("istokenEmployes")
    }

    return (
        <>
            <NavBar title={"Dashboard"} btn={<IconButton className={classes.btn} onClick={toggleDrawer("left", true)}><MenuIcon /></IconButton>} logout={<IconButton className={classes.btnend} onClick={exit}><ExitToAppIcon /></IconButton>} >    </NavBar>
            <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                {list("left")}
            </Drawer>
            {vista}

        </>
    )
}

