import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
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
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, anchorEl: null, open: false, user: null };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.checkLoggedIn();
    }
    async checkLoggedIn() {
        if (localStorage.getItem('refresh_token') === null) {
            this.setState({isLoggedIn: false});
            return;
        }
        var decoded = jwt_decode(localStorage.getItem('access_token'));
        try {
            const response = await axiosInstance.get("/auth/user/" + decoded['username']);
            if (response.status == 200) {
                this.setState({isLoggedIn: true, user: {username: response.data.username, balance: response.data.balance}});
            } else {
                this.setState({isLoggedIn: false, user: null});
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    handleMenu(event) {
        this.setState({anchorEl: event.currentTarget, open: Boolean(event.currentTarget)});
    }

    handleClose() {
        this.setState({anchorEl: null, open: false});
    }

    handleLogout(){
        this.setState({isLoggedIn: false, user: null});
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
                            container
                        >
                        <Grid item>
                            <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
                                MateListe
                            </Typography>
                        </Grid>
                        {this.state.isLoggedIn ? (
                            <div>
                                <Grid item>
                                    <Typography variant="h6" color="inherit">
                                        {this.state.user.balance}
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


export default withStyles(styles)(NavBar);