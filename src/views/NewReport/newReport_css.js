import { makeStyles } from '@material-ui/core/styles';

const newReportcss = makeStyles((theme) => ({
    Body: {
        position: "relative",
        width: "100%"
    },

    TextField: {
        display: "flex",
        margin: "10px auto",
        width: "90%"
    },
    FormControl: {
        position: "relative",
        display: "flex",
        margin: "40px auto",
        width: "90%"
    },
    DialogWarning: {
        backgroundColor: "rgba(255,255,255,.4)",
    }
    ,
    Btns: {
        backgroundColor: "blue",
        color: "white",
        "&:hover": {
            color: "blue"
        }
    },
    SendBtn: {
        position: "absolute",
        padding: "0 20px",
        height: 50,
        right: "0%",
        color: "white",
        backgroundColor: "blue",
        "&:hover": {
            backgroundColor: "green"
        }
    }

}));

export default newReportcss;