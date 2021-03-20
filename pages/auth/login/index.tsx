import React, { useEffect } from 'react'
import Link from 'next/link';
import Layout from "../../../component/common/layout";
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
 
  
export default function LoginPage(){

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

    
     
    const handleSubmit = () => {
        var formData = new FormData() 
        formData.append('phone','+91'+values.phone)
        formData.append('password',values.password) 
        fetch(`http://treevesto55.herokuapp.com/user/login`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(formData)
            console.log(json)
            if(json.success == 1){ 
                var user = {token:json.token,name:json.name,email:json.email,userId:json._id,phone:values.phone}
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
 
                        <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" />

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

        </Layout>
    </div>
}