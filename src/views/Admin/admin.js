import React, { useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ReportTable from "../../components/ReportsTable/reportsTable";
import { useEffect } from "react";
import CotizadorAdmin from "../Cotizador/CotizadorAdmin/cotizadorAdmin";

export default function Admin() {

    const [change, setChange] = useState(false);


    useEffect(() => {
    }, [change]);

    return (
        <> {!change ?
            <>
                <BrowserRouter>
                    <NavBar title={"Dashboard"} tickets={"/admin/tickets"} cotizaciones={"/admin/cotizaciones"} sidebar>    </NavBar>
                    <Switch>
                        <Route path="/admin/tickets" >
                            <ReportTable isadmin typeuser="admin" />
                        </Route>
                        <Route path="/admin/cotizaciones">
                            <CotizadorAdmin />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </> :
            <Redirect to="/login" />
        }
        </>
    )
}

