import React, { Component } from "react";
import { render } from "react-dom";
import {Switch, Route, Link} from "react-router-dom";
import 'typeface-roboto';

import NavBar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Dashboard from "./Dashboard";


class App extends Component {
  render() {
    return (
      <div className="site">
        <main>
        <CssBaseline />
          <NavBar />
          <Switch>
            <Route exact path={"/login/"}>
              <Login />
            </Route>
            <Route exact path={"/signup/"} component={Signup} />
            <Route path={"/"}>
              <Dashboard/>
            </Route>
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;