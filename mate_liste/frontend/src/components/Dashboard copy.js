import React from "react"
import Product from "./Product"
import axiosInstance from "../axiosApi";
import { GridList, GridListTile, Divider, Typography, createMuiTheme } from "@material-ui/core"

class ClassDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = { data: [] };

        this.createFavorites = this.createFavorites.bind(this);
    }

    async createFavorites(){
        try {
            const favorites = await axiosInstance.get("/kiosk/product/");
            if (favorites.status == 200) {
                console.log(favorites.data);
                return favorites.data;
                
    
            } else {
                
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    componentDidMount() {
        this.createFavorites().then(res => this.setState({data: res}));
    }

    render(){
        return (

            <div>

                <Typography align="center" variant="h3">
                    Favoriten
                </Typography>

                    <GridList cellHeight={240} cols={Math.round(screen.width/155)}>

                        {this.state.data.map(element =>(

                            <GridListTile key={element.name}>
                                <Product name={element.name} price={element.price} image={element.image} />
                            </GridListTile>

                        ))}

                    </GridList>
                


                <Typography align="center" variant="h3">Alle Produkte</Typography>
            
            </div>

        )};
}

export default ClassDashboard