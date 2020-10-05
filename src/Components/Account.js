import { Box, Button, Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { userContext } from '../App';
import Header from './Header';
import './Account.css'

const Account = () => {
    const [user, setUser] = useContext(userContext);
    const [ events, setEvents] = useState([]);
    const [count, setCount] = useState(1);
        useEffect( () => {
            fetch(`https://whispering-castle-44460.herokuapp.com/events?email=${user.email}`)
            .then (res => res.json())
            .then( data => setEvents(data))
        } , [count])
    const cancelEvent  = (id) => {
        fetch("https://whispering-castle-44460.herokuapp.com/deleteEvent/" + id, {
            method: "DELETE",
            Headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                setCount(count + 1);
            }
        })
    }
    return (
        <section className="account">
            <Container maxWidth="lg">
                <Header/>
                <Grid container spacing={3}>
                    {
                        events.map ( event => 
                            <Grid key={event._id}  item md={6}>
                                    <Box className="eventBox">
                                        <Grid container>
                                        <Grid className="eventImg"  item md={4}>
                                            <img src={event.pic} alt=""/>
                                        </Grid>
                                        <Grid className="eventDes" item md={6}>
                                            <p>{event.category}</p>
                                            <p>{new Date(event.date).toDateString('dd/mm/yyy')}</p>
                                        </Grid> 
                                        <Grid className="eventBtn" item md={2}>
                                            <Button style={{textDecoration:"none"}} onClick={()=> cancelEvent(event._id)} color="inherit" variant="contained">Cancel</Button>
                                        </Grid>
                                        </Grid> 
                                    </Box>    
                            </Grid>    
                            )
                    }
                </Grid>
            </Container>
        </section>
    );
};

export default Account;