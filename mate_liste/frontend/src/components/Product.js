import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CardMedia, Card, createStyles, CardContent, Typography, Button, CardActions, CardActionArea, IconButton, Divider, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axiosInstance from "../axiosApi";
import Alert from '@material-ui/lab/Alert';

 

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: props.name, image: props.image, price: props.price,
                        user: props.user, id: props.id, open: false,
                        error: false}
        this.buyProd = this.buyProd.bind(this)
    }

    async buyProd(){
        try {

            let response = await axiosInstance.post("kiosk/transaction/",
            {
               user: this.state.user,
               product: this.state.id

            })

            this.setState({open: true})
            
        } catch (error) {
            
            this.setState({error: true})

        }
    }

    render(){

        const classes = makeStyles({
            root: {
              width: 130,
              height: 240
            },
            media: {
                height: 75,
            },
            button: {
                
            }
          });


            return (
                <div>
                    <Card className={classes.root}> 
                            <CardMedia 
                            className={classes.media}
                            title={this.state.name}
                            image={this.state.image}/>
                            <CardContent >
                                <Typography variant="h4">
                                    {this.state.name}
                                </Typography>
                                
                                <Typography variant="h5">
                                    {this.state.price}€  
                                </Typography>

                            </CardContent>

                            <Divider/>

                            <CardActions className={classes.button}>
                                    <Button
                                    variant="contained"
                                    size="small"
                                    onClick={this.buyProd}
                                    >Kaufen</Button>

                                    <IconButton>
                                        <FavoriteBorderIcon/>
                                    </IconButton>

                                    </CardActions>
                            
                    </Card>
                    <Snackbar open={this.state.open} autoHideDuration={5000}
                                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                                onClose={() => this.setState({open: false})}>
                        <Alert>
                            Der Artikel wurde gekauft!
                        </Alert>
                    </Snackbar>

                    <Snackbar open={this.state.error} autoHideDuration={5000}
                                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                                onClose={() => this.setState({error: false})}>
                        <Alert severity="error">
                            Beim kauf gab es einen Fehler!
                        </Alert>
                    </Snackbar>
                </div>
            );
        }

    


}

export default Product