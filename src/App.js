import React from "react";
import Login from './Pages/LoginPage'
import NewUser from './Pages/Newuser'
import Home from "./Pages/Home";
import Reset from './Pages/ResetPassword'
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
