import React from 'react'
import Link from 'next/link';
import Checkout from '../../../component/pages/checkout'
import Button from '@material-ui/core/Button'

export default function PaymentPage() {
    const [pay,setPay] = React.useState(false);
    return <div>
        <Checkout pay={pay}>
            
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb items-center">
                    <li className="breadcrumb-item"><Link href="/checkout/cart">Bag</Link></li>
                    <li className="breadcrumb-item"><Link href="/checkout/address">Shipping</Link></li>
                    <li className="breadcrumb-item active text-2xl" aria-current="page">Payment</li>
                </ol>
            </nav>
            
            <div className="text-right">

                <img src="/assets/images/payment.jpeg" alt="" className="w-2/3" />
                {/* <Button variant="contained" color="secondary" onClick={()=>setPay(true)}>
                  Cash on Delivery
                </Button> */}
                <button type="submit" className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                Pay Now
                </button>
                <button type="submit" onClick={()=>setPay(true)} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                Cash on Delivery
                </button>
            </div>

        </Checkout>
    </div>
}