import React, { useEffect } from 'react' 
import Link from 'next/link';
import Checkout from '../../../component/pages/checkout'
import Button from '@material-ui/core/Button'

declare var Razorpay:any;
export default function PaymentPage() {
    let rzp1;

    const [orderId,setOrderId] = React.useState(null)
    const [totalAmt,setTotalAmt] = React.useState(0)

    var options = {
        key: "rzp_test_HgpilQ93SsfaNu",amount: totalAmt,currency: "INR",name: "Acme Corp",
        description: "Test Transaction",image: "https://example.com/your_logo",order_id: orderId, 
        handler: function (response){
            setPay({mode:"Online",transactionNo:response.razorpay_payment_id})
        },
        prefill: {name: "Gaurav Kumar",email: "gaurav.kumar@example.com",contact: "9999999999"},
        notes: {address: "Razorpay Corporate Office"},
        theme: {color: "#3399cc"}
    };
    
    useEffect(()=>{
        if(totalAmt > 0){
            var formData = new FormData();
            formData.append("amount",totalAmt.toString())
            fetch(`https://api.treevesto.com:4000/checkout`,{
                method:"POST",
                body:formData, 
            }).then(d=>d.json()).then(json=>{
                // console.log(json)
                setOrderId(json.result.id)
            }).catch(err=>console.log(err))
        }
    },[totalAmt])
    
    useEffect(()=>{
        if(orderId){
            rzp1 = new Razorpay(options);
        }
    },[orderId])

 

    const [pay,setPay] = React.useState(null);

    const payNow = () => {
        rzp1.open();
    }
    return <div>
        <Checkout pay={pay} getAmount={(amt)=>setTotalAmt(amt*100)}>
             

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
                <button type="button" onClick={payNow} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                Pay Now
                </button>
                <button type="submit" onClick={()=>setPay({mode:"COD"})} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                Cash on Delivery
                </button>
            </div>

        </Checkout>
    </div>
}