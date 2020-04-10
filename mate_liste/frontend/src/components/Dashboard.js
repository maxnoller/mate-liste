import React from "react"
import Product from "./Product"
import axiosInstance from "../axiosApi";
import { GridList, GridListTile, Divider, Typography } from "@material-ui/core"




class Dashboard extends React.Component{

    constructor(){
        super()
        this.state = {myfavorites: [], allproducts: []}
    }


    async createFavorites(){
        try {
            const favorites = await axiosInstance.get("/kiosk/favorite/");
            if (favorites.status == 200) {
    
                let len = favorites.data.length
                let myfavorites = []
    


                for(let i = 0;i < len; i++){
                    let id = favorites.data[i].product
                    let pos = favorites.data[i].position


                    const product = await axiosInstance.get("/kiosk/product/" + id)

                    myfavorites[pos] = <Product name={product.data.name} price={product.data.price} image={product.data.image} />

                }

                return myfavorites
                
    
            } else {
                
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async createProducts(){
        try {
            const products = await axiosInstance.get("/kiosk/product/")
            let allproducts = []
            
            products.data.forEach(element => {
                allproducts.push(<Product name={element.name} price={element.price} image={element.image}/>)
            })

            return allproducts;
        } catch (error) {
            console.log("error bei createproducts")
        }
    }

    componentDidMount(){
        
        this.createFavorites().then(favs => this.setState({myfavorites: favs}))
        this.createProducts().then(prods => this.setState({allproducts: prods}))

    }

    render(){

        return (<div>

            <Typography align="center" variant="h3">
                Favoriten
            </Typography>
                <Divider/>
                <GridList cellHeight={240} cols={Math.round(screen.width/155)}>

                    
                    {this.state.myfavorites.map(element =>(

                        <GridListTile key={element.props.name}>
                            {element}
                        </GridListTile>

                    ))}

                </GridList>
              
                <Divider/>

            <Typography align="center" variant="h3">Alle Produkte</Typography>
           
            <Divider/>
            <GridList cellHeight={240} cols={Math.round(screen.width/155)}>

                    
                    {this.state.allproducts.map(element =>(

                        <GridListTile key={element.props.name}>
                            {element}
                        </GridListTile>

                    ))}

                </GridList>
                <Divider/>

        </div>

    );

    }

}

export default Dashboard