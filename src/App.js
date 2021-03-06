import React, { useState, createContext } from 'react';
import './App.css';
import Appoinment from './components/Appoinment/Appoinment';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserAppoinment from './components/UserAppointment/UserAppoinment';
import Modals from './components/Modals/Modals';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  // const [value, onChange] = useState(new Date());


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Appoinment></Appoinment>
          </Route>
          <Route path="/close">
            <Appoinment></Appoinment>
          </Route>
          <Route path="/home">
            <Appoinment></Appoinment>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/appoinment">
            <UserAppoinment></UserAppoinment>
          </PrivateRoute>
          <PrivateRoute path="/modal">
            <Modals></Modals>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
