import React, { Component } from "react";
import { render } from "react-dom";
import {Switch, Route, Link} from "react-router-dom";
import 'typeface-roboto';

import NavBar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  render() {
    return (
      <div className="site">
        <main>
          <NavBar />
          <Switch>
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/signup/"} component={Signup} />
            <Route path={"/"} render={() => <div>Home again</div>} />
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;