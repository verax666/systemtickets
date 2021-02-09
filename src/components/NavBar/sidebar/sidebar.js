import { Divider, Drawer, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { Link } from "react-router-dom";




const SideBar = (props) => {
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


    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={props.close(anchor, false)}
            onKeyDown={props.close(anchor, false)}
        >
            <List>
                <Typography variant="h6" className={classes.center}>Administrador</Typography>
            </List>
            <Divider />
            <List>
                <Link to={props.tickets} >
                    <ListItem button onClick={() => {
                        document.title = "Administrador Tickets";

                    }}>
                        Tickets
                </ListItem>
                </Link >

                <Link to={props.cotizaciones} >
                    <ListItem button onClick={() => {
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
            <Drawer anchor={"left"} open={props.isopen} onClose={props.close("left", false)}>
                {list("left")}
            </Drawer>
        </>
    )

}

export default SideBar;