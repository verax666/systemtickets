import { makeStyles } from '@material-ui/core/styles';

const fullReportcss = makeStyles({
    AppBar: {
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
        height: 20,
        width: 20,
        margin: "auto 20px",
        border: "2px solid black",
        borderRadius: 20
    },
    green: {
        color: "green",
        height: 30,
        width: 30,
        margin: "auto 20px"
    },
    yellow: {
        color: "yellow",
        height: 30,
        width: 30,
        margin: "auto 20px"
    },
    red: {
        color: "red",
        height: 30,
        width: 30,
        margin: "auto 20px"
    }

});

export default fullReportcss;