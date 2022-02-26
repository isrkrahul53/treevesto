import React, { useEffect, useRef, lazy, Suspense } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Head from 'next/head'

const Layout = lazy(()=>import("../../../component/common/layout"))

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
// import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDshHYYBS7gD-_IDijbK5oyOOJ2P_7-wTU",
    authDomain: "treevesto-595fc.firebaseapp.com",
    projectId: "treevesto-595fc",
    storageBucket: "treevesto-595fc.appspot.com",
    messagingSenderId: "366541769202",
    appId: "1:366541769202:web:345342603d5d6b4113c36b",
    measurementId: "G-E55C129782"
  };
  // firebase.analytics();
  firebase.initializeApp(firebaseConfig);
  
export default function RegisterPage(){
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, errors } = useForm();

    const password = useRef({});
    password.current = watch("password", "");
 
    var recaptchaVerifier = null;
    const router = useRouter();
    const [isFront, setIsFront] = React.useState(false);
    
    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        if(localStorage.getItem('user')){
            router.replace("/")
        }

    },[])
    
    const [cResult,setCResult] = React.useState(null);
    const [code,setCode] = React.useState(null)
    const [checks,setChecks] = React.useState({
        error:null,
        bank:null,
        business:null,
        passwordType:true
    })

    const [values,setValues] = React.useState({
        step:1,
        // Phone,
        userId:null,
        phone:null,
        // OTP,
        otp:null,
        // Password
        email:'',
        name:'',
        password:'',
        cpassword:'', 
    })

    
    
    const handlePrevStep = (e) => {
        setValues({...values,step:values.step-1})
    }

    const handleNextStep = () => { 
        setValues({...values,step:values.step+1})
    }
    
    const onRegister = (data) => {
        var formData = new FormData()
        formData.append('name',values.name)
        formData.append('email',values.email)
        formData.append('phone',values.phone)
        formData.append('password',values.password)
        formData.append('cpassword',values.cpassword)
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}user/register`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            if(json.success==1){ 
                router.replace("/auth/login")
            }else{
                dispatch({type:"setAlert",payloads:json.msg})
            }
        })
    }
    
    const RegisterWithPhoneNumber  = (data) => {
        // var x = (document.getElementById("phone") as HTMLInputElement).value;
        var x = data.phone;
        const phoneNumber = '+91'+x; 
        // setValues({...values,phone:x})
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{size:'invisible'});
        const appVerifier = recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            // window.confirmationResult = confirmationResult;
            setCResult(confirmationResult)
            setValues({...values,step:values.step+1})

            // ...
            }).catch((error) => {
                dispatch({type:"setAlert",payloads:error.message})
            });
    }

    const verifyCode = (data) => {
        const code = data.otp;
        cResult.confirm(code).then((result) => {
        // User signed in successfully.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        setCResult(null)
        setValues({...values,step:values.step+1,userId:result.user.uid,phone:result.user.phoneNumber})
        dispatch({type:"setAlert",payloads:"OTP verified !"})
        // ...
        }).catch((error) => { 
            dispatch({type:"setAlert",payloads:error.message})
        });
    }
    if (!isFront) return null;


    return <div>
        
    <Head>
      <title> Authentication </title>
    </Head>
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <Layout>
            
                <div className="container py-10">
                    <img src="/assets/images/login.png" className="absolute left-0 top-0 w-full md:w-4/5 xl:w-2/3" alt="" />
                    

                    {values.step == 1?<div>
                        {/* <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" /> */}

                        <form className="w-full md:w-3/5 xl:w-2/5 mx-auto my-10 relative bg-white p-6 opacity-90 md:border shadow-sm rounded" onSubmit={handleSubmit(RegisterWithPhoneNumber)}>
                            <div className="my-3">
                                <span className="mx-1 text-2xl">Register</span> 
                            </div>
                            
                            <div className={values.userId?"flex border border-dark my-3 d-none":"flex border border-dark my-3"}>
                                <div className="p-2 bg-light">+91</div>
                                <input type="number" name="phone" id="phone" placeholder="Mobile Number *"
                                className="w-100 p-2 border-0 outline-none" 
                                ref={register({required:true,minLength:10,maxLength:10})} />
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
                            

                            <div id="recaptcha-container"></div>
                            

                            <p className="py-3">By continuing, I agree to the  <span className="text-danger">Terms of Use</span> & <span className="text-danger">Privacy Policy</span> </p>

                            <Button type="submit" variant="contained" color="secondary">
                            Continue
                            </Button>
                            <p className="py-3">Already Registered ?  <span className="text-danger cursor-pointer"><Link href="/auth/login">Login</Link></span> </p>


                        </form>

                    </div>:<div></div>}
                    
                    {values.step == 2?<div>
                        <form className="w-full md:w-3/5 xl:w-2/5 mx-auto my-10 relative bg-white p-6 opacity-90 md:border shadow-sm rounded" onSubmit={handleSubmit(verifyCode)}>
                            <img src="/assets/images/otp.jpg" className="w-32 rounded-circle" />
                            <h4 className="text-2xl">Verify With OTP</h4>
                            <h5 className="text-sm text-secondary">OTP Sent Successfully To Your Number </h5>
                            {/* <h5 className="text-sm text-secondary">Sent to : {values.phone} </h5> */}

                            
                            {cResult?<div className="flex border border-dark my-3"> 
                                <input type="number" name="otp" id="otp" 
                                className="w-100 p-2 border-0 outline-none" placeholder="Enter OTP"
                                ref={register({required:true,minLength:4})} />
                            </div>:<></>}
                            {errors.otp && errors.otp.type==="required" && (
                            <small className="text-danger -mt-10">Enter OTP</small>
                            )}
                            {errors.otp && errors.otp.type==="minLength" && (
                            <small className="text-danger -mt-10">Enter valid OTP</small>
                            )}

                            <h5 className="text-lg text-secondary my-2">Log in using <span  className="text-danger"><Link href="/auth/login/password">Password</Link> </span> </h5>
                            <h5 className="text-lg text-secondary my-2">Having trouble logging in ? <span  className="text-danger">Get help</span> </h5>
                            
                            <Button type="submit" variant="contained" color="secondary">
                            Verify
                            </Button>

                            
                        </form>
                    </div>:<div></div>}

                    {values.step == 3?<div>
                        {/* <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" /> */}

                        <form className="w-full md:w-3/5 xl:w-2/5 mx-auto my-10 relative bg-white p-6 opacity-90 md:border shadow-sm rounded" onSubmit={handleSubmit(onRegister)}>
                            <div className="my-3"> 
                                <span className="mx-1 text-2xl">
                                    Register <small className="text-secondary text-sm"> with {values.phone} </small> 
                                </span>
                            </div>
                            
                            <div className="flex border border-dark mt-3">
                                <input type="text" name="email" id="email" defaultValue={values.email} 
                                onChange={e=>setValues({...values,email:e.target.value})} className="w-full p-2 outline-none" 
                                placeholder="Enter your email Address ( optional ) " 
                                ref={register({required:false,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} />
                            </div>
                            {/* {errors.email?.type === "required" && <small className="text-danger">Email Id is required</small>} */}
                            {errors.email?.type === "pattern" && <small className="text-danger">Enter valid email address</small>}


                            <div className="flex border border-dark mt-3">
                                <input type="text" name="name" id="name" defaultValue={values.name} 
                                onChange={e=>setValues({...values,name:e.target.value})} className="w-full p-2 outline-none" 
                                placeholder="Enter your fullname" 
                                ref={register({required:true})} />
                            </div>
                            {errors.name?.type === "required" && <small className="text-danger">Name is required</small>}

                            <div className="flex border border-dark mt-3">
                                <input type="text" name="password" id="password" defaultValue={values.password} 
                                onChange={e=>setValues({...values,password:e.target.value})} className="w-full p-2 outline-none" 
                                placeholder="Enter password" 
                                ref={register({required:true})} />
                            </div>
                            {errors.password?.type === "required" && <small className="text-danger">Password is required</small>}

                            <div className="flex border border-dark mt-3">
                                <input type="text" name="cpassword" id="cpassword" defaultValue={values.cpassword} 
                                onChange={e=>setValues({...values,cpassword:e.target.value})} className="w-full p-2 outline-none" 
                                placeholder="Confirm password" 
                                ref={register({
                                    validate:value=>value === password.current || "The Password do not match"
                                })} />
                            </div>
                            {errors.cpassword && <small className="text-danger">{errors.cpassword.message}</small>}

                            <div className="py-2"></div>
                            
                            <Button type="submit" variant="contained" color="secondary">
                            Register
                            </Button>
                            <p className="py-3">Already Registered ?  <span className="text-danger cursor-pointer"><Link href="/auth/login">Login</Link></span> </p>


                        </form>

                        <form>
                            

                        </form>

                    </div>:<div></div>}

                </div> 

            </Layout>
        </Suspense>
    </div>
}