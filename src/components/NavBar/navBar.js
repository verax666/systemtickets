import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { MenuIcon } from '@material-ui/data-grid';
import { useState } from 'react';
import NavBarcss from './navBar_css';
import SideBar from './sidebar/sidebar.js';

const NavBar = (props) => {

    const classes = NavBarcss();
    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar className={classes.Bar}>
            <Toolbar >
                {props.sidebar ? <> Menú<IconButton className={classes.btn} onClick={toggleDrawer("left", true)}><MenuIcon /></IconButton>
                    <SideBar close={toggleDrawer} isopen={state["left"]} tickets={props.tickets} cotizaciones={props.cotizaciones} /></> :
                    null
                }
                <Typography className={classes.Title}>{props.title}</Typography>
                {props.logout}
            </Toolbar>
        </AppBar>

    );

}

export default NavBar;
