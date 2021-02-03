import { Button, makeStyles, TextField } from "@material-ui/core";
import NavBar from "../../components/NavBar/navBar";
import { useAuthAdmin } from "../privateRoute/auth/auth";


const useStyles = makeStyles(({
    root: {
        '& > *': {
            marginLeft: "5%",
            marginTop: "45px",
            width: '90%',
        },
    },
    btn: {
        backgroundColor: "#324255",
        color: "white",
        "&:hover": {
            backgroundColor: "#6D9EEB",
            color: "white"
        }
    }
}));




export function LoginEmplyed() {
    const { setAuthTokensEmployes } = useAuthAdmin();
    const classes = useStyles();
    return (
        <>
            <NavBar title="Iniciar Sesión" />
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Usuario" />
                <TextField id="filled-basic" label="Password" variant="filled" />
                <Button className={classes.btn} onClick={() => { setAuthTokensEmployes(true) }}>Iniciar Sesión</Button >
            </form>
        </>

    );

}
