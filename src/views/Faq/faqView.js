import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import Faq from '../../components/Faq/faq';
import ReportTable from '../../components/ReportsTable/reportsTable';
import NavBar from '../../components/NavBar/navBar';

function faqView() {


    return (<>
        <NavBar title={"Helper"} />
        < Grid container >
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >  <Faq /></Grid>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}><ReportTable typeuser={"client"} /></Grid>
        </Grid>
    </>
    );

}

export default faqView;