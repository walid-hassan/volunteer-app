import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import Logo from '../images/logos/Group 1329.png';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './VolunteerList.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Trash from '../images/logos/trash-2 9.png'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const VolunteerList = () => {
    const [allUser, setAllUser] = useState([]);
    const [count, setCount] = useState(1)
    useEffect(()=>{
        fetch('https://whispering-castle-44460.herokuapp.com/allUsers')
        .then(res => res.json())
        .then (data => setAllUser(data))
    }, [count])
    const deleteUser = (id) => {
        fetch("https://whispering-castle-44460.herokuapp.com/deleteUser/" + id, {
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
        <Container style={{marginTop:"25px"}} maxWidth="lg">
            <Grid container>
                <Grid className="logo" item md={3}>
                    <Link to="/"><img src={Logo} alt=""/></Link>
                    <Link style={{textDecoration:"none"}} to="/admin/Volunteer-List"><h4 className="active"><PeopleAltIcon/>Volunteer register list</h4></Link>
                    <Link style={{textDecoration:"none"}} to="/admin/add-event"><h4 className="deactive"><AddIcon/>Add event</h4></Link>
                </Grid>
                <Grid item md={9}>
                    <h2 style={{fontWeight:"600"}}>Volunteer register list</h2>
                    <Box className="userDiv">
                        <Box className="userSection">
                            <Grid className="vlist" container >
                                <Grid  item md={2}> <p>Name</p></Grid>
                                <Grid item md={3}> <p>Email</p></Grid>
                                <Grid item md={3}> <p>Registration date</p></Grid>
                                <Grid item md={3}> <p>Volunteer List</p></Grid>
                                <Grid item md={1}> <p>Action</p></Grid>
                            </Grid>
                            {
                                allUser.map( user => 
                                    <Grid key={user._id} className="list" container >
                                        <Grid  item md={2}> <p>{user.name}</p></Grid>
                                        <Grid item md={3}> <p>{user.email}</p></Grid>
                                        <Grid item md={3}> <p>{new Date(user.date).toDateString('mm/yyyy')}</p></Grid>
                                        <Grid item md={3}> <p>{user.category}</p></Grid>
                                        <Grid className="del" item md={1}> <img onClick={()=> deleteUser(user._id)} src={Trash} alt=""/></Grid>
                                    </Grid>
                                    )
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default VolunteerList;