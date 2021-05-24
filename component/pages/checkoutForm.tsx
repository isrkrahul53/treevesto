import React from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


export default function CheckoutForm({paymentIntent}){

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {error, paymentIntent:{status}} = await stripe.confirmCardPayment(paymentIntent.client_secret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            })
            if(error) throw  new Error(error.message)

            if(status === 'succeeded'){
                alert('Payment made')
            }
        }
        catch(err){
            alert(err.message)
        }
    }

    return <form onSubmit={handleSubmit}>
        <CardElement />

        <button type="submit" disabled={!stripe} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
        Pay Now
        </button>
    </form>
}