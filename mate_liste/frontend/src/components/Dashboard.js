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
<<<<<<< HEAD

        if(this.context.user === null){
            return [];
        }
        try {
            const favorites = await axiosInstance.get("/kiosk/favorite/user/" + this.context.user.id + "/");
=======
        try {
            const favorites = await axiosInstance.get("/kiosk/favorite/user/");
>>>>>>> 57759a28fd8a96c57dd5579ade064a864b357526
            if (favorites.status == 200) {
                let myfavorites = []
<<<<<<< HEAD
    

                for(let i = 0;i < len; i++){
                    let id = favorites.data[i].product
                    let pos = favorites.data[i].position
=======
                for(let i = 0;i < favorites.data.length; i++){
                    let pos = i;

>>>>>>> 57759a28fd8a96c57dd5579ade064a864b357526

                    const product = favorites.data[i].product;

<<<<<<< HEAD
                    const product = await axiosInstance.get("/kiosk/product/" + id + "/")

                    myfavorites[pos] = <Product name={product.data.name} price={product.data.price} image={product.data.image}
                                        id={id} user={favorites.data[i].user} />
=======
                    myfavorites[pos] = <Product name={product.name} price={product.price} image={product.image}
                                        id={i} user={favorites.data[i].user} />
>>>>>>> 57759a28fd8a96c57dd5579ade064a864b357526

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
<<<<<<< HEAD
    }

=======
        this.createFavorites().then(favs => this.setState({myfavorites: favs}));
    }
>>>>>>> 57759a28fd8a96c57dd5579ade064a864b357526

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
<<<<<<< HEAD

Dashboard.contextType = UserContext;
=======
>>>>>>> 57759a28fd8a96c57dd5579ade064a864b357526
export default Dashboard