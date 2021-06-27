import React, { useEffect, lazy, Suspense } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button'

import axios from 'axios';
import https from 'https'
const AccountPage = lazy(()=>import("../../component/pages/account"))

export default function OrdersPage() {
    
    const [orders,setOrders] = React.useState([])
    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            fetch(`https://api.treevesto.com:4000/orderedproduct/user/`+user.userId,{
                method:"GET",
                headers:{
                    "token":user.token
                }
            }).then(d=>d.json()).then(json=>{
                setOrders(json.result)
            })
        }
    },[])
    if (!isFront) return null;
    
    return <div>        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <AccountPage> 

                {orders.length > 0 ? orders.map((e,k)=>{
                    const color = e.orderStatus === "1"?"primary":e.orderStatus === "2"?"warning":e.orderStatus === "3"?"success":"danger"
                    return <div key={k} className={"flex items-center bg-white rounded border-2 border-"+color+" shadow-sm m-2 p-1"}>
                        <img src={e.image} alt="" width="50px" />
                        <div className="p-2">
                            <div> {e.name} | Size : {e.size} | Qty : {e.qty} </div>
                            <div> Rs. <span className="text-xl">{e.price}</span> </div>
                        </div>
                        <div className={"ml-auto self-end text-"+color+" font-medium text-xl px-3 py-1"}>
                            {color === "primary" && "Order Placed"}
                            {color === "warning" && "Order in Transit"}
                            {color === "success" && "Order Delivered"}
                            {color === "danger" && "Order Canceled"}
                        </div>
                    </div>
                }) :<div className="text-center">
                        <img src="/assets/images/no_orders.png" className="w-25 mx-auto"  alt="NO Orders"/>
                        <div className="font-medium text-md my-2">You haven't placed any order yet!</div>
                        <p className="text-secondary my-2">Order section is empty. After placing order, You can track them from here!</p>
                        <Link href="/">
                        {/* <Button variant="contained" color="secondary" className="w-1/3 my-4 mx-auto">
                        Start Shopping
                        </Button> */}
                        
                        <div className="px-4 py-2 my-4 mx-auto w-full md:w-1/3 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                            Start Shopping
                        </div>
                        </Link>
                    </div>
                }
            </AccountPage>        
        </Suspense>
    </div>
}
 