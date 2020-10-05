import React, { useEffect, useState } from 'react';
import {Grid, Container, Box, TextField, Button} from '@material-ui/core'
import Categories from './Categories';
import './Home.css'
import Header from './Header';

const RegistrationPrecess = () => {
    const [categories, setCategories] = useState([])
    useEffect( () => {
        fetch("https://whispering-castle-44460.herokuapp.com/allCategories")
        .then (res => res.json())
        .then( data => setCategories(data))
    } , [])
    return (
        <section className="home">
                <Container maxWidth="lg">
                <Header/>    
                <Grid container>
                    <Grid item md={3}>
                    </Grid>
                    <Grid style={{textAlign:"center"}} item md={6}>
                        <h1 style={{fontSize:"36px"}}>Please select an event from below.</h1>
   
                    </Grid>
                    <Grid item md={3}>
                    </Grid>
                </Grid>
                <Grid style={{marginTop:"30px"}} container spacing={2}>
                    {
                        categories.map( cat => <Categories categorie={cat} key={cat._id} />)
                    }
                </Grid>
            </Container>
        </section>
    );
};

export default RegistrationPrecess;