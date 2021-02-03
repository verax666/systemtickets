import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavBarcss from './navBarcss.js';

const NavBar = (props) => {

    const classes = NavBarcss();

    return (
        <AppBar className={classes.Bar}>
            <Toolbar>
                {props.btn}
                <Typography className={classes.Title}>{props.title}</Typography>
                {props.logout}
            </Toolbar>
        </AppBar>
    );

}

export default NavBar;
