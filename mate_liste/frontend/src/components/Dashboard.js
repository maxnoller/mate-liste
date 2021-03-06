import React from "react"
import Product from "./Product"
import UserContext from "../UserContext";
import axiosInstance from "../axiosApi";
import { GridList, GridListTile, Divider, Typography     } from "@material-ui/core"

import PayPal from "./PayPal"




class Dashboard extends React.Component{

    constructor(props){
        super(props)
        this.state = {myfavorites: [], allproducts: []}

        this.createFavorites = this.createFavorites.bind(this)
        this.createProducts = this.createProducts.bind(this)
    }


    async createFavorites(){
        try {
            const favorites = await axiosInstance.get("/kiosk/favorite/user/");
            if (favorites.status == 200) {
                let myfavorites = []
                for(let i = 0;i < favorites.data.length; i++){
                    let pos = i;


                    const product = favorites.data[i].product;
                    console.log(product)
                    myfavorites[pos] = <Product name={product.name} price={product.price} image={product.image}
                                        id={product.id} />

                }
                return myfavorites
                
    
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

            console.log(products)

            products.data.forEach(element => {
                allproducts.push(<Product name={element.name} price={element.price} 
                                    image={element.image} id={element.id}/>)
            })

            return allproducts;
        } catch (error) {
            throw error;
        }
    }

    componentDidMount(){

        this.createFavorites().then(favs => this.setState({myfavorites: favs}))
        this.createProducts().then(prods => this.setState({allproducts: prods}))
        this.createFavorites().then(favs => this.setState({myfavorites: favs}));
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