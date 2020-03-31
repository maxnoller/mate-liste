import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import jwt_decode from "jwt-decode";
import axiosInstance from "../axiosApi";
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class NavBar extends Component {
    constructor(props){
      super(props);
      this.state = {isLoggedIn: true};
      this.checkLoggedIn();
    }
    async checkLoggedIn(){
      if(localStorage.getItem('refresh_token') === null){
        this.state.isLoggedIn = false;
        return;
      }
      var decoded = jwt_decode(localStorage.getItem('access_token'));
      try {
        const response = await axiosInstance.get("/auth/user/"+decoded['username']);
        if(response.status == 200){
          this.state.isLoggedIn = true;
        } else {
          this.state.isLoggedIn = false;
        }
        return;
      } catch (error) {
        throw error;
      }
    }
    render() {
      return (
        <div className={styles.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{flex: 1}}>
                MateListe
              </Typography>
              {this.state.isLoggedIn ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    open={false}
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >

                  </Menu>
                </div>
              ) : (
                <Button component={Link} to="/login/" color="inherit">
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
      );
      
    }
    
  }
  

export default withStyles(styles)(NavBar);