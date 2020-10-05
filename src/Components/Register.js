import React, { useContext, useState } from 'react';
import { Box, Container, Grid, TextField } from '@material-ui/core';
import { userContext } from '../App';
import Logo from '../images/logos/Group 1329.png';
import './Login.css';
import './Register.css';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';


const Register = () => {
    const [user, SetUser] = useContext(userContext);
    const [registration, setRegistration] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [categories, setCategories] = useState({})
    const {id} = useParams();
    const history = useHistory();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const registred = () => {
    const name = getInputValue("userName");
    const email = getInputValue("email");
    const description = getInputValue("description");
    const category = getInputValue("categorie");
    
    const fulldetails = {name, email, date:selectedDate, description, category, pic: categories.pic}
    fetch("https://whispering-castle-44460.herokuapp.com/addvalunteer", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(fulldetails)
    })
    history.push("/home")   
  }
    useEffect( () => {
        fetch("https://whispering-castle-44460.herokuapp.com/allCategories")
        .then (res => res.json())
        .then( data => {
            const singleCategory = data.find(cat => cat._id === id);
            setCategories(singleCategory);
        })
    } , [])
  function getInputValue(id){
    const inputValue = document.getElementById(id).value;
    return inputValue;
  }
 
  console.log(categories);
    return (
        <section className="loginPage">
                <Container maxWidth="lg">
                <Box className="loginLogo" style={{textAlign:"center"}}>
                    <Link to="/home"><img src={Logo} alt=""/></Link>
                </Box>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item md={6}>
                        <Box id="registerForm" >
                            <form>
                                <h1>Register as volunteer</h1>
                                <TextField id="userName" fullWidth color="primary" variant="standard" type="text" label="Your full name" value={user.name} name="name"/>
                                <TextField id="email" fullWidth color="primary" variant="standard" type="email" label="Username or email" value={user.email} name="email"/>
                                <TextField id="description" fullWidth color="primary" variant="standard" type="text" label="Description" name="description"/>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    </MuiPickersUtilsProvider>
                                <TextField style={{marginTop:"10px"}} id="categorie" value={categories.name} fullWidth color="primary" variant="standard" type="text" name="categorie"/>
                                <button type="button" onClick={registred} className="resgisterBtn">Registration</button>
                            </form>
                            
                        </Box>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Register;