import { Box, Container, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { userContext } from '../App';
import Logo from '../images/logos/Group 1329.png';
import './Login.css';
import GoogleIcon from '../images/logos/google.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useHistory, useLocation, Link } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [user, SetUser] = useContext(userContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const googleUser = result.user;
            const newUser = {...user};
            newUser.name = googleUser.displayName;
            newUser.email = googleUser.email;
            newUser.message = "Successfully logged in.";

            SetUser(newUser);
            history.replace(from)

            console.log(googleUser.displayName, "  --  ", googleUser.email);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUser = {...user};
            newUser.error = errorMessage;
            SetUser(newUser);
            // The email of the user's account used.
            const email = error.email;
            //const The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
          });
          
    }

    return (
        <section className="loginPage">
                <Container maxWidth="lg">
                <Box className="loginLogo" style={{textAlign:"center"}}>
                    <Link to="/home"><img src={Logo} alt=""/></Link>
                </Box>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item md={6}>
                        <Box className="loginForm">
                            <h1>Login With</h1>
                            <button onClick={googleLogin} className="googleBtn"><img src={GoogleIcon} alt=""/> Continue with google</button>
                            {
                                user.message && <p style={{color:"green"}}>{user.message}</p>
                            }
                        </Box>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Login;