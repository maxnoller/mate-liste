import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import jwt_decode from "jwt-decode";
import axiosInstance from "../axiosApi";

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

class Login extends Component{
    constructor(props){
        super(props);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.checkLoggedIn().then(function(result){
            if(result){
                props.history.push("/");
            }
        });
        this.state = {username: "", password: "", snackbarOpen: false, alertElement: null, redirect: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleClose(event, reason){
        this.setState({snackbarOpen: false});
        if(this.state.redirect){
            sleep(500).then(() => {
                this.props.history.push("/");

            })
        }
    }
    async checkLoggedIn() {
        if (localStorage.getItem('refresh_token') === null || localStorage.getItem('access_token') === null) {
            return false;
        }
        var decoded = jwt_decode(localStorage.getItem('access_token'));
        try {
            const response = await axiosInstance.get("/auth/user/" + decoded['username']+"/");
            if (response.status == 200) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/token/obtain/", {
                username: this.state.username,
                password: this.state.password
            });
            if(response.status == 200){
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.setState({alertElement: <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
                                                Successfully logged in
                                             </Alert>});
                this.setState({redirect: true});
                this.setState({snackbarOpen: true});
                return response.data;
            }
        } catch (error) {
            if (error.response.status == 401){
                this.setState({alertElement: <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
                                                {error.response.data.detail}
                                             </Alert>});
                this.setState({redirect: false});
                this.setState({snackbarOpen: true});
                return error.response.data;
            } else {
                throw error;
            }
        }
    }

    render(){
        return (
            <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid item>
                            <h2>Login</h2>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />    
                    </Grid>
                    <Grid item xs={12}>
                        <Box my={1}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Box>
                    </Grid>
                    <Grid container item xs={12} alignItems="center" justify="center">
                        <Grid item>
                            <Box my={1}>
                                <Button
                                    variant="contained"
                                    label="Submit"
                                    type="submit"
                                    color="primary"
                                    my={24}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Snackbar open={this.state.snackbarOpen} autoHideDuration={2000} onClose={this.handleClose}>
                {this.state.alertElement}
            </Snackbar>
            </div>
        )
    }
}
export default withRouter(Login);