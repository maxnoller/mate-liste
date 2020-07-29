import React, { Component } from "react";
import { render } from "react-dom";
import {Switch, Route, Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import 'typeface-roboto';

import axiosInstance from "../axiosApi";
import NavBar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Dashboard from "./Dashboard";
import UserContext from "../UserContext.js";


class App extends Component {
  constructor(props){
    super(props);
    this.state =  {'user': null, 'updateValue': (key,value) => {console.log("test"); this.setState({[key]: value})}};
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount(){
    this.getUser();
  }

  async getUser() {
    if (localStorage.getItem('refresh_token') === null || localStorage.getItem('access_token') === null) {
        return false;
    }
    var decoded = jwt_decode(localStorage.getItem('access_token'));
    try {
        const response = await axiosInstance.get("/auth/user/" + decoded['username']+"/");
        if (response.status == 200) {
            this.setState({'user': response.data});
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
  }

  render() {
    return (
      <div className="site">
        <main>
        <UserContext.Provider value={this.state}>
        <CssBaseline />
          <NavBar />
          <Switch>
            <Route exact path={"/login/"}>
              <Login />
            </Route>
            <Route exact path={"/signup/"} component={Signup} />
            <Route path={"/"}>
              <Dashboard />
            </Route>
          </Switch>
        </UserContext.Provider>
        </main>
      </div>
    )
  };
}

export default App;