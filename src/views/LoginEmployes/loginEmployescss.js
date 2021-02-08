import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
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
});

export default useStyles;