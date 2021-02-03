import { IconButton, Slide } from '@material-ui/core';
import { CloseIcon } from '@material-ui/data-grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import './Alerts.css';
import React from 'react';


const Alerts = (props) => {
    const [ss, SetOpen] = React.useState(props.isOpen);

    return (
        <div className="Super">
            <Slide direction="up" in={ss} mountOnEnter unmountOnExit>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                SetOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    in severity="success">
                    <AlertTitle>Success</AlertTitle>
  Se ha enviado su información — <strong>Atenderemos su Ticket en las proximas !</strong>
                </Alert>
            </Slide></div >);
}

export default Alerts;
