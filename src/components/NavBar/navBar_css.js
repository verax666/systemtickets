import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const NavBar = makeStyles((theme) => ({

    Bar: {
        position: "relative",
        background: "linear-gradient(to right, #6D9EEB,#6D9EEB)"
    },
    Title: {
        color: "rgb(255,255,255)",
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "24px",
        fontWeight: "bold",
    },
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    btn: {
        marginRight: "40px",
        color: "white"
    },

}));
export default NavBar;
