import { Container, Grid } from '@material-ui/core';
import React from 'react';
import soon from '../images/soon.gif'
import Header from './Header';


const Donation = () => {
    return (
        <Container maxWidth="lg">
            <Header/>
            <Grid container>
                <Grid item md={3}></Grid>
                <Grid style={{textAlign:"center"}} item md={6}>
                    <h1>DONATION PAGE</h1>
                    <img src={soon} alt=""/>
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        </Container>
    );
};

export default Donation;