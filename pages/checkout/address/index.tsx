import React, { useEffect, lazy, Suspense } from 'react'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router';

import axios from 'axios';
import https from 'https'

import { useForm } from "react-hook-form";


const Checkout = lazy(()=>import('../../../component/pages/checkout'))



export default function AddressPage(props) {

    const { register, handleSubmit, errors } = useForm();

    const router = useRouter();

    const [selected,setSelected] = React.useState(null);
    const [userAddress,setUserAddress] = React.useState([]);
    const [addAddr,setAddAddr] = React.useState(true)
    const [totalAmt,setTotalAmt] = React.useState(0)
    const [isFront, setIsFront] = React.useState(false);

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
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        getUserAddress()
    },[])
    
    const getUserAddress = () => {
        if(localStorage.getItem('user')){
            var data = JSON.parse(localStorage.getItem('user')) 
            setAddress({...address,userId:data.userId,name:data.name,phone:data.phone})
            // fetch(`${process.env.NEXT_PUBLIC_apiUrl}address/user/`+data.userId).then(d=>d.json()).then(json=>{
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}address`).then(d=>d.json()).then(json=>{
                setUserAddress(json.result) 
                json.result.length > 0 && setAddAddr(false)
                console.log(json.result)
            })
        }else{
            router.replace("/auth/login")
        }

    }

    const deleteAddress = (id) => {
        if(confirm('Are you sure to delete this address')){
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}address/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                setSelected(null)
                getUserAddress();
            })
        }
    }

    const onSubmit = (data) => {
        // console.log(data)
        var user = JSON.parse(localStorage.getItem('user')) 
        var formData = new FormData();
        formData.append('userId',address.userId)
        formData.append('name',address.name) 
        formData.append('phone',address.phone) 
        formData.append('pincode',address.pincode) 
        formData.append('address',address.address+", "+address.locality)
        formData.append('state',address.state)
        formData.append('country',address.country)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}address`,{
            method:"POST",
            body:formData,
            headers:{
                "token":user.token
            }
        }).then(d=>d.json()).then(json=>{ 
            getUserAddress();
            router.replace(router.asPath)
        })
    }
    if (!isFront) return null;

    return <div>
    <Suspense fallback={<div className="text-center py-10">
          <div className="spinner-border text-primary"></div>
      </div>}>
        <Checkout coupon={props.coupon} getAmount={(amt)=>setTotalAmt(amt)}>
            
            <div className="container-fluid">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb items-center">
                        <li className="breadcrumb-item"><a href="/checkout/cart">Bag</a></li>
                        <li className="breadcrumb-item active text-2xl" aria-current="page">Shipping</li>
                    </ol>
                </nav>
                <div className={"text-right my-2"}>
                    {addAddr ? <>
                            {/* <Button disabled={!selected} variant="contained" onClick={e=>router.push("/checkout/payment")}>
                            Continue
                            </Button> */}
                        <button type="button"  onClick={e=>setAddAddr(false)}  className="px-4 py-1 mx-1 rounded cursor-pointer border-2 border-red-600 bg-red-600 text-red-50 hover:bg-red-50 hover:text-red-600">
                            Cancel
                        </button>
                    
                    </>:<>
                    
                        <button type="button"  onClick={e=>setAddAddr(true)} className="px-4 py-1 mx-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                            Add New Address
                        </button>
                        {selected && <button type="submit" disabled={!selected} onClick={e=>router.push("/checkout/payment")} className="px-4 py-1 mx-1 rounded cursor-pointer border-2 border-yellow-800 bg-yellow-800 text-yellow-50 hover:bg-yellow-50 hover:text-yellow-800">
                            Continue
                        </button>}
                    
                    </>}
                </div>
                
                {/* <h3 className="text-lg font-medium my-2">Contact Details</h3> */}
                
                {!addAddr ? <Suspense fallback={<div className="text-center py-10">
                    <div className="spinner-border text-primary"></div>
                </div>}>
                    <div className="grid grid-cols-1 md:grid-cols-1">
                        {userAddress?.map((el,key)=>{
                            return <div key={key} onClick={()=>{setSelected(selected === el._id ? null : el._id );localStorage.setItem('selectedAddress',el._id)}} className={selected==el._id?"border cursor-pointer my-1 shadow-sm p-2 bg-pink-100":"border cursor-pointer my-1 shadow-sm p-2"}>
                                <span onClick={()=>deleteAddress(el._id)} className="cursor-pointer text-danger float-right text-xl">&times;</span>
                                <span>{key+1}. {el.name} </span>
                                <br/>
                                <span>{el.phone}</span>
                                <span>{el.address} </span>
                                <span>{el.pincode}</span>
                            </div>
                        })} 
                    </div>
                </Suspense> : <Suspense fallback={<div className="text-center py-10">
                    <div className="spinner-border text-primary"></div>
                </div>}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField className="my-2" name="name" label="Name *" variant="outlined"
                        size="small" fullWidth inputRef={register({required:true})}
                        helperText={errors.name && (<span className="text-danger">Name is required</span>)}
                        defaultValue={address.name} onChange={(e)=>{setAddress({...address,name:e.target.value})}}
                        />
                        
                        <TextField className="my-2" type="text" name="phone" label="Mobile *" variant="outlined" 
                        size="small" fullWidth inputRef={register({required:true,minLength:10,maxLength:10})}
                        helperText={errors.phone && (<span className="text-danger">Enter valid 10 digit mobile number</span>)} 
                        defaultValue={address.phone} onChange={(e)=>{setAddress({...address,phone:e.target.value})}}
                        />
    
                        <h3 className="text-lg font-medium my-2">Address</h3>
                        <TextField className="my-2" type="number" name="pincode" label="Pin Code *" variant="outlined" 
                        size="small" fullWidth  inputRef={register({required:true,minLength:6,maxLength:6})}
                        helperText={errors.pincode && (<span className="text-danger">6 digit pincode is required</span>)}
                        defaultValue={address.pincode} onChange={(e)=>{setAddress({...address,pincode:e.target.value})}}
                        />
                        <TextField className="my-2" name="address" label="Address ( House no, Building, Street, Area )*" 
                        variant="outlined" size="small" fullWidth  inputRef={register({required:true})}
                        helperText={errors.pincode && (<span className="text-danger">Address is required</span>)}
                        defaultValue={address.address} onChange={(e)=>{setAddress({...address,address:e.target.value})}}
                        />
                        <TextField className="my-2" name="locality" label="Locality / Town *" variant="outlined" 
                        size="small" fullWidth 
                        defaultValue={address.locality} onChange={(e)=>{setAddress({...address,locality:e.target.value})}}
                        />
                        <div className="flex items-center">
                            <TextField className="my-2 px-1" name="state" label="State *" variant="outlined" size="small" 
                        fullWidth inputRef={register({required:true})}
                            helperText={errors.state && (<span className="text-danger">State is required</span>)}
                            defaultValue={address.state} onChange={(e)=>{setAddress({...address,state:e.target.value})}}
                            />
                            <TextField className="my-2 px-1" name="country" label="Country *" variant="outlined" 
                            size="small" fullWidth inputRef={register({required:true})}
                            helperText={errors.country && (<span className="text-danger">Country is required</span>)}
                            defaultValue={address.country} onChange={(e)=>{setAddress({...address,country:e.target.value})}}
                            />
                        </div>

                        {/* <Button variant="contained" fullWidth type="submit" >
                        Add Address
                    </Button> */}
                        
                        <button type="submit" className="w-full my-4 px-4 py-1 rounded text-xl cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                            Add Address
                        </button>

                    </form>
                </Suspense>}
                
 
            </div>
            
        </Checkout>
    </Suspense>
    </div>
}
 
export const getServerSideProps = async () => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}coupon`,{httpsAgent:agent})
    

    return {
      props: {
        coupon:res.data.result.filter(e=>e.couponActive === "1")
      }
    };
  }
