import React, { useEffect, lazy, Suspense } from 'react' 
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import { Card, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
const Checkout = lazy(()=>import('../../../component/pages/checkout'))
import PaymentMethodSlider from '../../../component/react/paymentMethodSlider'  
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import NearMeIcon from '@material-ui/icons/NearMe';

declare var Razorpay:any;
export default function PaymentPage() {
    let rzp1; 
    
    const [paymentMethods,setMethods] = React.useState(null)
    const [selectedMethods,setSelectedMethods] = React.useState('card')
    const [selectedUPI,setSelectedUPI] = React.useState('google')
    const [totalAmt,setTotalAmt] = React.useState(0)
    const [isFront, setIsFront] = React.useState(false);

    const [values,setValues] = React.useState({
        // contact:null,email:null,
        vpa:null,
        googlepayupioptions:"@okhdfcbank",
        cardName:"Rahul",
        cardNumber:"4111 1111 1111 1111",
        cardCVV:"590",
        cardEXM:"11",
        cardEXY:"26",
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
        var user = JSON.parse(localStorage.getItem('user'))
 
 
        var formData = new FormData();
        formData.append("amount",totalAmt.toString())
		const data = await fetch(`https://api.treevesto.com:4000/checkout`,{
            method:"POST",
            body:formData, 
        }).then(d=>d.json())
        var options = {
            amount: totalAmt,currency: "INR",
            email: user.email, contact: user.phone,
            description: "Test Transaction",order_id: data.result.id,  
            method,...obj
        };
        
        rzp1 = new Razorpay({key:"rzp_test_HgpilQ93SsfaNu"});
        rzp1.createPayment(options);

        rzp1.on('payment.success', function(response) {
            setPay({mode:"prepaid",transactionNo:response.razorpay_payment_id})
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
                        
                        {/* {selectedMethods != "cod" && <>
                            <TextField type="text" name="contact" label="Phone Number" onChange={handleChange} variant="outlined" fullWidth size="small" className="my-2"/>
                            <TextField name="email" label="Email Address" onChange={handleChange} variant="outlined" fullWidth size="small" className="my-2"/>
                        </>} */}

                        <div className="row my-2">
                            <div className="md:hidden fixed left-0 bottom-0 w-full bg-white z-50 shadow border-t-2 shadow">
                                <PaymentMethodSlider value={selectedMethods} setSelected={(e,v)=>setSelectedMethods(v)} />

                            </div>
                            <List className="col-md-4 hidden md:block py-2">
                                <ListItem button selected={selectedMethods === "upi"} className="p-3" onClick={e=>setSelectedMethods('upi')}> <NearMeIcon className="mr-1" /> Pay using UPI </ListItem>
                                <ListItem button selected={selectedMethods === "card"} className="p-3" onClick={e=>setSelectedMethods('card')}> <CreditCardIcon className="mr-1" /> Credit/Debit Card </ListItem>
                                <ListItem button selected={selectedMethods === "netbanking"} className="p-3" onClick={e=>setSelectedMethods('netbanking')}> <AccountBalanceIcon className="mr-1" /> NetBanking </ListItem>
                                <ListItem button selected={selectedMethods === "wallet"} className="p-3" onClick={e=>setSelectedMethods('wallet')}> <AccountBalanceWalletIcon className="mr-1" /> Wallet </ListItem>
                                <ListItem button selected={selectedMethods === "cod"} className="p-3" onClick={e=>setSelectedMethods('cod')}> <LocalShippingIcon className="mr-1" /> Cash On Delivery </ListItem>
                            </List>
                            <div className="col-md-8 p-0 border">

                                {selectedMethods === 'upi' && <div className="p-3">

                                    <div className="grid grid-cols-1 gap-2">
                                        <FormControl component="fieldset">
                                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                                            <RadioGroup aria-label="upi" name="upi" defaultValue={selectedUPI} onChange={e=>setSelectedUPI(e.target.value)} >
                                                <FormControlLabel value={"google"} control={<Radio />} label={<img src="/assets/images/checkout/gpay.jpg" alt="Googlepay" className="w-20" />} />
                                                {selectedUPI === "google" && <>
                                                    <div className="input-group my-4">
                                                        <input type="text" name="vpa" onChange={handleChange} className="form-control" placeholder="Enter UPI Id here" />
                                                        <div className="input-group-append">
                                                            <select name="googlepayupioptions" defaultValue={values.googlepayupioptions} onChange={handleChange} className="form-select">
                                                                <option value="@okhdfcbank">@okhdfcbank</option>
                                                                <option value="@okicici">@okicici</option>
                                                                <option value="@okaxis">@okaxis</option>
                                                                <option value="@oksbi">@oksbi</option>
                                                            </select>    
                                                        </div>
                                                    </div>
                                                    <Button onClick={()=>payNow(selectedMethods,{upi:{vpa: values.vpa+values.googlepayupioptions,flow: 'collect'}})} variant="contained" color="primary">
                                                    Continue
                                                    </Button>
                                                
                                                </>}
                                                <FormControlLabel value={"upi"} control={<Radio />} label={<img src="/assets/images/checkout/upi.png" alt="Googlepay" className="w-20" />} />
                                                {selectedUPI === "upi" && <>
                                                    <TextField name="vpa" label="vpa" onChange={handleChange} variant="outlined" fullWidth size="small" helperText="johndoe@somebank" className="my-2"/>
                                                    <Button onClick={()=>payNow(selectedMethods,{upi:{vpa: values.vpa,flow: 'collect'}})} variant="contained" color="primary">
                                                    Continue
                                                    </Button>
                                                
                                                </>}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>

                                </div>}
                                {selectedMethods === 'card' && <div className="text-left p-3">
                                    <form>
                                        {/* <h2 className="text-lg"> Credit/Debit Card</h2> */}

                                        <TextField name="cardName" defaultValue={values.cardName} onChange={handleChange} label="Card Holder Name" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <TextField name="cardNumber" defaultValue={values.cardNumber} onChange={handleChange} label="Card Number" variant="outlined" fullWidth size="small" className="my-2"/>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <TextField name="cardCVV"  defaultValue={values.cardCVV} onChange={handleChange} label="CVV" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                            <div className="col-6 col-md-3">
                                                <TextField name="cardEXM"  defaultValue={values.cardEXM} onChange={handleChange} label="M" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                            <div className="col-6 col-md-3">
                                                <TextField name="cardEXY"  defaultValue={values.cardEXY} onChange={handleChange} label="Y" variant="outlined" fullWidth size="small" className="my-2"/>

                                            </div>
                                        </div>
                                        <Button type="button" onClick={()=>payNow(selectedMethods,{    
                                            'card[name]': values.cardName,
                                            'card[number]': values.cardNumber,
                                            'card[cvv]': values.cardCVV,
                                            'card[expiry_month]': values.cardEXM,
                                            'card[expiry_year]': values.cardEXY
                                        })} variant="contained" color="primary">
                                        Pay Now
                                        </Button>
                                        
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
                                            <MenuItem key={k} value={e}> {paymentMethods.netbanking[e]} </MenuItem>

                                        ))}
                                        </Select>
                                    </FormControl>
                                    
                                    <Button onClick={()=>payNow(selectedMethods,{bank:values.bank})} variant="contained" color="primary">
                                    Continue
                                    </Button>
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
                                    
                                    <Button onClick={()=>payNow(selectedMethods,{wallet: values.wallet})} variant="contained" color="primary" >
                                    Continue
                                    </Button>
                                </div>}
                                {selectedMethods === 'cod' && <>
                                    <div className="w-2/3 mx-auto">
                                        <img src="/assets/images/checkout/cod.jpg" alt="Cash on delivery" className="w-full" />
                                        <Button type="submit" onClick={()=>setPay({mode:"cod"})} variant="contained" color="primary" fullWidth className="my-4">
                                        Place Order
                                        </Button>
                                    </div>
                                
                                </>}

                            </div>
                        </div>

                    </div>

                </div>

            </Checkout>
        </Suspense>
    </div>
}