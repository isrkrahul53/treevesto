import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

function CouponSVG(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="coupons-base-couponIcon"><g fill="none" fillRule="evenodd" transform="rotate(45 6.086 5.293)"><path stroke="#000" d="M17.5 10V1a1 1 0 0 0-1-1H5.495a1 1 0 0 0-.737.323l-4.136 4.5a1 1 0 0 0 0 1.354l4.136 4.5a1 1 0 0 0 .737.323H16.5a1 1 0 0 0 1-1z"></path><circle cx="5.35" cy="5.35" r="1.35" fill="#000" fillRule="nonzero"></circle></g></svg>
}

function CheckoutHeader(props){
    return <nav className="navbar navbar-expand-lg navbar-light bg-white border-b-2 border-gray-200 shadow-sm p-0">
    <div className="container-fluid">
        <span className="navbar-brand">
            <Link href="/">
                <img src="/logo.png" width="150px" alt="logo"/>
            </Link>
        </span>

        <div className="hidden md:flex items-center">
            <h5 className={props.active == 1?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Bag</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 2?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Address</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 3?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Payment</h5>
        </div>

        <div className="flex items-center">
            <img src="/assets/images/checkout/security-icon-27.jpg" width="50px" alt="security-icon-27"/>
            <h5 className="text-xl">100% Secure</h5>
        </div>
    </div>
</nav>
}

export default function Checkout(props) {

    const [active,setActive] = React.useState(null);
    const router = useRouter();

    // Cart
    const [cart,setCart] = React.useState(null)
    const [user,setUser] = React.useState(null)
    const [totalPrice,setTotalPrice] = React.useState(null)
    const [selectedAddress,setSelectedAddress] = React.useState(null);



    useEffect(()=>{  
        switch(router.asPath){
            case '/checkout/cart':setActive(1);break;
            case '/checkout/address':setActive(2);break;
            case '/checkout/payment':setActive(3);break;
            default:setActive(null)
        }
        var cart = JSON.parse(localStorage.getItem('cart'))
        var selectedAddress = localStorage.getItem('selectedAddress')
        var user = JSON.parse(localStorage.getItem('user'))
        if(cart){ 
            setCart(cart)
            updatePrice(cart)
        } 
        if(user){
            setUser(user)
        }
        if(selectedAddress){
            setSelectedAddress(selectedAddress)
        }

    },[])
 
    useEffect(()=>{
        if(props.cart){
            updatePrice(props.cart)
        }
    },[props.cart]) 
 

    useEffect(()=>{
        if(props.pay){
            checkout();
        }
    },[props.pay])

    const updatePrice = (y) => {
        var data = y;
        var x = 0;
        data?.forEach(element => {
            x += Number(element.price);
        });
        
        setCart(data)
        setTotalPrice(x);
    }
 
    const checkout = () => {
        var formData = new FormData();
        formData.append('cart',JSON.stringify(cart))
        formData.append('address',selectedAddress)
        formData.append('userId',user.userId)
        formData.append('totalAmount',totalPrice)
        formData.append('orderType',"COD")
        formData.append('orderStatus',"1")

        fetch(`http://treevesto55.herokuapp.com/order`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            router.push({pathname:"/success",query:{
                result:JSON.stringify(json.result),
                user:JSON.stringify(user),
            }})
        })

        // console.log(cart)
        // console.log(selectedAddress) 
        // console.log(user) 
    }

    return <div>
        <CheckoutHeader active={active} />

        <div className="">
                <div className="w-full md:w-2/3 mx-auto flex-row md:flex">

                    {/* First column */}
                    <div className="w-full md:w-2/3 px-2 md:px-4 py-8">

                        {props.children}


                    </div>
                    {/* SEcond Column */}
                    <div className="w-full md:w-1/3 border-l-2 border-gray-200 p-3">
                        <h4 className="text-lg font-medium text-secondary">COUPONS</h4>
                        <div className="flex items-center justify-between my-3">
                            <div className="flex items-center">
                                <CouponSVG />
                                <span className="text-lg px-2">Apply Coupons</span>
                            </div>
                            <Button variant="outlined" color="secondary">
                              Apply
                            </Button>
                        </div>
                        <hr />
                        <div className="py-3">
                            <h3 className="text-lg font-medium">Price Details ( {cart?.length} Items ) </h3>
                            <div className="flex items-center justify-between">
                                <h4 className="text-md">Total MRP</h4>
                                <div>Rs.{totalPrice}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-md">Discount on MRP</h4>
                                <div>Rs.0</div>
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <h4 className="text-md">Convenience fee</h4>
                                <div><s>Rs.99</s> <span className="text-red-500">FREE</span> </div>
                            </div> */}
                            <hr className="my-2" />

                            <div className="flex items-center justify-between">
                                <h4 className="text-md">Total Amount</h4>
                                <div>Rs. {totalPrice} </div>
                            </div>
                            {active == 1?<Link href="/checkout/address">
                            <Button className="my-4" disabled={totalPrice == 0} fullWidth variant="contained" color="secondary">
                              Place Order
                            </Button></Link>:<></>}
                            
                        </div>


                    </div>
                </div>
            </div>
    </div>
}