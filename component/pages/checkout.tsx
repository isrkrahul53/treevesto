import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import Layout from '../common/layout';

function CouponSVG(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="coupons-base-couponIcon"><g fill="none" fillRule="evenodd" transform="rotate(45 6.086 5.293)"><path stroke="#000" d="M17.5 10V1a1 1 0 0 0-1-1H5.495a1 1 0 0 0-.737.323l-4.136 4.5a1 1 0 0 0 0 1.354l4.136 4.5a1 1 0 0 0 .737.323H16.5a1 1 0 0 0 1-1z"></path><circle cx="5.35" cy="5.35" r="1.35" fill="#000" fillRule="nonzero"></circle></g></svg>
}

function CheckoutHeader(props){
    return <nav className="navbar navbar-expand-lg navbar-light bg-white border-b-2 border-gray-200 shadow-sm p-0">
    <div className="container-fluid">
        <span className="navbar-brand">
            <Link href="/">
                <img src="/logo.png" className="w-24 md:w-40" alt="logo"/>
            </Link>
        </span>

        <div className="hidden md:flex items-center">
            <h5 className={props.active == 1?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Bag</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 2?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Address</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 3?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Payment</h5>
        </div>

        <div className="items-center hidden md:flex">
            <img src="/assets/images/checkout/security-icon-27.jpg" width="50px" alt="security-icon-27"/>
            <h5 className="text-xl">100% Secure</h5>
        </div>
    </div>
</nav>
}

export default function Checkout(props) {

    const [active,setActive] = React.useState(null);
    const router = useRouter();

    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }
    
    // Cart
    const [cart,setCart] = React.useState(null)
    const [user,setUser] = React.useState(null)
    const [discount,setDiscount] = React.useState(0)
    const [couponUsed,setCouponUsed] = React.useState(null)
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
        var discount = localStorage.getItem('discount')
        var couponUsed = localStorage.getItem('couponUsed')
        
        cart && setCart(cart);updatePrice(cart)
        user && setUser(user)
        selectedAddress && setSelectedAddress(selectedAddress)
        discount && setDiscount(Number(discount))
        couponUsed && setCouponUsed(couponUsed)

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

    const applyCoupon = (coupon) => {
        if(coupon.discountType === "Rs"){
            setTotalPrice(totalPrice - coupon.discount)
            setDiscount(coupon.discount)
            localStorage.setItem("discount",coupon.discount)
        }else{
            var dis = ((coupon.discount/100)*totalPrice)
            setTotalPrice(totalPrice - dis)
            setDiscount(dis)
            localStorage.setItem("discount",dis.toString())
        }
        setCouponUsed(coupon._id)
        localStorage.setItem("couponUsed",coupon._id)
    }

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
        formData.append('couponDiscount',discount.toString())
        formData.append('couponId',couponUsed)
        formData.append('customerPhone',"6209460626")
        formData.append('customerState',"Jharkhand")
        formData.append('orderType',"COD")

        fetch(`https://api.treevesto.com:4000/order`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            // console.log(json)
            if(json.success === 1 && json.result){
                localStorage.removeItem("discount")
                localStorage.removeItem("couponUsed")
                cart.forEach(el=>{
                    var formData = new FormData();
                    formData.append('userId',user.userId)
                    formData.append('address',selectedAddress)
                    formData.append('orderStatus',"1")

                    Object.keys(el).map((key,i)=>{
                        if(el[key] != null && el[key] != ''){
                            formData.append(key,el[key]) 
                        }
                    })
                    
                    fetch(`https://api.treevesto.com:4000/orderedproduct`,{
                        method:"POST",
                        body:formData
                    }).then(d=>d.json()).then(json=>{ 

                    })
                })

                router.push({pathname:"/success",query:{
                    result:JSON.stringify(json.result),
                    user:JSON.stringify(user),
                }})
            }
        })
        // console.log(cart)
        // console.log(selectedAddress) 
        // console.log(user) 
    }

    return <div>
        {/* <CheckoutHeader active={active} /> */}
        <Layout error={error} success={success}>
            <div className="">
                <div className="w-full md:w-2/3 mx-auto flex-row md:flex">

                    {/* First column */}
                    <div className="w-full md:w-2/3 px-2 md:px-4 py-8">

                        {props.children}


                    </div>
                    {/* SEcond Column */}
                    <div className="w-full md:w-1/3 border-l-2 border-gray-200 p-3">
                        {/* {active === 1?<>
                        </>:<></>}  */}
                        {props.coupon?.map((e,k)=>(
                            <div key={k} className={couponUsed != e._id?"border-2 bg-white shadow-sm my-1 py-2 px-2 rounded":"border bg-light shadow-sm my-1 py-2 px-2 rounded"}>
                                <div className="text-lg font-medium flex items-center"> 
                                    <CouponSVG /> <span className="px-2">{e.couponName}</span> 
                                    <div className="ml-auto">
                                        <Button variant="text" color="primary" disabled={discount != 0} onClick={()=>applyCoupon(e)}>
                                            {couponUsed != e._id?"Apply":"Applied !"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-sm text-secondary"> {e.couponDesc} </div>
                            </div>
                        ))}
                        <div className="py-3">
                            <h3 className="text-lg font-medium">Price Details ( {cart?.length} Items ) </h3>
                            <div className="flex items-center justify-between">
                                <h4 className="text-md">Total MRP</h4>
                                <div>Rs.{totalPrice}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-md">Discount on MRP</h4>
                                <div>Rs. {discount} </div>
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
                            {/* <Button className="my-4" disabled={totalPrice == 0} fullWidth variant="contained" color="secondary">
                                Place Order
                            </Button> */}
                            <button type="button" disabled={totalPrice == 0} className="w-full my-4 px-4 py-1 rounded text-xl cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                                Place Order
                            </button>
                            </Link>:<></>}
                            
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    </div>
}