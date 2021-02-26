import { TextField, Select, MenuItem, InputLabel, FormControl, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import MethodsTickets from "../../services/Tickets.service";
import newReportcss from './newReport_css';
import Alerts from './Alerts/Alerts'
import CGetClients from "../../services/Clients/Client.service";
import MethodsProcess from '../../services/Procesos/Process.service'

export default function NewReport(props) {

    // const [openAlert, setOpenAlert] = React.useState(false);
    const [process, setProcess] = React.useState("Sin Elección");
    const [subprocess, setSubProcess] = React.useState("Sin Elección");
    const [errTitle, setErrTitle] = React.useState(false);
    const [errProcess, setErrProcess] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [client, setClient] = React.useState("");
    const [clientoken, setClientToken] = useState("");
    // Styles
    const classes = newReportcss();
    const postTicket = new MethodsTickets();
    const getClients = new CGetClients();
    const processclient = new MethodsProcess();
    const [RowProcess, setRowProcess] = useState([""]);
    const [RowSubProcess, setRowSubProcess] = useState([""]);
    const [isVisibleDropSub, setVisbileDropSub] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        gclients();

        if (props.isadmin) {

        } else {
            processclient.getAllProcess().then(res => {
                setRowProcess(res.rows);
                setLoading(false);
            });
        }
    }, [loading]);


    const gclients = () => {

        Promise.resolve(getClients.getClients().then(res => { setClients(res); }))
    }
    const handleChangeProcess = (event) => {
        setProcess(event.target.value);
        setErrProcess(false);
    };
    const handleChangeSubProcess = (event) => {
        setSubProcess(event.target.value);
        setErrProcess(false);
    };
    const handleChangeClient = (event) => {
        setClient(event.target.value);
        setClientToken(event.target.name);
        processclient.getAllProcess(event.target.name).then(res => {
            setRowProcess(res.rows);
            setLoading(false);
        });
        setErrProcess(false);
    };

    useEffect(() => {


    }, [isVisibleDropSub]);


    const alertDialog = < Dialog open={props.alertopen} >
        <DialogTitle className={classes.DialogWarning} id="alert-dialog-title">{"¿Cerrar ventana?"}</DialogTitle>
        <DialogContent className={classes.DialogWarning}>
            <DialogContentText id="alert-dialog-description">
                Se borrara la información de los campos del formulario llenos.
              </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.DialogWarning}>
            <Button className={classes.Btns} onClick={props.handleCancel()} color="primary">
                No
              </Button>
            <Button className={classes.Btns} onClick={() => props.callback()} color="primary" autoFocus>
                Si
              </Button>
        </DialogActions></Dialog >;

    const resultpost = (res) => {
        switch (res) {
            case 1: {
                props.callback(undefined, <Alerts isOpen={true} />);
                props.refresh();
                break;
            }
            case 2: {

                break;
            }
            default: {

            }
        }
    }
    const checkFields = () => {
        let titletxt = document.getElementById("Title").value;
        let descriptiontxt = document.getElementById("Description").value;

        if (titletxt === "") {
            setErrTitle(true);
        }
        else if (process === "Sin Elección") {
            setErrProcess(true)
        }
        else if (!errProcess && !errTitle) {
            sendTicket(titletxt, descriptiontxt);
        }
    }

    const sendTicket = (titletxt, descriptiontxt) => {
        if (props.isadmin) {
            postTicket.postTicket({ clientId: client, title: titletxt, process: process, subprocess: subprocess, description: descriptiontxt, statusCatalogId: 1 }).then((res) => {
                resultpost(res);
            });
        } else {

            postTicket.postTicket({ clientId: parseInt(localStorage.getItem("ClientId"), 10), title: titletxt, subprocess: subprocess, process: process, description: descriptiontxt, statusCatalogId: 1 }).then((res) => {
                resultpost(res);
            });
        }

    }

    function ActivateSub(item) {
        setRowSubProcess(item);
        setVisbileDropSub(true);

    }
    return (
        <div >
            {props.isadmin ?

                <FormControl className={classes.FormControl}>
                    <InputLabel htmlFor="age-native-simple">Seleccione el Cliente</InputLabel>
                    <Select error={errProcess} required
                        labelId="procesos-lbl"
                        id="procesos-id"
                        value={client}
                        onChange={handleChangeClient}
                        variant="outlined"
                        name={clientoken}
                    >
                        {clients.map((proceso) =>
                            (<MenuItem key={proceso.id} value={proceso.id} name={proceso.token} >{proceso.name}</MenuItem>)
                        )}
                    </Select>
                </FormControl> : null}

            <TextField id="Title" variant="outlined" label="Titulo" error={errTitle} required onChange={() => setErrTitle(false)} className={classes.TextField} />
            <FormControl className={classes.FormControl}>
                <InputLabel htmlFor="age-native-simple" >Seleccione el Proceso</InputLabel>
                <Select error={errProcess} required
                    placeholder="Seleccionar Proceso"
                    labelId="procesos-lbl"
                    id="procesos-id"
                    value={process}
                    onChange={handleChangeProcess}
                    variant="outlined"
                >
                    {RowProcess.map((proceso) => (
                        <MenuItem key={proceso.id + proceso.name} onClick={() => ActivateSub(proceso.subproceso)} value={proceso.name} >{proceso.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {isVisibleDropSub ?
                <FormControl className={classes.FormControl}>
                    <InputLabel htmlFor="age-native-simple" >Seleccione el Subproceso</InputLabel>
                    <Select error={errProcess} required
                        placeholder="Seleccionar Proceso"
                        labelId="subprocesos-lbl"
                        id="subprocesos-id"
                        value={subprocess}
                        onChange={handleChangeSubProcess}
                        variant="outlined"
                    >
                        {RowSubProcess.map((proceso) => (
                            <MenuItem key={proceso.id + proceso.name} value={proceso.name} >{proceso.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                : null}
            <TextField id="Description" label="Descripción" multiline rows={8} variant="outlined" className={classes.TextField} />
            <FormControl className={classes.FormControl}>
                <Button onClick={() => checkFields()} className={classes.SendBtn}>Enviar</Button>
            </FormControl>
            {alertDialog}
        </div>
    );

}