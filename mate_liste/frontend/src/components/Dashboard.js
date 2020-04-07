import React from "react"
import Product from "./Product"
import axiosInstance from "../axiosApi";
import { GridList, GridListTile, Divider, Typography, createMuiTheme } from "@material-ui/core"



async function createFavorites(){
    try {
        const response = await axiosInstance.get("/kiosk/favorite/");
        if (response.status == 200) {
            
            console.log(response)
            return response

        } else {
            
        }
        return;
    } catch (error) {
        throw error;
    }
}

const elements = [];

function Dashboard(probs) {

    createFavorites()

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