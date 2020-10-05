import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Account from './Components/Account';
import VolunteerList from './Components/VolunteerList';
import AddEvent from './Components/AddEvent';
import PrivateRoute from './Components/PrivateRoute';
import RegistrationPrecess from './Components/RegistrationPrecess';
import Events from './Components/Events';
import Donation from './Components/Donation';
import Blogs from './Components/Blogs';


export const userContext = createContext();
function App() {
  const [user, SetUser] = useState({
    name:"",
    email:"",
    message:"",
    error: ""
  });
  return (
    <userContext.Provider value={[user, SetUser]} >
        <Router>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/events">
              <Events/>
            </Route>
            <Route path="/donation">
              <Donation/>
            </Route>
            <Route path="/blog">
              <Blogs/>
            </Route>
            <PrivateRoute path="/registration/:id">
              <Register/>
            </PrivateRoute>
            <Route path="/my-account">
              <Account/>
            </Route>
            <Route path="/registration-process">
              <RegistrationPrecess/>
            </Route>
            <Route path="/admin/Volunteer-List">
              <VolunteerList/>
            </Route>
            <Route path="/admin/add-event">
              <AddEvent/>
            </Route>
          </Switch>
        </Router>
    </userContext.Provider>
  );
}

export default App;
