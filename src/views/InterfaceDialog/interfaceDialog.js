import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Dialog, Grid } from "@material-ui/core";
import { CloseIcon } from '@material-ui/data-grid';
import fullReportcss from '../FullReport/fullReport.css';
import FullReport from '../FullReport/fullReport'
import NewReport from '../NewReport/newReport';

export default function InterfaceDialog(props) {

    const [open, isOpen] = React.useState(props.isopen);
    const classes = fullReportcss();
    const [alert, setAlert] = React.useState(false);
    const handleClickClose = () => {
        props.id !== undefined ? dialog() : setAlert(!alert);
    }

    const handleCancel = () => {
        setAlert(!alert);
    }

    const dialog = (id, res) => {
        isOpen(false);
        props.callback(undefined, res);
    }

    let title = "";

    const selectedDialog = () => {

        switch (true) {
            case props.id !== undefined: {
                return (<FullReport id={props.id} />);
            }
            case props.id === undefined: {
                return (<NewReport isadmin={props.isadmin} refresh={props.refresh} handleCancel={() => handleCancel} callback={dialog} alertopen={alert} />);
            }
            default: {
                return <></>
            }
        }
    }
    const Title = () => {
        if (props.id !== undefined) {
            title = <Typography variant="h5" className={classes.AppBarTitle}>Número de Ticket: #{props.id}</Typography>;
        } else {
            title = <Typography variant="h5" className={classes.AppBarTitle}>Levantar reporte</Typography>;
        }
        return title;
    }

    return (
        <div>
            <Dialog fullScreen open={open}>
                <AppBar className={classes.bar} >
                    <Toolbar>
                        <IconButton edge="start" onClick={() => handleClickClose()} className={classes.BtnClose} ><CloseIcon /> </IconButton>
                        {Title()}
                    </Toolbar>
                </AppBar>
                <Grid className={classes.AppBar}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <NewReport isadmin={props.isadmin} refresh={props.refresh} handleCancel={() => handleCancel} callback={dialog} alertopen={alert} />
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );

}



