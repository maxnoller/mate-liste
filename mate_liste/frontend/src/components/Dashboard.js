import React from "react"
import Product from "./Product"
import axiosInstance from "../axiosApi";
import { GridList, GridListTile, Divider, Typography, createMuiTheme } from "@material-ui/core"



async function createFavorites(){
    try {
        const favorites = await axiosInstance.get("/kiosk/favorite/");
        if (favorites.status == 200) {
            
            console.log("RESPONSE:")
            console.log(favorites.data.length)

            const products = await axiosInstance.get("/kiosk/product/")

            console.log(products.data)

            let len = favorites.data.length

            for(let i = 0;i < len; i++){
                let id = favorites.data[i].id

                products.data.forEach(product => {
                    if(product.id == id){
                        myfavorites.push(<Product name={product.name} price={product.price} image={product.image}/>)
                    }
                });
            }
            

        } else {
            
        }
        return;
    } catch (error) {
        throw error;
    }
}


const myfavorites = [];

function Dashboard(probs) {

    createFavorites()
    

    return (

        <div>

            <Typography align="center" variant="h3">
                Favoriten
            </Typography>

                <GridList cellHeight={240} cols={Math.round(screen.width/155)}>

                    {myfavorites.map(element =>(

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