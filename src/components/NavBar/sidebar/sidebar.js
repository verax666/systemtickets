import { Divider, Drawer, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { Link } from "react-router-dom";




const SideBar = (props) => {
    const useStyles = makeStyles({
        paper: {
            background: "linear-gradient(to right, #6D9EEB,#6D9EEB)",
        },
        list: {
            width: 450,
            height: "100%"
        },
        fullList: {
            width: 'auto',
        },
        btn: {
            marginRight: "10px"
        },
        center: {
            textAlign: "center",
            color: "white"
        },
        btnend: {
            position: "absolute",
            right: "0px"
        },
        Listitem: {

            height: "50px",
            "&:hover": {
                background: "white"
            }
        },
        link: {
            listStyle: "none",
            textDecoration: "none",
            color: "white",
            "&:hover": {
                color: "black",
            }
        }
    });
    const classes = useStyles();


    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={props.close(anchor, false)}
            onKeyDown={props.close(anchor, false)}
        >
            <List>
                <Typography variant="h6" className={classes.center}>Usuario: {(localStorage.getItem("iddeveloper"))}</Typography>
            </List>
            <Divider />
            <List>
                <Link to={props.tickets} className={classes.link}>
                    <ListItem className={classes.Listitem} button onClick={() => {
                        document.title = "Administrador Tickets";

                    }}>
                        Tickets
                </ListItem>
                </Link >

                <Link to={props.cotizaciones} className={classes.link} >
                    <ListItem className={classes.Listitem} button onClick={() => {
                        document.title = "Administrador Cotizador";

                    }}>
                        Cotizaciones
                </ListItem>
                </Link>

            </List>
        </div>
    );

    return (
        <>
            <Drawer classes={{ paper: classes.paper }} anchor={"left"} open={props.isopen} onClose={props.close("left", false)}>
                {list("left")}
            </Drawer>
        </>
    )

}

export default SideBar;