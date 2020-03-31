import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CardMedia, Card, createStyles, CardContent, Typography, Button, CardActions, CardActionArea, IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles({
    root: {
      width: 130,
      height: 220
    },
    media: {
        height: 75,
    },
    button: {
        
    }
  });

function Product (probs){


   const classes = useStyles();


    return (
            <Card className={classes.root}> 
                    <CardMedia 
                    className={classes.media}
                    title={probs.name}
                    image={probs.image}/>
                    <CardContent >
                        <Typography variant="h4">
                            {probs.name}
                        </Typography>
                        
                        <Typography variant="h5">
                            {probs.price}€  
                        </Typography>

                        <Divider/>

                        <CardActions className={classes.button}>
                            <Button 
                            variant="contained"
                            size="small"
                            >Kaufen</Button>

                            <IconButton>
                                <FavoriteBorderIcon/>
                            </IconButton>

                            </CardActions>

                    </CardContent>
                    
            </Card>

    );

    


}

export default Product