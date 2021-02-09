import { makeStyles } from '@material-ui/core/styles';

const anchostatus = 25;

const fullReportcss = makeStyles((theme) => ({
    bar: {
        position: "relative",
    },
    BtnClose: {
        backgroundColor: 'white',
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        color: 'red',
        width: '40px',
        height: '40px',
        '&:hover': {
            backgroundColor: 'red',
            color: 'white'
        }
    },
    BtnNewReport: {
        background: "linear-gradient(to right, #6D9EEB,#6D9EEB)",
        color: "white",
        margin: "40px 0px",
        position: "relative"
    }
    ,
    AppBarTitle: {
        marginLeft: "20px",
        fontFamily: ['Montserrat', 'sans-serif'].join(","),
    },
    Body: {
        margin: "10px 50px",
        backgroundColor: "white",
        position: "relative",
    },
    BodyTitle: {
        fontFamily: ['Montserrat', 'sans-serif'].join(","),
        display: "flex",
        margin: "10px 0"
    },
    Title: {
        fontFamily: ['Montserrat', 'sans-serif'].join(","),
        margin: "10px 0"
    },
    Status: {
        fontFamily: ['Montserrat', 'sans-serif'].join(","),
        margin: "10px 0",
        display: "flex"
    },
    Description: {
        fontFamily: ['Montserrat', 'sans-serif'].join(","),
        margin: "10px 0",
        color: "black",
        fontSize: "20px"
    },
    white: {
        color: "white",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: " auto",

    },
    green: {
        color: "green",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: "auto 0px"
    },
    yellow: {
        color: "yellow",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: "0px auto"
    }, gray: {
        color: "gray",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: "auto"
    },
    blue: {
        color: "blue",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: "auto"
    },
    red: {
        color: "red",
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: "auto"
    }

}));

export default fullReportcss;