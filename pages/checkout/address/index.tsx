import React from 'react'
import Link from 'next/link';
import Checkout from '../../../component/pages/checkout'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
export default function AddressPage() {

    // Checkout
    const [address,setAddress] = React.useState({
        userId:"",
        name:"",
        mobile:"",
        pincode:"",
        address:"",
        locality:"",
        state:"",
        country:""
    });

    const [error,setError] = React.useState({
        userId:0,
        name:0,
        mobile:0,
        pincode:0,
        address:0,
        locality:0,
        state:0,
        country:0
    })


    const handleSubmit = () => {
        var data = [];
        if(localStorage.getItem('address')){
            data = JSON.parse(localStorage.getItem('address'));
        }
        data.push(address)
        // localStorage.setItem('address',JSON.stringify(data))
        Object.keys(address).forEach((el,key)=>{ if(address[el]){setError({...error,[address[el]]:1})} })
    }

    return <div>
        <Checkout>

            <div className="border bg-white shadow-sm p-4">
                <h3 className="text-lg font-medium my-2">Contact Details</h3>
                
                <TextField className="my-2" id="name" label="Name *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.name} onChange={(e)=>{setAddress({...address,name:e.target.value})}}
                />
                <TextField className="my-2" type="number" id="mobile" label="Mobile *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.mobile} onChange={(e)=>{setAddress({...address,mobile:e.target.value})}}
                />

                <h3 className="text-lg font-medium my-2">Address</h3>
                <TextField className="my-2" type="number" id="pincode" label="Pin Code *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.pincode} onChange={(e)=>{setAddress({...address,pincode:e.target.value})}}
                />
                <TextField className="my-2" id="address" label="Address ( House no, Building, Street, Area )*" 
                variant="outlined" size="small" color="secondary" fullWidth 
                defaultValue={address.address} onChange={(e)=>{setAddress({...address,address:e.target.value})}}
                />
                <TextField className="my-2" id="locality" label="Locality / Town *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.locality} onChange={(e)=>{setAddress({...address,locality:e.target.value})}}
                />
                <div className="flex items-center">
                    <TextField className="my-2 px-1" id="state" label="State *" variant="outlined" size="small" 
                    color="secondary" fullWidth 
                    defaultValue={address.state} onChange={(e)=>{setAddress({...address,state:e.target.value})}}
                    />
                    <TextField className="my-2 px-1" id="country" label="Country *" variant="outlined" 
                    size="small" color="secondary" fullWidth 
                    defaultValue={address.country} onChange={(e)=>{setAddress({...address,country:e.target.value})}}
                    />
                </div>

                <Button variant="contained" color="secondary" fullWidth onClick={handleSubmit} >
                  Add Address
                </Button>
 
            </div>
            
        </Checkout>
    </div>
}