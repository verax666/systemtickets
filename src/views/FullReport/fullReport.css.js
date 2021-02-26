import { makeStyles } from '@material-ui/core/styles';

const anchostatus = 25;

const fullReportcss = makeStyles((theme) => ({
    primary: {
        backgroundColor: "#6D9EEB"
    },
    secondary: {
        backgroundColor: "#787879"

    },
    ListComments: {
        maxHeight: "400px",
        overflow: "auto"
    },
    item: {
        margin: "10px 5%",
        padding: "0px 0px",
        backgroundColor: "#DCF8C6",
        borderRadius: "20px",
        width: "90%",

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: "#424242",
        color: "#FFF",
        fontSize: "18px"
    },
    heading2: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: "#128C7E",
        color: "#FFF",
        fontSize: "12px",
        padding: "10px 0"
    },
    heading3: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: "#fff",
        color: "#FFF",
        fontSize: "12px",

    },
    List: {
        width: '100%',
        backgroundColor: "#F1F3F6",
        color: "#000"
    },
    bar: {
        position: "relative",
    },
    inline: {
        fontSize: "14px",
        color: "#000",
        borderRadius: "40px",
        padding: "5px 20px"

    },
    titleprocess: {
        position: "relative",
        fontSize: "13px",
        color: "#000",
        borderRadius: "40px",
        padding: "5px 2px",
    },
    name: {
        fontSize: "12px",
        color: "#000",
        borderRadius: "40px",
        marginTop: "5px",
        marginLeft: "20px"

    },
    inlinelast: {
        position: "relative",
        fontSize: "12px",
        color: "#000",
        float: "right",
        padding: "20px 20px"
    },
    commentadd: {
        backgroundColor: "white",
        width: "90%",
        padding: "20px 0px"
    },
    btndeleteComment: {
        fontSize: "12px",
        color: "red",
        width: "15px",
        height: "15px"
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
    btnElimarComment:
    {
        background: "linear-gradient(to right, red,red)",
        color: "white",
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "15px",
        "&:hover": {
            background: "linear-gradient(to right, #6D5BBB,#6D5BBB)"
        }
    },
    btnNormal: {
        background: "linear-gradient(to right, #6D9EEB,#6D9EEB)",
        color: "white",
        marginBottom: "5px",
        "&:hover": {
            background: "linear-gradient(to right, #6D5BBB,#6D5BBB)"
        }
    },
    btnactchat: {
        background: "linear-gradient(to right, #6D9EEB,#6D9EEB)",
        color: "white",
        "&:hover": {
            background: "linear-gradient(to right, #6D5BBB,#6D5BBB)"
        }
    },
    btnsend: {
        backgroundColor: "#25D366",
        color: "white",
        height: "40px",
        width: "40px",
        margin: "10px"
    },
    BtnNewReport: {
        background: "linear-gradient(to right, #6D9EEB,#6D9EEB)",
        color: "white",
        margin: "20px 20px",
        position: "relative",
        width: "200px",
        "&:hover": {
            background: "linear-gradient(to right, #6D5BBB,#6D5BBB)"
        }
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
        fontSize: "20px",
        backgroundColor: "#F1F3F6"
    },
    statuscircle: {
        height: anchostatus,
        width: anchostatus,
        display: "flex",
        margin: " auto",
    },
    statuscircletitle: {
        height: 15,
        width: 15,
        verticalAlign: 'middle',
        display: 'inline-flex',
        border: "2px solid #000",
        borderRadius: "40px"
    },

}));

export default fullReportcss;