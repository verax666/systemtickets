import React, { useEffect, useState } from "react";
import { DataGrid, } from '@material-ui/data-grid'
import MethodsTickets from '../../services/Tickets.service'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import fullReportcss from '../../views/FullReport/fullReport.css'
import InterfaceDialog from '../../views/InterfaceDialog/interfaceDialog'
import VisibilityIcon from '@material-ui/icons/Visibility';
import statusCatalog from "../../services/StatusCatalog/Status.service";

function ReportTable(props) {
    const classes = fullReportcss();
    const classMethods = new MethodsTickets();

    const [isrefresh, setRefresh] = useState(false);
    const [pagesize, setPageSize] = useState(10);
    const [items, setItems] = useState([]);
    const [isUpdate, setUpdate] = useState(true)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [countsrow, setrow] = useState(0);
    const [id, setId] = useState(undefined)
    const [visibleInterfaceDialog, setvisibleInterfaceDialog] = useState(false)
    const [Result, setResult] = useState(undefined);
    const [OpenComments, setOpenComments] = useState(false);
    const procesos = statusCatalog();
    const [ilabels, setIlabels] = useState([]);
    const [idticket, setIdTicket] = useState("");
    const [idStatus, setIdStatus] = useState("");
    const [nameStatus, setNameStatus] = useState("");
    const [prevStatus, setPrevStatus] = useState("");
    const [prevcolor, setPrevColor] = useState("");
    const [color, setColor] = useState("");

    const changeStatus = (id, prevname, prevcolor, status) => {
        setOpenComments(true);
        setIdTicket(id);
        setIdStatus(status.target.value);
        setNameStatus(status.nativeEvent.toElement.innerText);
        setPrevStatus(prevname);
        setPrevColor(prevcolor);
        setColor(status.nativeEvent.toElement.attributes.name.value);
    }

    const handleCloseComments = () => {
        setOpenComments(false);
    }

    const handleSendStatus = () => {
        classMethods.updateTicket(idticket, idStatus, document.getElementById("CommentStatus").value, nameStatus, prevStatus, localStorage.getItem("iddeveloper"), prevcolor, color).then((res) => {
            setRefresh(!isrefresh);
            setOpenComments(false);
        });
    }
    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    const handlePageChange = (params) => {
        setPage(params.page);
    }

    const handlepagresize = (params) => {
        if (params.page > params.pageCount) {
            setPage(page - 1)
        }
        setPageSize(params.pageSize)
    }


    const UpdateTable = async (n, it, id_client) => {
        if (isUpdate) {
            switch (props.typeuser) {

                case "client":

                    classMethods.getTickets(n, it, id_client).then(res => {
                        setUpdate(false);
                        setrow(res.totalItems);
                        setItems(res.tickets);
                        setIlabels([
                            { field: 'id', headerName: 'ID', flex: .2 },
                            { field: 'title', headerName: 'Titulo', flex: .25 },
                            { field: 'process', headerName: 'Proceso', flex: .25 },
                            { field: 'description', headerName: 'Descripción', flex: .25 },
                            {
                                field: 'status', headerName: 'Status', flex: .4, renderCell: (row) =>
                                    (<><Typography style={{ display: "flex", margin: "0x auto", }} >{row.row.status.name}</Typography> <FiberManualRecordIcon style={{ color: row.row.status.color }} className={classes.statuscircle}></FiberManualRecordIcon></>)
                            },
                            {
                                field: 'updatedAt', headerName: "Actualizado en", flex: .3, renderCell: (row) =>
                                (< strong >
                                    { formato((row.value).substr(0, 10))}
                                </strong >)
                            },
                            {
                                field: 'createdAt', headerName: 'Creado en', flex: .6, renderCell: (row) =>
                                (< Grid container >
                                    < Grid item style={{ display: "auto", margin: "auto", }}>
                                        <strong >
                                            {formato((row.value).substr(0, 10))}
                                        </strong>
                                    </Grid>
                                    < Grid item style={{ display: "auto", margin: "auto", }}>
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            size="small"

                                            onClick={() => isvisibleInterfaceDialog(row.row.id, undefined)}

                                        ><VisibilityIcon /></IconButton>
                                    </ Grid >
                                </ Grid >)
                            }])
                    });
                    break;
                case "admin":
                    classMethods.getAllTickets(n, it).then(res => {
                        setUpdate(false);
                        setrow(res.totalItems);
                        setItems(res.tickets);
                        setIlabels([
                            { field: 'id', headerName: 'ID', flex: .13 },
                            { field: 'title', headerName: 'TITULO', flex: .23 },
                            { field: 'process', headerName: 'PROCESO', flex: .23 },
                            { field: 'description', headerName: 'DESCRIPCIÓN', flex: .23 },
                            {
                                field: 'status', headerName: 'STATUS', flex: .23, renderCell: (row) =>
                                    (<> <Typography style={{ display: "flex", margin: "0 auto", }} >{row.row.status.name}</Typography> <FiberManualRecordIcon style={{ color: row.row.status.color }} className={classes.statuscircle}></FiberManualRecordIcon></>)
                            },
                            {
                                field: 'updatedAt', headerName: "Actualizado en", flex: .22, renderCell: (row) =>
                                (< strong >
                                    { formato((row.value).substr(0, 10))}
                                </strong >)
                            },
                            {
                                field: 'createdAt', headerName: 'Creado en', flex: .27, renderCell: (row) =>
                                (< Grid container style={{ position: "relative" }} >
                                    < Grid item style={{ top: "23px", position: "relative" }}>
                                        <strong >
                                            {formato((row.value).substr(0, 10))}
                                        </strong>
                                    </Grid>
                                    <Grid item style={{ top: "3px", position: "absolute" }}>
                                        <FormControl >
                                            <InputLabel style={{ fontSize: "14px" }} htmlFor="status">Status </InputLabel>
                                            <Select style={{ fontSize: "14px", width: "70px" }}
                                                key={row.row.id}
                                                labelId={row.row.title}
                                                id={row.row.id + row.row.title}
                                                value={row.row.status.id}
                                                onChange={changeStatus.bind(this, row.row.id, row.row.status.name, row.row.status.color)}

                                            >
                                                {procesos.map((proceso, index) => (
                                                    <MenuItem style={{ fontSize: "15px" }} key={row.row.title + proceso.id + index} name={proceso.color} value={proceso.id}  >{proceso.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    < Grid item style={{ position: "absolute", right: "0%" }}>
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => isvisibleInterfaceDialog(row.row.id, undefined)}
                                        ><VisibilityIcon /></IconButton>
                                    </ Grid >
                                </ Grid >)
                            }])
                    })
                    break;
                default:
                    break;

            }
        } else { }
    }
    const visibleSuccess = () => {
        return Result;
    }
    const isvisibleInterfaceDialog = (row, res) => {
        setId(row);
        setResult(res);
        setvisibleInterfaceDialog(!visibleInterfaceDialog)
    }
    const refreshtable = () => {
        setvisibleInterfaceDialog(false)
        setRefresh(!isrefresh);

    }
    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setUpdate(true);
            await UpdateTable(page, pagesize, localStorage.getItem("tokenClient"));
            await setLoading(false);
            if (!active) {
                return;
            }
        })();

        return () => {
            active = false;
        };
    }, [page, items, pagesize, isrefresh]);
    useEffect(() => {
        if (props.typeuser === "client") {
            setvisibleInterfaceDialog(true)
        }
    }, [])

    const ChangeSizeColumn = (e) => {
        let es = [e]
        es.map((item, index) => {
            if (item[index]) {
                console.log()
            }
        })

    }

    return (
        <div id="Container" style={{ height: 1000, width: "80%", margin: "0px 10%" }}>
            <Button className={classes.BtnNewReport} onClick={() => isvisibleInterfaceDialog()} >Crear Ticket</Button>
            <DataGrid onStateChange={(e) => {
                ChangeSizeColumn(e.state.columns.lookup);

            }} disableColumnMenu showToolbar disableDensitySelector paginationMode="server"
                page={page}
                onPageChange={handlePageChange}
                loading={loading}
                pageSize={10} rows={items} columns={ilabels}
                rowCount={countsrow}
                rowHeight={85}
                rowsPerPageOptions={[10, 20, 40]}
                onPageSizeChange={handlepagresize}
                className={classes.Tabla}
            />;
            {!visibleInterfaceDialog ? <></> :
                <InterfaceDialog
                    isadmin={props.isadmin}
                    isopen={visibleInterfaceDialog}
                    callback={isvisibleInterfaceDialog}
                    id={id}
                    refresh={refreshtable}
                />}
            {Result !== undefined ? visibleSuccess() : Result}
            {props.typeuser === "admin" ?
                <Dialog open={OpenComments}>
                    <DialogTitle id="form-dialog-title">Actualizar Status de {prevStatus} a {nameStatus}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Deje un comentario acerca del status actualizado.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="CommentStatus"
                            label="Comentario..."
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseComments} color="primary">
                            Cancelar
          </Button>
                        <Button onClick={handleSendStatus} color="primary">
                            Actualizar
          </Button>
                    </DialogActions>
                </Dialog>
                : null}

        </div >
    );

}

export default ReportTable;