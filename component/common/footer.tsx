import React from "react";
import Link from 'next/link';

import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button'

export default function Footer(){
    const router = useRouter();
    const [showMore,setShowMore] = React.useState(true)
    
    if(router.pathname === "/"){
        return <div className="container-fluid bg-light border-t-2">
            {showMore ? <>
                <div className="container text-dark p-4">
                    <div className="row">
                        <div className="col-md-3">
                            <h3 className="my-2 text-xl">Order</h3>
                            <Link href="/account/overview"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">My Account</div></Link>
                            <Link href="/checkout/cart"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">View Bag</div></Link>
                            <Link href="/account/orders"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Track Orders</div></Link>
                            <Link href="/admin"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Admin</div></Link>
                            <Link href="/"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Privacy Policy</div></Link>
                            <Link href="/"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Cookie Policy</div></Link>
                            
                        </div>
                        <div className="col-md-3">
                            <h3 className="my-2 text-xl">USEFULL LINKS</h3>
                            <div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Contact Us</div>
                            <div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">FAQ</div>
                            <Link href="/404"><div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">404 page</div></Link>
                            <div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Privacy Policy</div>
                            <div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">Terms of Use</div>
                            <div className="cursor-pointer text-sm text-gray-800 hover:text-blue-500">T&C</div>
                        </div>
                        <div className="col-md-3">
                            <div className="my-2 text-xl">Registered Office Address</div>
                            <div className="text-sm text-gray-800">Plot no 10</div>
                            <div className="text-sm text-gray-800">Ghorabandha,</div>
                            <div className="text-sm text-gray-800">Telco,</div>
                            <div className="text-sm text-gray-800">Jamshedpur, Jharkhand - 831004</div>
                        </div>
                    </div>
                </div>
            </>:<>
                <div className="text-right my-3 p-2">
                    <Button variant="text" color="default" onClick={e=>setShowMore(true)} >
                    Show More
                    </Button>
                </div>
            
            </>}
            
        </div>

    }
    return <></>
}