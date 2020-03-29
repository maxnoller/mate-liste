import React, {Component} from 'react';
import {render} from 'react-dom';
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class NavBar extends Component {
    
    render() {
      return (
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                MateListe
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
      
    }
    
  }
  

export default withStyles(styles)(NavBar);