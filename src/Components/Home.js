import React, { useEffect, useState } from 'react';
import {Grid, Container, Box, TextField, Button} from '@material-ui/core'
import Categories from './Categories';
import './Home.css'
import Header from './Header';

const Home = () => {
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
                        <h1 style={{fontSize:"36px"}}>I grow by helping people in need.</h1>
                        <Box >
                            <form>
                                <input style={{
                                    border:"2px solid #D6D6D6",
                                    width: "370px",
                                    paddingLeft:"10px",
                                    borderRadius: "5px",
                                    height:"30px",
                                    fontSize:"14px"
                                }} 
                                type="text" name="search" id="search" placeholder="search"/>
                                <button
                                    style={{
                                        background:"#3f90fc",
                                        padding:"10px",
                                        fontWeight: "700",
                                        color:"#fff",
                                        border:"none",
                                        borderRadius: "5px",
                                        fontSize: "13px"
                                    }}
                                >Search</button>
                            </form>
                        </Box>    
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

export default Home;