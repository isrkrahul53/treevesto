import React, { useEffect } from 'react'
import Link from 'next/link';
import Layout from "../../../component/common/layout";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';

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

    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }

    var recaptchaVerifier = null;
    const router = useRouter();
    
    useEffect(()=>{
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
    
    const handleSubmit = () => {
        var formData = new FormData()
        formData.append('name',values.name)
        formData.append('email',values.email)
        formData.append('phone',values.phone)
        formData.append('password',values.password)
        formData.append('cpassword',values.cpassword)
        fetch(`https://api.treevesto.com:4000/user/register`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{ 
            if(json.success==1){ 
                router.replace("/auth/login")
            }else{
                setError(json.msg)
            }
        })
    }
    
    const RegisterWithPhoneNumber  = () => { 
        var x = (document.getElementById("phone") as HTMLInputElement).value;
        const phoneNumber = '+91'+x; 
        // setValues({...values,phone:x})
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
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
                setError(error.message)
            });
    }

    const verifyCode = (x) => {
        const code = x;
        cResult.confirm(code).then((result) => {
        // User signed in successfully.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        setCResult(null)
        setValues({...values,step:values.step+1,userId:result.user.uid,phone:result.user.phoneNumber})
        setSuccess('OTP verified')
        // ...
        }).catch((error) => { 
            setError(error.message)
        });
    }
    return <div>
        <Layout error={error} success={success}>
        

            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-4"></div>

                    <div className="col-12 col-md-4 p-0 bg-white shadow-sm">

                    {values.step == 1?<div>
                            <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" />

                            <form className="p-4">
                                <div className="my-3">
                                    <span className="mx-1 text-2xl">Register</span> 
                                </div>
                                
                                <div className={values.userId?"flex border border-dark my-3 d-none":"flex border border-dark my-3"}>
                                    <div className="p-2 bg-light">+91</div>
                                    <input type="number" name="phone" id="phone" placeholder="Mobile Number *"
                                    className="w-100 p-2 border-0 outline-none" />
                                </div>
     
                                <div id="recaptcha-container"></div>
                                

                                <p className="py-3">By continuing, I agree to the  <span className="text-danger">Terms of Use</span> & <span className="text-danger">Privacy Policy</span> </p>

                                <Button variant="contained" color="secondary" onClick={RegisterWithPhoneNumber}>
                                Continue
                                </Button>
                                <p className="py-3">Already Registered ?  <span className="text-danger cursor-pointer"><Link href="/auth/login">Login</Link></span> </p>


                            </form>

                        </div>:<div></div>}
                        
                        {values.step == 2?<div>
                            <form className="p-4">
                                <img src="/assets/images/otp.jpg" className="w-32 rounded-circle" />
                                <h4 className="text-2xl">Verify With OTP</h4>
                                <h5 className="text-sm text-secondary">Sent to : 6209460626</h5>
 
                                
                                {cResult?<div className="flex border border-dark my-3"> 
                                    <input type="number" name="otp" id="otp" onChange={e=>setCode(e.target.value)} 
                                    className="w-100 p-2 border-0 outline-none" placeholder="Enter OTP" />
                                </div>:<></>}

                                <h5 className="text-lg text-secondary my-2">Log in using <span  className="text-danger"><Link href="/auth/login/password">Password</Link> </span> </h5>
                                <h5 className="text-lg text-secondary my-2">Having trouble logging in ? <span  className="text-danger">Get help</span> </h5>
                                
                                <Button variant="contained" color="secondary" onClick={e=>verifyCode(code)}>
                                 Verify
                                </Button>

                                
                            </form>
                        </div>:<div></div>}

                        {values.step == 3?<div>
                            <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" />

                            <form className="p-4">
                                <div className="my-3"> 
                                    <span className="mx-1 text-2xl">
                                        Register <small className="text-secondary text-sm"> with {values.phone} </small> 
                                    </span>
                                </div>
                                 
                                <div className="flex border border-dark my-3">
                                    <input type="text" name="email" id="email" defaultValue={values.email} onChange={e=>setValues({...values,email:e.target.value})} className="w-full p-2 outline-none" placeholder="Enter your email Address ( optional ) " />
                                </div>
                                <div className="flex border border-dark my-3">
                                    <input type="text" name="name" id="name" defaultValue={values.name} onChange={e=>setValues({...values,name:e.target.value})} className="w-full p-2 outline-none" placeholder="Enter your fullname" />
                                </div>
                                <div className="flex border border-dark my-3">
                                    <input type="text" name="password" id="password" defaultValue={values.password} onChange={e=>setValues({...values,password:e.target.value})} className="w-full p-2 outline-none" placeholder="Enter password" />
                                </div>
                                <div className="flex border border-dark my-3">
                                    <input type="text" name="cpassword" id="cpassword" defaultValue={values.cpassword} onChange={e=>setValues({...values,cpassword:e.target.value})} className="w-full p-2 outline-none" placeholder="Confirm password" />
                                </div>
                                 
                                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                                 Register
                                </Button>
                                <p className="py-3">Already Registered ?  <span className="text-danger cursor-pointer"><Link href="/auth/login">Login</Link></span> </p>


                            </form>

                            <form>
                                

                            </form>

                        </div>:<div></div>}

                        
                    </div>
                </div>
            </div>

        </Layout>
    </div>
}