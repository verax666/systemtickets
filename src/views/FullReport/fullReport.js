import { Avatar, DialogContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import MethodsTickets from '../../services/Methods/methodsTickets';
import fullReportcss from './fullReport.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CGetClient from '../../services/Methods/Clients/ClientService';

export default function FullReport(props) {
    // use States
    const [details, setDetails] = React.useState(null); // Detalles del reporte
    const [ViewReport, isViewReport] = React.useState(true);
    // Classes
    const classes = fullReportcss(); //Styles
    const getMethods = new MethodsTickets(); //Functions Tickets
    const getClients = new CGetClient();
    let Clients = [];
    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    function ticketProps() {
        if (ViewReport) {
            getClients.getClients().then((res) =>
                res.map((item) =>
                    Clients.push(item.name)
                )
            ).then(
                getMethods.getTikcet(props.id).then((res) => {
                    setDetails(
                        <>
                            <div className={classes.Body}>
                                <DialogContent dividers={true} className={classes.Description} >
                                    <Grid container item spacing={0} xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.Title}>Cliente: {res.ticket.client.name}</Typography>
                                        </Grid>

                                        <Divider />
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.Title}>Titulo: {res.ticket.title}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.Status}>Status: {res.ticket.status.name}<FiberManualRecordIcon className={selectStatusbk(res.ticket.status.id)} /></Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.BodyTitle}>Creado: {formato((res.ticket.createdAt).substr(0, 10))}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.BodyTitle}>Ultima Actualización : {formato((res.ticket.updatedAt).substr(0, 10))}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.BodyTitle}>Proceso: {res.ticket.process}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                            <Typography variant="h5" className={classes.BodyTitle}>SubProceso: {res.ticket.subprocess}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="h5" className={classes.BodyTitle}>
                                                Descripción: </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <DialogContent dividers={true} className={classes.Description} >
                                                <Typography variant="body1" paragraph>
                                                    {res.ticket.description}
                                                </Typography></DialogContent>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="h5" className={classes.BodyTitle}>
                                                Archivo de Prueba: </Typography>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="h5" className={classes.BodyTitle}>
                                                Comentarios: </Typography>
                                            <Typography variant="h5" className={classes.BodyTitle}>
                                                {res.ticket.comments} </Typography>
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                </DialogContent>
                            </div>
                        </>);
                }));
            isViewReport(false);
        } else { }
        return details;
    }

    // const hanldeClickOpen = () => {
    //     setOpen(true);
    // }
    const selectStatusbk = (idStatus) => {
        switch (idStatus) {
            case 1: {

                return classes.green;
            }
            case 2: {
                return classes.gray;
            }
            case 3: {
                return classes.blue;
            }
            case 4: {
                return classes.yellow;
            }
            default: {
                return classes.white;
            }

        }

    }

    return (
        <>
            {ticketProps()}
        </>
    );
}

