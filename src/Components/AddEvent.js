import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import React from 'react';
import Logo from '../images/logos/Group 1329.png';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './VolunteerList.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Trash from '../images/logos/trash-2 9.png'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const AddEvent = () => {
    const [message, setMessage] = useState({
        error:"",
        success:""
    });
    const addEvent = () => {
        const name = getInputValue("name");
        const description = getInputValue("desription");
        const date = getInputValue("date");
        if ( name !== ' ' && description !== '' && date !== ''){
            const newEvent = {name, description, date, pic:"https://i.ibb.co/xf4yfbw/river-Clean.png"}
            fetch("https://whispering-castle-44460.herokuapp.com/addEvent", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(newEvent)
            })
            .then( res => res.json())
            .then( data => {
                if(data.insertedCount > 0){
                    const mes = {...message};
                    mes.success = "Event added successfully";
                    mes.error = "";
                    setMessage(mes)
                }
            })
            }
        else{
            const mes = {...message};
            mes.error = "Please fill all the fields";
            mes.success = "";
            setMessage(mes)
        }    

    }
    function getInputValue(id){
        const inputValue = document.getElementById(id).value;
        return inputValue;
      }
    return (
        <Container style={{marginTop:"25px"}} maxWidth="lg">
            <Grid container>
                <Grid className="logo" item md={3}>
                    <Link to="/"><img src={Logo} alt=""/></Link>
                    <Link style={{textDecoration:"none"}} to="/admin/Volunteer-List"><h4 className="deactive"><PeopleAltIcon/>Volunteer register list</h4></Link>
                    <Link style={{textDecoration:"none"}} to="/admin/add-event"><h4 className="active"><AddIcon/>Add event</h4></Link>
                </Grid>
                <Grid item md={9}>
                    <h2 style={{fontWeight:"600"}}>Add event</h2>
                    <Box className="userDiv">
                        <Box className="userSection">
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <h4>Title</h4>
                                    <TextField id="name" fullWidth type="text" color="primary" variant="outlined"required />                                  
                                </Grid>
                                <Grid item md={6}>
                                    <h4>Event date</h4>
                                    <TextField id="date" fullWidth type="date" color="primary" variant="outlined" required />
                                </Grid>
                                <Grid item md={12}>
                                    <h4>Description</h4>
                                    <TextField  id="desription"  fullWidth type="textArea" color="primary" variant="outlined" required/>
                                </Grid>
                                <Grid item md={10}>
                                    {
                                        message.error && <p style={{color:"red", fontWeight:"700"}}>{message.error}</p>
                                    }
                                    {
                                        message.success && <p style={{color:"green", fontWeight:"700"}}>{message.success}</p>
                                    }
                                </Grid>
                                <Grid item md={2}>
                                    <Button style={{textDecoration:"none"}} onClick={addEvent} color="primary" variant="contained">Submit</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddEvent;