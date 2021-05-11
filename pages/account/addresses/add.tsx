import { TextField } from '@material-ui/core';
import React from 'react';
import { useEffect } from "react";
import AccountPage from "../../../component/pages/account";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

export default function AddAddresses(){
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm();
    const [userId,setUserId] = React.useState(null)
    const [addresses,setAddress] = React.useState(null)
    
    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            fetch(`https://api.treevesto.com:4000/user/`+user.userId).then(d=>d.json()).then(json=>{
                setUserId(json.result[0]._id)
                fetch(`https://api.treevesto.com:4000/address/user/`+json.result[0]._id).then(d=>d.json()).then(json=>{
                    console.log(json)
                })
            })
        }
    },[])

    
    const onSubmit = (data) => {
        // console.log(data)
        var formData = new FormData();
        formData.append('userId',userId)
        formData.append('name',data.name) 
        formData.append('phone',"+91"+data.phone) 
        formData.append('pincode',data.pincode) 
        formData.append('address',data.address+", "+data.locality)
        formData.append('state',data.state)
        formData.append('country',data.country)

        fetch(`https://api.treevesto.com:4000/address`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            router.replace("/account/addresses")
        })
    }
    
    return <div>
        <AccountPage>
        <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField error={errors.name} className="my-2" name="name" label="Name *" variant="outlined"
                    size="small" fullWidth inputRef={register({required:true})}
                    helperText={errors.name && (<span className="text-danger">Name is required</span>)}
                    />
                    
                    <TextField error={errors.phone} className="my-2" type="text" name="phone" label="Mobile *" variant="outlined" 
                    size="small" fullWidth inputRef={register({required:true,minLength:10,maxLength:10})}
                    helperText={errors.phone && (<span className="text-danger">Enter valid 10 digit mobile number</span>)} 
                    />
 
                    <h3 className="text-lg font-medium my-2">Address</h3>
                    <TextField error={errors.pincode} className="my-2" type="number" name="pincode" label="Pin Code *" variant="outlined" 
                    size="small" fullWidth  inputRef={register({required:true})}
                    helperText={errors.pincode && (<span className="text-danger">Pincode is required</span>)}
                    />
                    <TextField error={errors.address} className="my-2" name="address" label="Address ( House no, Building, Street, Area )*" 
                    variant="outlined" size="small" fullWidth  inputRef={register({required:true})}
                    helperText={errors.pincode && (<span className="text-danger">Address is required</span>)}
                    />
                    <TextField error={errors.locality} className="my-2" name="locality" label="Locality / Town *" variant="outlined" 
                    size="small" fullWidth 
                    />
                    <div className="flex items-center">
                        <TextField error={errors.state} className="my-2 px-1" name="state" label="State *" variant="outlined" size="small" 
                     fullWidth inputRef={register({required:true})}
                        helperText={errors.state && (<span className="text-danger">State is required</span>)}
                        />
                        <TextField error={errors.country} className="my-2 px-1" name="country" label="Country *" variant="outlined" 
                        size="small" fullWidth inputRef={register({required:true})}
                        helperText={errors.country && (<span className="text-danger">Country is required</span>)}
                        />
                    </div>

                    {/* <Button variant="contained" fullWidth type="submit" >
                    Add Address
                    </Button> */}
                    
                    <button type="submit" className="w-full my-4 px-4 py-1 rounded text-xl cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add Address
                    </button>

                </form>

        </AccountPage>
    </div>
}