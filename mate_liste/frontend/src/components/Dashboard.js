import React from "react"
import Product from "./Product"
import { Table, TableBody, TableRow, TableContainer, TableCell, GridList, GridListTile } from "@material-ui/core"



const elements = [

    <Product name="1" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="2" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="3" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="4" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>,
    <Product name="5" price="1" image="https://i.pinimg.com/originals/f0/94/9f/f0949ffd650d6cb98221705cc12b7c0c.jpg"/>
    
];




function Dashboard(probs) {

    
    
    return (

        <div>

            <h1>Favoriten</h1>
              
                <GridList cellHeight={275} cols={Math.round(screen.width/260)}>

                    {elements.map(element =>(

                        <GridListTile key={element.props.name}>
                            {element}
                        </GridListTile>

                    ))}
                    

                </GridList>
              


            <h1>Alle Produkte</h1>
           
        </div>

    );
    


}

export default Dashboard