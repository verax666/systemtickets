import { Accordion, AccordionSummary, Button, Collapse, DialogContent, Divider, Grid, GridList, GridListTile, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MethodsTickets from '../../services/Tickets.service';
import fullReportcss from './fullReport.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CGetClient from '../../services/Clients/Client.service';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ServiceComments from '../../services/Comments/comment.service';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

export default function FullReport(props) {
    // use States
    const [details, setDetails] = React.useState(null); // Detalles del reporte
    const [ViewReport, isViewReport] = React.useState(true);
    const [open, setOpen] = useState(false);
    const [issend, setIsSend] = useState(false);
    // Classes
    const classes = fullReportcss(); //Styles
    const getMethods = new MethodsTickets(); //Functions Tickets
    const getClients = new CGetClient();
    const ServiceComment = new ServiceComments();
    let Clients = [];
    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    const sendComment = (id) => {
        let commentext = document.getElementById(id + "e").value;
        let user;
        if (props.isadmin) {
            user = (localStorage.getItem("iddeveloper"));

        } else {
            user = (localStorage.getItem("ClientName"));
        }
        ServiceComment.createCommentTicket({ Usuario: user, comment: commentext, commentId: id }).then(() => {

            commentext = document.getElementById(id + "e").value = "";
            setIsSend(!issend);

        });
    }
    const deleteComment = (id) => {
        console.log(id)
        ServiceComment.deleteComment(id).then(() => {
            setIsSend(!issend);

        });
    }
    const DeleteCommentTicket = (id) => {
        ServiceComment.deleteCommentTicket(id).then(() => {
            setIsSend(!issend);
        });
    }
    useEffect(() => {
        ticketProps();
    }, [issend]);

    const refresh = () => {
        setIsSend(!issend);
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
                                            <Typography variant="h5" className={classes.Status}>Status: {res.ticket.status.name}<FiberManualRecordIcon style={{ color: res.ticket.status.color }} className={classes.statuscircle} /></Typography>
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
                                            <Accordion className={classes.heading}>
                                                <AccordionSummary

                                                    expandIcon={<ExpandMoreIcon className={classes.heading} />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"

                                                >
                                                    <Typography className={classes.heading}> Comentarios de Soporte: {res.ticket.comments.length === 0 ? "Sin comentarios" : res.ticket.comments.length} </Typography>
                                                </AccordionSummary>
                                                {res.ticket.comments.length === 0 ?
                                                    <Typography className={classes.heading}> Sin comentarios  </Typography>
                                                    : null}
                                                <List className={classes.List}>

                                                    <Button className={classes.btnNormal} onClick={refresh}>Actualizar</Button>
                                                    {res.ticket.comments.map((item, index) => {


                                                        return (
                                                            <div key={item + index} className={classes.secondary}>

                                                                <ListItem alignItems="flex-start">

                                                                    <ListItemText

                                                                        primary={
                                                                            <Accordion className={classes.heading3} >
                                                                                <AccordionSummary
                                                                                    expandIcon={<ExpandMoreIcon className={classes.heading} />}
                                                                                    aria-controls="panel1a-content"
                                                                                    id="panel1a-header"

                                                                                >
                                                                                    <Grid container alignItems="center">
                                                                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>

                                                                                            <Typography
                                                                                                component="span"
                                                                                                variant="body2"
                                                                                                className={classes.titleprocess}
                                                                                            >

                                                                                                Status Previo: {item.prevstatus}
                                                                                                <FiberManualRecordIcon style={{ color: item.prevcolor }} className={classes.statuscircletitle} />
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                            <Typography
                                                                                                component="span"
                                                                                                variant="body2"
                                                                                                className={classes.titleprocess}
                                                                                            >

                                                                                                Status Cambiado:  {item.actualstatus} <FiberManualRecordIcon style={{ color: item.color }} className={classes.statuscircletitle} />
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                                                            <Typography
                                                                                                component="span"
                                                                                                variant="body2"
                                                                                                className={classes.titleprocess}

                                                                                            >
                                                                                                Fecha: {(item.createdAt.substr(0, 10))}   Hora: {(item.createdAt.substr(10, 15))}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </AccordionSummary>
                                                                                <Grid container alignItems="center" >
                                                                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                        {props.isadmin ?

                                                                                            <Button className={classes.btnElimarComment} onClick={() => deleteComment(item.id)}>Eliminar Status</Button>

                                                                                            : null}
                                                                                    </Grid>
                                                                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                        <Button className={classes.btnElimarComment} onClick={refresh}>Actualizar</Button>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <List className={classes.ListComments}>
                                                                                    <Typography
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        className={classes.commentStart}
                                                                                        display="block"
                                                                                    >
                                                                                        Comentario Inicial de {item.Usuario}: {item.comments}
                                                                                    </Typography>

                                                                                    {item.commentstickets.map((tile) => (

                                                                                        <Grid container item key={tile.id} className={classes.item}>
                                                                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                                                                <Typography
                                                                                                    component="span"
                                                                                                    variant="body2"
                                                                                                    className={classes.name}
                                                                                                    display="block"
                                                                                                >
                                                                                                    {tile.Usuario}:
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                                                                <Typography
                                                                                                    component="span"
                                                                                                    variant="body2"
                                                                                                    className={classes.inline}
                                                                                                    display="block"
                                                                                                >
                                                                                                    {tile.comment}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                                                                <Divider cvariant="inset" component="li" />
                                                                                            </Grid>
                                                                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                                                                                                <Typography
                                                                                                    component="span"
                                                                                                    variant="body1"
                                                                                                    className={classes.inlinelast}
                                                                                                    key={tile.id} >
                                                                                                    Fecha: {(tile.createdAt.substr(0, 10))}  Hora: {(item.createdAt.substr(10, 15))}

                                                                                                    {props.isadmin ?
                                                                                                        <IconButton className={classes.btndeleteComment} onClick={() => DeleteCommentTicket(tile.id)}><CloseIcon /></IconButton>
                                                                                                        :
                                                                                                        null
                                                                                                    }

                                                                                                </Typography>

                                                                                            </Grid>


                                                                                        </Grid>
                                                                                    ))}


                                                                                </List>
                                                                                <Typography className={classes.heading2}> Añadir Comentarios: </Typography>
                                                                                <TextField id={item.id + "e"} className={classes.commentadd} multiline placeholder="Escribir comentario"> </TextField>
                                                                                <IconButton className={classes.btnsend} onClick={() => sendComment(item.id)} ><SendIcon /></IconButton>
                                                                            </Accordion>

                                                                            // + " >>>> Status Cambiado: " + item.actualstatus + " >>>> Fecha: " + (item.createdAt.substr(0, 10)) + " >>>> Hora:" + (item.createdAt.substr(10, 15))

                                                                        }

                                                                    />
                                                                    <Divider variant="inset" component="br" />

                                                                </ListItem>

                                                                <Divider variant="inset" component="li" />
                                                            </div>)

                                                    })}
                                                </List>
                                            </Accordion>
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                </DialogContent>
                            </div>
                        </>);
                }));
            isViewReport(true);
        } else { }

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
            {details}
        </>
    );
}

