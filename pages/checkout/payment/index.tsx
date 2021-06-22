import React, { useEffect, lazy, Suspense } from 'react' 
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import { Card, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
const Checkout = lazy(()=>import('../../../component/pages/checkout'))
 

declare var Razorpay:any;
export default function PaymentPage() {
    let rzp1; 
    
    const [paymentMethods,setMethods] = React.useState(null)
    const [selectedMethods,setSelectedMethods] = React.useState('card')
    const [totalAmt,setTotalAmt] = React.useState(0)
    const [isFront, setIsFront] = React.useState(false);

    const [values,setValues] = React.useState({
        contact:null,email:null,
        vpa:null,
        cardName:null,
        cardNumber:null,
        cardCVV:null,
        cardEXM:null,
        cardEXY:null,
        bank:null,
        wallet:null
    })

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }
    

    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        rzp1 = new Razorpay({key:"rzp_test_HgpilQ93SsfaNu"});
        
        rzp1.once('ready', function(response) {
            setMethods(response.methods);
        }) 
    },[])
     
    
    const [pay,setPay] = React.useState(null);

    const payNow = async (method,obj) => {

        if(!values.contact){
            alert('Your phone number is required'); 
            return
        }
        if(!values.email) {
            alert('Your email address is required');
            return
        }
 
        var formData = new FormData();
        formData.append("amount",totalAmt.toString())
		const data = await fetch(`https://api.treevesto.com:4000/checkout`,{
            method:"POST",
            body:formData, 
        }).then(d=>d.json())
        var options = {
            amount: totalAmt,currency: "INR",
            email: values.email, contact: values.contact,
            description: "Test Transaction",order_id: data.result.id,  
            method,...obj
        };
        
        rzp1 = new Razorpay({key:"rzp_test_HgpilQ93SsfaNu"});
        rzp1.createPayment(options);

        rzp1.on('payment.success', function(response) {
            setPay({mode:"Online",transactionNo:response.razorpay_payment_id})
        });

        rzp1.on('payment.error', function(resp){
            alert(resp.error.description)}
        );
 
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
                        {selectedMethods != "cod" && <>
                            <TextField type="text" name="contact" label="Phone Number" onChange={handleChange} variant="outlined" fullWidth size="small" className="my-2"/>
                            <TextField name="email" label="Email Address" onChange={handleChange} variant="outlined" fullWidth size="small" className="my-2"/>
                        </>}

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
                                    <TextField name="vpa" label="vpa" onChange={handleChange} variant="outlined" fullWidth size="small" helperText="johndoe@somebank" className="my-2"/>
                                    <button type="button" onClick={()=>payNow(selectedMethods,{upi:{vpa: values.vpa,flow: 'collect'}})} 
                                    className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'card' && <div className="text-left p-3">
                                    <form>
                                        {/* <h2 className="text-lg"> Credit/Debit Card</h2> */}
                                        <TextField name="cardName" defaultValue="Rahul Kumar" onChange={handleChange} label="Card Holder Name" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <TextField name="cardNumber" defaultValue="4111 1111 1111 1111" onChange={handleChange} label="Card Number" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <div className="row">
                                            <div className="col-6">
                                                <TextField name="cardCVV" defaultValue="590" onChange={handleChange} label="CVV" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                            <div className="col-3">
                                                <TextField name="cardEXM" defaultValue="11" onChange={handleChange} label="M" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                            <div className="col-3">
                                                <TextField name="cardEXY" defaultValue="26" onChange={handleChange} label="Y" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                        </div>
                                        <button type="button" onClick={()=>payNow(selectedMethods,{    
                                            'card[name]': values.cardName,
                                            'card[number]': values.cardNumber,
                                            'card[cvv]': values.cardCVV,
                                            'card[expiry_month]': values.cardEXM,
                                            'card[expiry_year]': values.cardEXY
                                        })} 
                                        className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                        Pay Now
                                        </button>
                                    </form>
                                
                                </div>}
                                {selectedMethods === 'netbanking' && <div className="text-left p-3">
                                     
                                    <FormControl variant="outlined" fullWidth size="small" className="my-2">
                                        <InputLabel id="netbankingLabel">Bank</InputLabel>
                                        <Select labelId="netbankingLabel" name="bank" label="Bank" onChange={handleChange} >
                                        <MenuItem value="">
                                            <em>Select Bank</em>
                                        </MenuItem>
                                        {paymentMethods && Object.keys(paymentMethods?.netbanking).map((e,k)=>(
                                            <MenuItem key={k} value={e}>{e}</MenuItem>

                                        ))}
                                        </Select>
                                    </FormControl>
                                    
                                    <button type="button" onClick={()=>payNow(selectedMethods,{bank:values.bank})} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'wallet' && <div className="p-3">
                                    <div className="grid grid-cols-4 gap-2">
                                        <FormControl component="fieldset">
                                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                                            <RadioGroup aria-label="wallet" name="wallet" defaultValue={values.wallet} onChange={handleChange} >
                                                {paymentMethods && Object.keys(paymentMethods.wallet).map((e,k)=>(
                                                    <FormControlLabel value={e} control={<Radio />} label={e} />        
                                                ))}
                                            </RadioGroup>
                                        </FormControl>

                                    </div>
                                    
                                    <button type="button" onClick={()=>payNow(selectedMethods,{wallet: values.wallet})} className="mx-2 px-4 py-1 rounded cursor-pointer border-2 border-green-800 bg-green-800 text-green-50 hover:bg-green-50 hover:text-green-800">
                                    Continue
                                    </button>
                                </div>}
                                {selectedMethods === 'cod' && <>
                                    <button type="submit" onClick={()=>setPay({mode:"COD"})} className="m-2 px-4 py-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                                    Place Order
                                    </button>
                                
                                </>}

                            </div>
                        </div>

                    </div>

                </div>

            </Checkout>
        </Suspense>
    </div>
}