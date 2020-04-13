import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CardMedia, Card, createStyles, CardContent, Typography, Button, CardActions, CardActionArea, IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

 

class Product extends React.Component{
    
    onClick(){
        alert("test")
    }

    constructor(){
        super()
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
                    <Card className={classes.root}> 
                            <CardMedia 
                            className={classes.media}
                            title={this.probs.name}
                            image={this.probs.image}/>
                            <CardContent >
                                <Typography variant="h4">
                                    {this.probs.name}
                                </Typography>
                                
                                <Typography variant="h5">
                                    {this.probs.price}€  
                                </Typography>

                            </CardContent>

                            <Divider/>

                            <CardActions className={classes.button}>
                                    <Button onClick={onClick}
                                    variant="contained"
                                    size="small"
                                    >Kaufen</Button>

                                    <IconButton>
                                        <FavoriteBorderIcon/>
                                    </IconButton>

                                    </CardActions>
                            
                    </Card>

            );
        }

    


}

export default Product