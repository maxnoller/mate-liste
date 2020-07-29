import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import jwt_decode from "jwt-decode";
import axiosInstance from "../axiosApi";
import UserContext from "../UserContext";
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: null, open: false};
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleMenu(event) {
        this.setState({anchorEl: event.currentTarget, open: Boolean(event.currentTarget)});
    }

    handleClose() {
        this.setState({anchorEl: null, open: false});
    }

    handleLogout(){
        this.context.updateValue("user", null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        this.props.history.push("/");
        this.handleClose();
    }
    render() {
        return (
            <div className={styles.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Grid
                            justify="space-between"
                            direction="row"
                            container
                        >
                        <Grid item align="center">
                            <Typography variant="h6" color="inherit" align="center">
                                MateListe
                            </Typography>
                        </Grid>
                        {this.context.user != null ? (
                            <div>
                                <Grid container item justify="center" alignItems="center" direction="row">
                                    <Grid item style={{textAlign: "center"}}>
                                    <Typography variant="h6" color="inherit">
                                        {this.context.user.balance}€
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={this.handleMenu}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Grid>
                                </Grid>
                                <Menu
                                    open={this.state.open}
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem>{this.context.user.username}</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                                <Button component={Link} to="/login/" color="inherit">
                                    Login
                                </Button>
                            )}
                            </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }

}
NavBar.contextType = UserContext;

export default withRouter(withStyles(styles)(NavBar));