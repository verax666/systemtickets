import { TextField, Select, MenuItem, InputLabel, FormControl, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from "@material-ui/core";
import React, { useEffect } from 'react';
import MethodsTickets from "../../services/Methods/methodsTickets";
import newReportcss from './newReportcss';
import Alerts from './Alerts/Alerts'
import CGetClients from "../../services/Methods/Clients/getClient";

export default function NewReport(props) {

    // const [openAlert, setOpenAlert] = React.useState(false);
    const [process, setProcess] = React.useState("Sin Elección");
    const [errTitle, setErrTitle] = React.useState(false);
    const [errProcess, setErrProcess] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [client, setClient] = React.useState("");
    // Styles
    const classes = newReportcss();
    const postTicket = new MethodsTickets();
    const getClients = new CGetClients();
    const procesos = [
        'Sin Elección',
        'Proceso 1',
        'Proceso 2',
        'Proceso 3',
        'Proceso 4',
        'Proceso 5',
        'Proceso 6',
        'Proceso 7',
    ];

    useEffect(() => {
        gclients();
    }, [])

    const gclients = () => {
        Promise.resolve(getClients.getClients().then(res => { setClients(res) }))
    }
    const handleChange = (event) => {
        setProcess(event.target.value);
        setErrProcess(false);
    };
    const handleChangeClient = (event) => {
        setClient(event.target.value);
        setErrProcess(false);
    };


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
            postTicket.postTicket({ clientId: client, title: titletxt, process: process, description: descriptiontxt, statusId: 1 }).then((res) => {
                resultpost(res);
            });
        } else {

            postTicket.postTicket({ clientId: parseInt(localStorage.getItem("ClientId"), 10), title: titletxt, process: process, description: descriptiontxt, statusId: 1 }).then((res) => {
                resultpost(res);
            });
        }

    }
    return (
        <FormControl className={classes.FormControl}>
            {props.isadmin ?

                <FormControl className={classes.FormControl}>
                    <InputLabel htmlFor="age-native-simple">Seleccione el Cliente</InputLabel>
                    <Select error={errProcess} required
                        labelId="procesos-lbl"
                        id="procesos-id"
                        value={client}
                        onChange={handleChangeClient}
                        variant="outlined"
                    >
                        {clients.map((proceso) => (
                            <MenuItem key={proceso.id} value={proceso.id} >{proceso.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl> : null}

            <TextField id="Title" label="Titulo" error={errTitle} required onChange={() => setErrTitle(false)} className={classes.TextField} />
            <FormControl className={classes.FormControl}>
                <InputLabel htmlFor="age-native-simple">Seleccione el Proceso</InputLabel>
                <Select error={errProcess} required
                    labelId="procesos-lbl"
                    id="procesos-id"
                    value={process}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {procesos.map((proceso) => (
                        <MenuItem key={proceso} value={proceso} >{proceso}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField id="Description" label="Descripción" multiline rows={8} variant="outlined" className={classes.TextField} />
            <FormControl className={classes.FormControl}>
                <Button onClick={() => checkFields()} className={classes.SendBtn}>Enviar</Button>
            </FormControl>
            {alertDialog}
        </FormControl>
    );

}