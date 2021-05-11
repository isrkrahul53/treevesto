import React from 'react'
import { useRouter } from "next/router"
import { useEffect } from "react";
import Button from '@material-ui/core/Button'

declare var $:any;
export default function SuccessPage(){
    const router = useRouter();

    const [cart,setCart] = React.useState(null)
    const [user,setUser] = React.useState(null)
    const [address,setAddress] = React.useState(null)
    const [oid,setOID] = React.useState(null)
    const [emailContent,setEmailContent] = React.useState(null)

    useEffect(()=>{
        if(router.query.result){
            var data = router.query;
            var order = JSON.parse(router.query.result.toString());
            setCart(JSON.parse(order.cart.toString()))
            setUser(JSON.parse(data.user.toString()))
            setOID(order._id)
            console.log(order.address)
            fetch(`https://api.treevesto.com:4000/address/id/`+order.address).then(d=>d.json()).then(json=>{ 
                console.log(json)
                if(json.success == 1){
                    setAddress(json.result)
                } 
            })

        }else{
            router.replace('/')
        }

        
    },[])

    useEffect(()=>{
        if(address){
            $(document).ready(()=>{
                var formData = new FormData();
                formData.append("emailContent",$("#emailContent").html())
                fetch(`https://api.treevesto.com:4000/order/`+oid,{
                    method:"PATCH",
                    body:formData
                }).then(d=>d.json()).then(json=>{ 
                    console.log(json)
                })
            })
        }
    },[address])


    return <div className="p-8">
        
        <div className="" id="emailContent">
            <div className="display-5">
                <span className="text-pink-400">Congratulations ! </span> 
                <span className="">Order Placed</span> 
            </div>
            <div className="text-xl text-secondary my-1">Order ID : {oid}</div>
            <div className="text-secondary">Your order is currently being processed. As the products in your 
            orders are shipped you will be notified and receive an email. You can track, cancel or return your 
            orders from Treevesto.</div>
            <Button className="my-2" variant="contained" color="secondary">
              My Orders
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <div className="text-2xl my-3 py-2 border-b-2">Orders</div>
                    {cart?.map((el,key)=>(
                        <div key={key} className="flex items-center">
                            <img src={el.image} alt="" width="40px" className="shadow-sm rounded mr-2 my-2" />
                            {/* <div className="p-4 bg-light border shadow-sm rounded mr-2"></div> */}
                            <div>
                                <div>{el.name}</div>
                                <div>Rs. {el.price} Qty : {el.qty} Size : {el.size} </div> 
                            </div>
                        </div>
                    ))}
                </div>
                <div> 
                    <div className="text-2xl my-3 py-2 border-b-2">Delivery Details</div>
                    <div>
                        <div className="text-lg"> {address?.name} {address?.phone} </div>
                        <div className="text-secondary"> {address?.address} </div>
                        <div className="text-secondary"> {address?.state} {address?.city} - {address?.pincode} </div>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <Button variant="contained" color="secondary" onClick={()=>router.replace('/')}>
                  Go to homepage
                </Button>
            </div>





        </div>

    </div>
}