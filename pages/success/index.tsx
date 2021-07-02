import React from 'react'
import { useRouter } from "next/router"
import { useEffect } from "react";
import Button from '@material-ui/core/Button'
import Link from 'next/link';

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
            fetch(`https://api.treevesto.com:4000/address/`+order.address).then(d=>d.json()).then(json=>{ 
                console.log(json)
                if(json.success == 1){
                    setAddress(json.result)
                } 
            })
        }else{
            // router.replace('/')
        }

        
    },[router.query])

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
        
        <div className="text-center" id="emailContent">
            <img src="/assets/icons/congratulations.png" width="120px" className="mx-auto" alt="congratulations" />
            <div className="display-5">
                {/* <span className="text-pinck-400">Congratulations ! </span>  */}
                <span className="text-success font-medium">Order Confirmed</span> 
            </div>
            <div className="text-secondary">Your Order is confirmed. You will receive an order confirmation email/SMS shortly with expected delivery date for your items.</div>
            <Button variant="outlined" color="secondary" onClick={()=>router.replace('/')}>
                Continue Shopping
            </Button>
            <Button className="m-2" variant="contained" color="secondary" onClick={()=>router.replace('/account/orders')}>
              My Orders
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full md:w-3/5 mx-auto">
                <div className="text-left">
                    <div className="text-2xl my-3 py-2 border-b-2">Items in Order</div>
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
                <div className="text-right"> 
                    <div className="text-2xl my-3 py-2 border-b-2">Delivery Details</div>
                    <div>
                        <div className="text-lg"> {address?.name} {address?.phone} </div>
                        <div className="text-secondary"> {address?.address} </div>
                        <div className="text-secondary"> {address?.state} {address?.city} - {address?.pincode} </div>
                    </div>
                </div>
            </div>

            <div className="text-right m-2 mt-6 text-primary">
                <Link href={{pathname:"/success/invoice",query:{result:router.query.result,address:JSON.stringify(address)}}}>generate invoice</Link>
            </div>





        </div>

    </div>
}