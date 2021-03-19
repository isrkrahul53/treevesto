import React from 'react'
import Link from 'next/link';
import Layout from "../../../component/common/layout";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function OTPLoginPage(){
    
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }
 
    return <div>
        <Layout error={error} success={success}>

            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-4"></div>

                    <div className="col-12 col-md-4 p-0 bg-white shadow-sm">

                        <form className="p-4">
                            <img src="/assets/images/otp.jpg" className="w-32 rounded-circle" />
                            <h4 className="text-2xl">Verify With OTP</h4>
                            <h5 className="text-sm text-secondary">Sent to : 6209460626</h5>

                            <div className="flex border border-dark my-3"> 
                                <input type="number" name="otp" id="otp" placeholder="Enter OTP"
                                className="w-100 p-2 border-0 outline-none" />
                            </div> 
                            <h5 className="text-lg text-secondary my-2">Log in using <span  className="text-danger"><Link href="/auth/login/password">Password</Link> </span> </h5>
                            <h5 className="text-lg text-secondary my-2">Having trouble logging in ? <span  className="text-danger">Get help</span> </h5>
                            


                        </form>
                        
                    </div>
                </div>
            </div>

        </Layout>
    </div>
}