import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import Logo from '../images/logos/Group 1329.png'
import './Header.css'
import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
    const [user, SetUser] = useContext(userContext);
    const logOut = () => {
        firebase.auth().signOut().then(function() {
            const loggedOut = {...user};
            loggedOut.name = "";
            loggedOut.email = "";
            loggedOut.message = "";
            loggedOut.error =  "";
            SetUser(loggedOut);
          }).catch(function(error) {
            console.log(error);
          });
    }
    return (
            <Grid style={{paddingTop:"20px"}} container>
                <Grid className="logo" item md={4}>
                    <Link to="/home"><img src={Logo} alt=""/></Link>
                </Grid>
                <Grid className="mainMenu" item md={8}>
                    <Link style={{textDecoration:"none", marginRight: "3%"}} to="/home"><span className="links">Home</span></Link>
                    <Link style={{textDecoration:"none", marginRight: "3%"}} to="/donation"><span className="links">Donation</span></Link>
                    <Link style={{textDecoration:"none", marginRight: "3%"}} to="/events"><span className="links">Events</span></Link>
                    <Link style={{textDecoration:"none", marginRight: "3%"}} to="/blog"><span className="links">Blog</span></Link>
                    <Link style={{textDecoration:"none", color:"orange", marginRight: "3%"}} to="/my-account">
                        <span style={{color:"orange"}} className="links">
                            {
                                user && user.name
                            }
                        </span>
                    </Link>
                    <Link style={{textDecoration:"none", color:"orange", marginRight: "3%"}} to="/registration-process"><span className="links resgister">Register</span></Link>
                    {
                        user.email ?
                        <span onClick={logOut} className="links logout">Logout</span>
                        : <Link style={{textDecoration:"none"}} to="/admin/Volunteer-List"><span className="links admin">Admin</span></Link>
                    }
                </Grid>
            </Grid>
    );
};

export default Header;