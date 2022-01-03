import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField'


export default function AdminLoginPage() {

    const {register,handleSubmit,errors} = useForm();

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
    
     
    const onSubmit = (data) => {
        var formData = new FormData() 
        formData.append('phone','+91'+data.phone)
        formData.append('password',data.password) 
        formData.append('userType',"1") 
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}user/login`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            if(json.success == 1){
                var admin = {token:json.token,name:json.name,email:json.email,adminId:json._id,phone:data.phone}
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

                    <div className="col-12 col-md-4 p-0 " style={{borderRadius:"10px"}}>
  
                        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                            <div className="my-3">
                                <span className="mx-1 text-2xl">Sign in to Treevesto</span> 
                            </div>
                            <TextField
                              name="phone"
                              label="Phone Number"
                              inputRef={register({required:true,minLength:10,maxLength:10})}
                              error={errors.phone && errors.phone.type === "required" || errors.phone &&  errors.phone.type === "minLength" || errors.phone &&  errors.phone.type === "maxLength"}
                            //   value={values.phone}
                            //   onChange={e=>setValues({...values,phone:e.target.value})}
                              variant="outlined"
                              size="small" fullWidth className="my-2"
                            />
                            <TextField
                              name="password" type="password"
                              label="password"
                              variant="outlined"
                              inputRef={register({required:true})}
                              error={errors.password && errors.password.type === "required"}
                            //   value={values.password}
                            //   onChange={e=>setValues({...values,password:e.target.value})} 
                              size="small" fullWidth className="my-2"
                            /> 
                            

                            <p className="py-3">By continuing, I agree to the  <span className="text-danger">Terms of Use</span> & <span className="text-danger">Privacy Policy</span> </p>

                            <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                            Login
                            </Button>
                            


                        </form>
 
                            
                            
                        
                    </div>
                </div>
            </div>
    </div>
}