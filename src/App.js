import React from "react";
import Login from './Pages/LoginPage'
import NewUser from './Pages/Newuser'
import Home from "./Pages/Home";
import Reset from './Pages/ResetPassword'
import NavBar from "./Components/NavBar/NavBar";
import { useAuth } from "./Components/Context/AuthContext";

import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom'
import Edit from "./Pages/Edit";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <NewUser></NewUser>
          </Route>
          <Route path="/resetpassword">
            <Reset></Reset>
          </Route>
          <Route path="/edit">
            {currentUser ? <Edit/> : <login/>}
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
