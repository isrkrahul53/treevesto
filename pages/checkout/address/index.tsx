import React, { useEffect } from 'react'
import Link from 'next/link';
import Checkout from '../../../component/pages/checkout'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
export default function AddressPage(props) {

    const router = useRouter();

    const [selected,setSelected] = React.useState(null);
    const [userAddress,setUserAddress] = React.useState([]);
    // Checkout
    const [address,setAddress] = React.useState({
        userId:"", 
        name:"",
        phone:"",
        pincode:"",
        address:"",
        locality:"",
        state:"",
        country:""
    }); 

    useEffect(()=>{
        getUserAddress()
    },[])
    
    const getUserAddress = () => {
        if(localStorage.getItem('user')){
            var data = JSON.parse(localStorage.getItem('user')) 
            setAddress({...address,userId:data.userId,name:data.name,phone:data.phone})
            fetch(`http://treevesto55.herokuapp.com/address/user/`+data.userId).then(d=>d.json()).then(json=>{
                setUserAddress(json.result) 
            })
        }else{
            router.replace("/auth/login")
        }

    }

    const deleteAddress = (id) => {
        if(confirm('Are you sure to delete this address')){
            fetch(`http://treevesto55.herokuapp.com/address/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                getUserAddress();
            })
        }
    }

    const handleSubmit = () => {
        
        var formData = new FormData();
        formData.append('userId',address.userId)
        formData.append('name',address.name) 
        formData.append('phone',address.phone) 
        formData.append('pincode',address.pincode) 
        formData.append('address',address.address+", "+address.locality)
        formData.append('state',address.state)
        formData.append('country',address.country)

        fetch(`http://treevesto55.herokuapp.com/address`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            getUserAddress();
            router.replace(router.asPath)
        })
    }

    return <div>
        <Checkout>

            <div className="border bg-white shadow-sm p-4">
                <div className={selected?"text-right my-2":"text-right my-2 d-none"}>
                    <Button disabled={!selected} variant="contained" color="secondary" onClick={e=>router.push("/checkout/payment")}>
                    Continue
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1">
                    {userAddress?.map((el,key)=>{
                        return <div key={key} onClick={()=>{setSelected(el._id);localStorage.setItem('selectedAddress',el._id)}} className={selected==el._id?"border cursor-pointer my-1 shadow-sm p-2 bg-pink-100":"border cursor-pointer my-1 shadow-sm p-2"}>
                            <span onClick={()=>deleteAddress(el._id)} className="cursor-pointer text-danger float-right text-xl">&times;</span>
                            <span>{key+1}. {el.name} </span>
                            <br/>
                            <span>{el.phone}</span>
                            <span>{el.address}</span>
                            <span>{el.pincode}</span>
                        </div>
                    })} 
                </div>
                <h3 className="text-lg font-medium my-2">Contact Details</h3>
                
                <TextField className="my-2" id="name" label="Name *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.name} onChange={(e)=>{setAddress({...address,name:e.target.value})}}
                />
                <TextField className="my-2" type="text" id="phone" label="Mobile *" variant="outlined" 
                size="small" color="secondary" fullWidth 
                defaultValue={address.phone} onChange={(e)=>{setAddress({...address,phone:e.target.value})}}
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
 