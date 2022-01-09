import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import Layout from '../common/layout';
import MaterialModal from '../material/materialModal';

function CouponSVG(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="coupons-base-couponIcon"><g fill="none" fillRule="evenodd" transform="rotate(45 6.086 5.293)"><path stroke="#000" d="M17.5 10V1a1 1 0 0 0-1-1H5.495a1 1 0 0 0-.737.323l-4.136 4.5a1 1 0 0 0 0 1.354l4.136 4.5a1 1 0 0 0 .737.323H16.5a1 1 0 0 0 1-1z"></path><circle cx="5.35" cy="5.35" r="1.35" fill="#000" fillRule="nonzero"></circle></g></svg>
}

function CheckoutHeader(props){
    return <nav className="navbar navbar-expand-lg navbar-light bg-white border-b-2 border-gray-200 shadow-sm p-0">
    <div className="container-fluid">
        <span className="navbar-brand">
            <Link href="/">
                <img src="/logo.png" className="w-24 lg:w-40" alt="logo"/>
            </Link>
        </span>

        <div className="hidden lg:flex items-center">
            <h5 className={props.active == 1?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Bag</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 2?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Address</h5>
            <h5 className="text-xl p-2">----</h5>
            <h5 className={props.active == 3?"text-xl p-2 border-b-4 text-4xl text-green-500 border-green-500":"text-xl p-2"}>Payment</h5>
        </div>

        <div className="items-center hidden lg:flex">
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
    const [searchCoupon,setSearchCoupon] = React.useState("")
    const [hidden,setHidden] = React.useState(false)
    const [couponUsed,setCouponUsed] = React.useState(null)
    const [totalPrice,setTotalPrice] = React.useState(null)
    const [deliveryFee,setDeliveryFee] = React.useState(50)
    const [selectedAddress,setSelectedAddress] = React.useState(null);



    useEffect(()=>{  
        switch(router.asPath){
            case '/checkout/cart':setActive(1);break;
            case '/checkout/address':setActive(2);break;
            case '/checkout/payment':setActive(3);break;
            default:setActive(null)
        }
        // var cart = JSON.parse(localStorage.getItem('cart'))
        var selectedAddress = localStorage.getItem('selectedAddress')
        var user = JSON.parse(localStorage.getItem('user'))
        var discount = localStorage.getItem('discount')
        var couponUsed = localStorage.getItem('couponUsed')
        
        if(user){
            getCart(user.userId)
        }else{
            router.replace("/auth/login")
        }

        cart && setCart(cart);updatePrice(cart)
        user && setUser(user)
        selectedAddress && setSelectedAddress(selectedAddress)
        discount && setDiscount(Number(discount))
        couponUsed && setCouponUsed(couponUsed)

    },[])

    useEffect(()=>{
        if(totalPrice > 0){
            setDeliveryFee(50)
        }else{
            setDeliveryFee(0)
        }
    })

    props.getAmount(totalPrice + deliveryFee - discount)
    
    useEffect(()=>{
        if(props.cart || cart){
            updatePrice(props.cart || cart)
        }
    },[props.cart,cart]) 
 

    useEffect(()=>{
        if(props.pay?.mode === "prepaid"){
            checkout("prepaid")
        }
        if(props.pay?.mode === "cod"){
            checkout("cod")
        }
    },[props.pay])

    const getCart = (x) => {
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}cart/user/`+x).then(d=>d.json()).then(json=>{
            setCart(json.result.filter(e=>e.type === "cart"))
        })
    }
    const applyCoupon = (coupon) => {
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}order`).then(d=>d.json()).then(json=>{
            if(json.result.filter(e=>e.couponId === coupon._id).length === 0){
                if(localStorage.getItem("couponUsed") && localStorage.getItem("couponUsed") === couponUsed){
                    localStorage.removeItem("discount")
                    localStorage.removeItem("couponUsed")
                    setDiscount(0)
                    setCouponUsed(null)
                }else{
                    if(coupon.discountType === "Rs"){
                        setDiscount(coupon.discount)
                        localStorage.setItem("discount",coupon.discount)
                    }else{
                        var dis = ((coupon.discount/100)*totalPrice)
                        setDiscount(dis)
                        localStorage.setItem("discount",dis.toString())
                    }
                    setCouponUsed(coupon._id)
                    localStorage.setItem("couponUsed",coupon._id)
                }
            }else{
                alert("You cannot use this coupon.")
            }
        })
    }


    const updatePrice = (y) => {
        var data = y;
        var x = 0;
        data?.forEach(element => {
            x += Number(element.price) * element.qty;
        });
        
        // setCart(data)
        setTotalPrice(x);
    }
 
    const checkout = (x) => {
        // console.log(selectedAddress)
        var formData = new FormData();
        formData.append('cart',JSON.stringify(cart))
        formData.append('address',selectedAddress)
        formData.append('userId',user.userId)
        formData.append('totalAmount',(+totalPrice+deliveryFee-+discount).toString())
        formData.append('couponDiscount',discount.toString())
        formData.append('couponId',couponUsed)
        formData.append('customerPhone',"6209460626")
        formData.append('customerState',"Jharkhand")
        formData.append('orderType',x)
        x === "prepaid" && formData.append('transactionNo',props.pay.transactionNo)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}order`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            console.log(json)
            if(json.success === 1 && json.result){
                localStorage.removeItem("discount")
                localStorage.removeItem("couponUsed")
                cart.forEach(el=>{
                    
                    var formData1 = new FormData();
                    // formData1.append('userId',user.userId)
                    formData1.append('address',selectedAddress)
                    formData1.append('orderId',json.result._id)
                    formData1.append('orderStatus',"1")
                    
                    Object.keys(el).map((key,i)=>{
                        if(el[key] != null && el[key] != ''){
                            formData1.append(key,el[key]) 
                        }
                    })
                    
                    fetch(`${process.env.NEXT_PUBLIC_apiUrl}orderedproduct`,{
                        method:"POST",
                        body:formData1
                    }).then(d=>d.json()).then(json=>{ 
                        if(json.success === 1){
                            var stock = +el.stock - +el.qty
                            var popular = el.popular ? +el.popular + 1 : 1
                            var formData2 = new FormData();
                            formData2.append("stock",stock.toString())
                            formData2.append("popular",popular.toString())
                            console.log(stock,popular)
                            fetch(`${process.env.NEXT_PUBLIC_apiUrl}product/`+el.productId,{
                                method:"PATCH",
                                body:formData2
                            }).then(d=>d.json()).then(json=>{ 
                                // console.log(json)
                            }).catch(err=>console.log(err.message))
                            
                            fetch(`${process.env.NEXT_PUBLIC_apiUrl}cart/user/${user.userId}`,{method:"DELETE"}).then(d=>d.json()).then(json=>{
                             console.log(json)   
                            }).catch(err=>console.log(err.message))
                        }
                    }).catch(err=>console.log(err.message))
                })

                router.push({pathname:"/success",query:{
                    result:JSON.stringify(json.result),
                    user:JSON.stringify(user),
                }}) 
            }
        }) 
    }

    return <div>
        {/* <CheckoutHeader active={active} /> */}
        <Layout error={error} success={success}>
            <div className="my-4">
                <div className="text-center my-2">
                    <h1 className="display-6">Checkout</h1>
                    <p className="text-secondary">Have a coupon <a href="">click here</a> to enter </p>
                </div>
                <div className="w-full lg:w-5/6 mx-auto flex-row lg:flex">

                    {/* First column */}
                    <div className="w-full lg:w-2/3 lg:px-4">
                        <div className="py-4">
                            {props.children}
                        </div>
                    </div>
                    {/* SEcond Column */}
                    <div className="w-full lg:w-1/3">
                        <div className="container shadow p-4">
                            {active === 1?<>

                                <div className="text-lg font-medium flex items-center"> 
                                    <CouponSVG /> <span className="px-2">Apply Coupons</span> 
                                    <div className="ml-auto">
                                        <MaterialModal name="Apply Coupons" label={"Apply"} content={<> 
                                            <div className="input-group my-2">
                                                <input type="text" name="searchCoupon" id="searchCoupon" onChange={e=>setSearchCoupon(e.target.value)} placeholder="Search coupons ...." className="form-control" />
                                                <div className="input-group-text">
                                                    <input className="form-check-input" title="Show hidden coupons" name="hidden" type="checkbox" defaultChecked={hidden} onChange={e=>setHidden(e.target.checked)} id="showHidden" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 my-3">
                                                {props.coupon.
                                                filter(e=>e.hidden === hidden.toString() && e.couponName.toLowerCase().search(searchCoupon.toLowerCase()) != -1)
                                                ?.map((e,k)=>(
                                                    <div key={k} className={couponUsed != e._id?"border-2 bg-white shadow-sm my-1 py-2 px-2 rounded":"border bg-light shadow-sm my-1 py-2 px-2 rounded"}>
                                                        <div className="text-lg font-medium flex items-center"> 
                                                            <CouponSVG /> <span className="px-2">{e.couponName}</span> 
                                                            <div className="ml-auto">
                                                                <Button variant="text" color="primary" onClick={()=>applyCoupon(e)}>
                                                                    {couponUsed != e._id?"Apply":"Applied !"}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-secondary"> {e.couponDesc} </div>
                                                    </div>
                                                ))}
                                            </div>

                                                
                                        </>} />
                                    </div>
                                </div>
                            </>:<></>} 
                            
                            <div className="flex items-center font-normal text-lg my-2">
                                <img src="/assets/images/checkout/insurance.png" alt="Secured" className="w-8 mr-3" /> 100% SECURE
                            </div>
                            <div className="py-3">
                                <h3 className="text-lg font-medium">Price Details ( {cart?.length} Items ) </h3>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-md">Total MRP</h4>
                                    <div>Rs.{totalPrice}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-md">Delivery Fee</h4>
                                    <div>Rs. {deliveryFee} </div>
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
                                    <div>Rs. {totalPrice + deliveryFee - discount} </div>
                                </div>
                                {active == 1?<Link href="/checkout/address">
                                {/* <Button className="my-4" disabled={totalPrice == 0} fullWidth variant="contained" color="secondary">
                                    Place Order
                                </Button> */}
                                <button type="button" disabled={totalPrice <= 0} className={`w-full my-4 px-4 py-1 rounded text-xl ${totalPrice <= 0 ? 'bg-gray-400':'bg-gray-800 hover:bg-gray-50 hover:text-gray-800 border-gray-800'} text-gray-50 cursor-pointer border-2`}>
                                    Place Order
                                </button>
                                </Link>:<></>}

                                
                            </div>

                        </div>


                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-between my-10 lg:w-5/6 mx-auto">
                    <img src="/assets/images/checkout/payment-method_69e7ec.svg" alt="" className="w-full" />
                    {/* <div className="text-sm cursor-pointer">Need Help ? Contact Us</div> */}
                </div>
            </div>

        </Layout>
    </div>
}