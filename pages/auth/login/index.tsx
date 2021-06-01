import React, { useEffect } from 'react'
import Link from 'next/link';
import Layout from "../../../component/common/layout";
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
 
import { useForm } from "react-hook-form";

  
export default function LoginPage(){
    const { register, handleSubmit, errors } = useForm();

    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }
 
    const router = useRouter();
    
    useEffect(()=>{ 
        if(localStorage.getItem('user')){
            router.replace("/") 
        }

    },[])
     

    const [values,setValues] = React.useState({ 
        phone:'', 
        password:'', 
    })

    
     
    const onSubmit = (data) => {
        var formData = new FormData() 
        formData.append('phone','+91'+data.phone)
        formData.append('password',data.password) 
        fetch(`https://api.treevesto.com:4000/user/login`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            if(json.success == 1){ 
                var user = {token:json.token,name:json.name,email:json.email,userId:json.userId,phone:values.phone}
                localStorage.setItem('user',JSON.stringify(user))
                router.replace("/")
            }else{
                setError(json.msg)
            }
        })
    }
    
    
    return <div>
        <Layout error={error} success={success}>
            
            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-4"></div>

                    <div className="col-12 col-md-4 p-0 bg-white shadow-sm">
 
                        <img src="/assets/images/login.jpg" className="w-100" />

                        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <span className="mx-1 text-2xl">Login</span> 
                            </div>
                            
                            <div className="flex border border-dark mt-3">
                                <div className="p-2 bg-light">+91</div>
                                <input type="number" name="phone" id="phone" placeholder="Mobile Number *" 
                                    ref={register({required:true,minLength:10,maxLength:10})}
                                    defaultValue={values.phone} onChange={e=>setValues({...values,phone:e.target.value})}
                                    className="w-100 p-2 border-0 outline-none" />
                            </div>
                            {errors.phone && errors.phone.type==="required" && (
                            <small className="text-danger -mt-10">Phone number cannot be empty</small>
                            )}
                            {errors.phone && errors.phone.type==="minLength" && (
                            <small className="text-danger -mt-10">Enter valid phone Number</small>
                            )}
                            {errors.phone && errors.phone.type==="maxLength" && (
                            <small className="text-danger -mt-10">Enter valid phone Number</small>
                            )}



                            <div className="flex border border-dark mt-3">
                                <input type="password" name="password" id="password"  ref={register({required:true})}
                                defaultValue={values.password} onChange={e=>setValues({...values,password:e.target.value})} 
                                className="w-full p-2 outline-none" placeholder="Enter password" />
                            </div> 
                            {errors.password && errors.password.type==="required" && (
                            <small className="text-danger -mt-10">Password cannot be empty</small>
                            )}
                            {/* {errors.password && errors.password.type==="minLength" && (
                            <small className="text-danger -mt-10">Password must contain atleast 8 characters</small>
                            )}  */}
                            

                            <p className="py-3">By continuing, I agree to the  <span className="text-danger">Terms of Use</span> & <span className="text-danger">Privacy Policy</span> </p>

                            <Button variant="contained" color="secondary" type="submit">
                            Login
                            </Button>
                            <p className="py-3">New User ?  <span className="text-danger cursor-pointer"><Link href="/auth/register">Register</Link></span> </p>


                        </form>
 
                            
                            
                        
                    </div>
                </div>
            </div>

        </Layout>
    </div>
}