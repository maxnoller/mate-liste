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
    }


    async createFavorites(){
        if(this.context.user === null){
            return [];
        }
        try {
            const favorites = await axiosInstance.get("/kiosk/favorite/user/"+this.context.user.id+"/");
            if (favorites.status == 200) {
    
                let len = favorites.data.length
                let myfavorites = []
    


                for(let i = 0;i < len; i++){
                    let id = favorites.data[i].product
                    let pos = favorites.data[i].position


                    const product = await axiosInstance.get("/kiosk/product/" + id)

                    myfavorites[pos] = <Product name={product.data.name} price={product.data.price} image={product.data.image}
                                        id={id} user={favorites.data[i].user} />

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
            
            products.data.forEach(element => {
                allproducts.push(<Product name={element.name} price={element.price} image={element.image}/>)
            })

            return allproducts;
        } catch (error) {
            throw error;
        }
    }
    componentDidMount(){
        this.createProducts().then(prods => this.setState({allproducts: prods}))
    }
    componentDidUpdate(){
        
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

            <PayPal/>
                

        </div>

    );

    }

}
Dashboard.contextType = UserContext;
export default Dashboard