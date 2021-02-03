import React, { useEffect, useState } from "react";
import { DataGrid, } from '@material-ui/data-grid'
import MethodsTickets from '../../services/Methods/methodsTickets'
import { Button, Grid, Typography } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import fullReportcss from '../../views/FullReport/fullReport.css'
import InterfaceDialog from '../../views/InterfaceDialog/interfaceDialog'

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

    const [ilabels, setIlabels] = useState([
        { field: 'id', headerName: 'ID', flex: .2 },
        { field: 'title', headerName: 'TITULO', flex: .3 },
        { field: 'process', headerName: 'PROCESO', flex: .3 },
        { field: 'description', headerName: 'DESCRIPCIÓN', flex: .3 },
        {
            field: 'status', headerName: 'STATUS', flex: .3, renderCell: (row) =>
                (<Typography>{row.value} <FiberManualRecordIcon className={selectStatusbk(row)}></FiberManualRecordIcon></Typography>)
        },
        {
            field: 'updatedAt', headerName: "Actualizado en", flex: .3, renderCell: (row) =>
                (< strong >{formato((row.value).substr(0, 10))} </strong >)
        },
        {
            field: 'createdAt', headerName: 'Creado en', flex: .4, renderCell: (row) =>
            (< Grid container >
                <span style={{ height: "20px", marginBottom: "0" }}>
                    {formato((row.value).substr(0, 10))}
                </span>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ margin: "40px 0" }}
                    onClick={() => isvisibleInterfaceDialog(row.row.id, undefined)}
                >Ver Reporte</Button>
            </ Grid >)
        }]);

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
        switch (idStatus.value) {
            case 0: {

                return classes.green;
            }
            case 1: {
                return classes.yellow;
            }
            case 2: {
                return classes.red;
            }
            default: {
                return classes.white;
            }

        }

    }
    async function UpdateTable(n, it, id_client) {
        if (isUpdate) {
            switch (props.typeuser) {
                case "client":
                    classMethods.getTickets(n, it, id_client).then(res => {
                        setUpdate(false);
                        setrow(res.totalItems);
                        setItems(res.tickets);
                    });
                    break;
                case "admin":
                    classMethods.getAllTickets(n, it).then(res => {
                        setUpdate(false);
                        setrow(res.totalItems);
                        setItems(res.tickets);
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


    return (
        <div style={{ height: 1000, width: "100%" }}>
            <Button style={{ position: "relative", top: 0 }} onClick={() => isvisibleInterfaceDialog()} >Crear Ticket</Button>
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