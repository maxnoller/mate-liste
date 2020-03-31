import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CardMedia, Card, createStyles, CardContent, Typography, Button, CardActions, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from "@material-ui/core/colors";


const useStyles = makeStyles({
    root: {
      width: 150,
      height: 300
    },
    media: {
        height: 10,
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
                            <CardActions>
                            <Button 
                            size="small"
                            variant="outlined"
                            >Kaufen</Button>
                            </CardActions>
                        </Typography>
                    </CardContent>
                    
            </Card>

    );

    


}

export default Product