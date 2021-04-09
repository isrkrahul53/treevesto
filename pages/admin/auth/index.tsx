import React, { useEffect } from 'react'
import Link from 'next/link';
import Layout from "../../../component/common/layout";
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';

export default function AdminLoginPage() {

    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }
 
    const router = useRouter();
    
    useEffect(()=>{ 
        if(localStorage.getItem('admin')){
            router.replace("/") 
        }

    },[])
     
    

    const [values,setValues] = React.useState({ 
        phone:'', 
        password:'', 
    })

    
     
    const handleSubmit = () => {
        var formData = new FormData() 
        formData.append('phone','+91'+values.phone)
        formData.append('password',values.password) 
        fetch(`https://api.treevesto.com:4000/user/login`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            if(json.success == 1){ 
                var admin = {token:json.token,name:json.name,email:json.email,adminId:json._id,phone:values.phone}
                localStorage.setItem('admin',JSON.stringify(admin))
                router.replace("/admin")
            }else{
                setError(json.msg)
            }
        })
    }
    
    
    return <div>

        <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-4"></div>

                    <div className="col-12 col-md-4 p-0 bg-white shadow-sm border" style={{borderRadius:"10px"}}>
  
                        <form className="p-4">
                            <div className="my-3">
                                <span className="mx-1 text-2xl">Login</span> 
                            </div>
                            
                            <div className="flex border border-dark my-3">
                                <div className="p-2 bg-light">+91</div>
                                <input type="number" name="phone" id="phone" placeholder="Mobile Number *"
                                 defaultValue={values.phone} onChange={e=>setValues({...values,phone:e.target.value})}
                                className="w-100 p-2 border-0 outline-none" />
                            </div>
                            <div className="flex border border-dark my-3">
                                <input type="text" name="password" id="password" 
                                defaultValue={values.password} onChange={e=>setValues({...values,password:e.target.value})} 
                                className="w-full p-2 outline-none" placeholder="Enter password" />
                            </div> 
                            

                            <p className="py-3">By continuing, I agree to the  <span className="text-danger">Terms of Use</span> & <span className="text-danger">Privacy Policy</span> </p>

                            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            Login
                            </Button>
                            <p className="py-3">New User ?  <span className="text-danger cursor-pointer"><Link href="/auth/register">Register</Link></span> </p>


                        </form>
 
                            
                            
                        
                    </div>
                </div>
            </div>
    </div>
}