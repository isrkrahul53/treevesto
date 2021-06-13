import React, { useEffect, lazy, Suspense } from 'react' 
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import { Card, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
const Checkout = lazy(()=>import('../../../component/pages/checkout'))

import {useForm} from 'react-hook-form';

declare var Razorpay:any;
export default function PaymentPage() {
    let rzp1;

    const {register,handleSubmit,errors} = useForm();

    const [orderId,setOrderId] = React.useState(null)
    const [paymentMethods,setMethods] = React.useState(null)
    const [selectedMethods,setSelectedMethods] = React.useState('card')
    const [totalAmt,setTotalAmt] = React.useState(0)
    const [isFront, setIsFront] = React.useState(false);

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
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
    },[])


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
            
            rzp1.once('ready', function(response) {
                setMethods(response.methods);
            })
        }
    },[orderId])

    console.log(paymentMethods)


    const [pay,setPay] = React.useState(null);

    const payNow = () => {
        // rzp1.open();
    }

    const payWithUPI = () => {
        
    }

    if (!isFront) return null;

    return <div>
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <Checkout pay={pay} getAmount={(amt)=>setTotalAmt(amt*100)}>
                
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb items-center">
                            <li className="breadcrumb-item"><Link href="/checkout/cart">Bag</Link></li>
                            <li className="breadcrumb-item"><Link href="/checkout/address">Shipping</Link></li>
                            <li className="breadcrumb-item active text-2xl" aria-current="page">Payment</li>
                        </ol>
                    </nav>
                    
                    <div className="text-right">

                        {/* <img src="/assets/images/payment.jpeg" alt="" className="w-2/3" /> */}
                        {/* <Button variant="contained" color="secondary" onClick={()=>setPay(true)}>
                        Cash on Delivery
                        </Button> */}

                        <div className="row my-2">
                            <List className="col-4 p-0">
                                <ListItem button selected={selectedMethods === "upi"} className="p-3" onClick={e=>setSelectedMethods('upi')}> Pay using UPI </ListItem>
                                <ListItem button selected={selectedMethods === "card"} className="p-3" onClick={e=>setSelectedMethods('card')}> Credit/Debit Card </ListItem>
                                <ListItem button selected={selectedMethods === "netbanking"} className="p-3" onClick={e=>setSelectedMethods('netbanking')}> NetBanking </ListItem>
                                <ListItem button selected={selectedMethods === "wallet"} className="p-3" onClick={e=>setSelectedMethods('wallet')}> Wallet </ListItem>
                                <ListItem button selected={selectedMethods === "cod"} className="p-3" onClick={e=>setSelectedMethods('cod')}> Cash On Delivery </ListItem>
                            </List>
                            <div className="col-8 p-0 border">

                                {selectedMethods === 'upi' && <div className="p-3">
                                    <TextField id="upi" label="upi" variant="outlined" fullWidth size="small" helperText="johndoe@somebank" className="my-2"/>
                                    <button type="button" onClick={payWithUPI} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'card' && <div className="text-left p-3">
                                    <form>
                                        {/* <h2 className="text-lg"> Credit/Debit Card</h2> */}
                                        <TextField id="card[name]" label="Card Holder Name" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <TextField id="card[number]" label="Card Number" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <div className="row">
                                            <div className="col-6">
                                                <TextField id="card[cvv]" label="CVV" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                            <div className="col-6">
                                                <TextField id="card[cvv]" label="CVV" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                        </div>
                                        <button type="button" onClick={payNow} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                        Pay Now
                                        </button>
                                    </form>
                                
                                </div>}
                                {selectedMethods === 'netbanking' && <div className="text-left p-3">
                                     
                                    <FormControl variant="outlined" fullWidth size="small" className="my-2">
                                        <InputLabel id="netbankingLabel">Bank</InputLabel>
                                        <Select labelId="netbankingLabel" id="netbanking" label="Bank" inputRef={register({required:true})}>
                                        <MenuItem value="">
                                            <em>Select Bank</em>
                                        </MenuItem>
                                        {paymentMethods && Object.keys(paymentMethods?.netbanking).map((e,k)=>(
                                            <MenuItem key={k} value={paymentMethods.netbanking[e]}>{e}</MenuItem>

                                        ))}
                                        </Select>
                                    </FormControl>
                                    
                                    <button type="button" onClick={payNow} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'wallet' && <div className="p-3">
                                    <div className="grid grid-cols-4 gap-2">
                                        <FormControl component="fieldset">
                                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                                            <RadioGroup aria-label="wallet" name="wallet">
                                                {paymentMethods && Object.keys(paymentMethods.wallet).map((e,k)=>(
                                                    <FormControlLabel value={e} control={<Radio />} label={e} />        
                                                ))}
                                            </RadioGroup>
                                        </FormControl>

                                    </div>
                                    
                                    <button type="button" onClick={payNow} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'cod' && <></>}

                            </div>
                        </div>

                        {/* <button type="submit" onClick={()=>setPay({mode:"COD"})} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Cash on Delivery
                        </button> */}
                    </div>

                </div>

            </Checkout>
        </Suspense>
    </div>
}