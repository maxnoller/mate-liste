import React, { Component } from "react";
import { render } from "react-dom";
import {Switch, Route, Link} from "react-router-dom";
import 'typeface-roboto';

import NavBar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Product from "./Product"

class App extends Component {
  render() {
    return (
      <div className="site">
        <main>
          <NavBar />
          <Switch>
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/signup/"} component={Signup} />
            <Route path={"/"}>
              <Product name="Cola" price="2" image="https://image.shutterstock.com/image-photo/swindon-wiltshire-uk-september-2018-260nw-1169125957.jpg"/>
            </Route>
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;