import React from "react"
import Product from "./Product"
import { GridList, GridListTile, Divider, Typography, createMuiTheme } from "@material-ui/core"



const elements = [

    <Product name="1" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="2" price="2" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="3" price="3" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="4" price="4" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="5" price="5" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>
    
];



function Dashboard(probs) {

    
    return (

        <div>

            <Typography align="center" variant="h3">
                Favoriten
            </Typography>

                <GridList cellHeight={240} cols={Math.round(screen.width/155)}>

                    {elements.map(element =>(

                        <GridListTile key={element.props.name}>
                            {element}
                        </GridListTile>

                    ))}

                </GridList>
              


            <Typography align="center" variant="h3">Alle Produkte</Typography>
           
        </div>

    );
    


}

export default Dashboard