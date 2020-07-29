import React, { Component, Fragment } from "react";
import {PayPalButton} from "react-paypal-button-v2";
import { TextField, Button } from "@material-ui/core";

export default class PayPal extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            price: "5",
            options: {
                clientId: "ARC28i_cGfVVv0iu9ZAtVDChBrZ2nAyXNRHzlCt0TNS4k3fnMnQGMi5-A4Con6MWyUwKh07zQNtbd3TV",
                currency: "EUR"
            }
        }

        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.setPrice = this.setPrice.bind(this)
    }

    setPrice(e){

        this.setState({price: e.target.value})
        console.log(e.target.value)
    }

    onSuccess(details){
        alert("payment succeeded")
    }

    onError(details){
        alert("es gab einen error")
    }

    onCancel(details){
        alert("der kauf wurde abgebrochen")
    }
    
    render(){
            
        return (
            <div>   
                <h1>Guthaben um: </h1>
                <TextField type="number" variant="outlined"
                            value={this.state.price} onChange={this.setPrice} />
                <h1> aufladen.</h1>
                <h1>+ PayPal Gebühren ({(Math.ceil((this.state.price*0.019 + 0.35)*100))/100}) €</h1>



                <PayPalButton
                amount={this.state.price}
                currency="EUR"
                shippingPreference="NO_SHIPPING"
                onSuccess={this.onSuccess}
                onError={this.onError}
                onCancel={this.onCancel}
                options={this.state.options}
                />
            </div>
        )

    }


}
