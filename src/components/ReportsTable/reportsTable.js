import React, { useEffect, useState } from "react";
import { DataGrid, } from '@material-ui/data-grid'
import MethodsTickets from '../../services/Methods/methodsTickets'
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import fullReportcss from '../../views/FullReport/fullReport.css'
import InterfaceDialog from '../../views/InterfaceDialog/interfaceDialog'
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    const procesos = [
        1,
        2,
        3,
        4,
    ];
    const [ilabels, setIlabels] = useState([]);

    const changeStatus = (id, status) => {
        classMethods.updateTicket(id, status.target.value).then(() => setRefresh(!isrefresh));

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
                            { field: 'title', headerName: 'TITULO', flex: .3 },
                            { field: 'process', headerName: 'PROCESO', flex: .4 },
                            { field: 'description', headerName: 'DESCRIPCIÓN', flex: .3 },
                            {
                                field: 'status', headerName: 'STATUS', flex: .3, renderCell: (row) =>
                                    (<><Typography style={{ display: "auto", margin: "auto", }} >{row.value}</Typography> <FiberManualRecordIcon className={selectStatusbk(row)}></FiberManualRecordIcon></>)
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
                            { field: 'id', headerName: 'ID', flex: .2 },
                            { field: 'title', headerName: 'TITULO', flex: .3 },
                            { field: 'process', headerName: 'PROCESO', flex: .3 },
                            { field: 'description', headerName: 'DESCRIPCIÓN', flex: .3 },
                            {
                                field: 'status', headerName: 'STATUS', flex: .3, renderCell: (row) =>
                                    (<> <Typography style={{ display: "auto", margin: "auto", }} >{row.row.status.name}</Typography> <FiberManualRecordIcon className={selectStatusbk(row.row.status.id)}></FiberManualRecordIcon></>)
                            },
                            {
                                field: 'updatedAt', headerName: "Actualizado en", flex: .3, renderCell: (row) =>
                                (< strong >
                                    { formato((row.value).substr(0, 10))}
                                </strong >)
                            },
                            {
                                field: 'createdAt', headerName: 'Creado en', flex: .4, renderCell: (row) =>
                                (< Grid container >
                                    < Grid item style={{ display: "auto", margin: "auto", }}>
                                        <strong >
                                            {formato((row.value).substr(0, 10))}
                                        </strong>
                                    </Grid>
                                    <Grid item style={{ display: "flex", margin: "auto" }}>
                                        <FormControl >
                                            <InputLabel style={{ display: "flex", margin: "auto" }} htmlFor="age-native-simple">Status </InputLabel>
                                            <Select
                                                key={row.row.id}
                                                labelId={row.row.title}
                                                id={row.row.id + row.row.title}
                                                value={row.row.status.id}
                                                onChange={changeStatus.bind(this, row.row.id)}
                                            >
                                                {procesos.map((proceso, index) => (
                                                    <MenuItem key={row.row.title + proceso.id + index} value={proceso} >{proceso}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    < Grid item style={{ margin: "auto", display: "flex" }}>
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

    return (
        <div style={{ height: 1000, width: "100%" }}>
            <Button className={classes.BtnNewReport} onClick={() => isvisibleInterfaceDialog()} >Crear Ticket</Button>
            <DataGrid disableColumnMenu showToolbar disableDensitySelector paginationMode="server"
                page={page}
                onPageChange={handlePageChange}
                loading={loading}
                pageSize={10} rows={items} columns={ilabels}
                rowCount={countsrow}
                rowHeight={85}
                rowsPerPageOptions={[10, 20, 40]}
                onPageSizeChange={handlepagresize}
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

        </div >
    );

}

export default ReportTable;