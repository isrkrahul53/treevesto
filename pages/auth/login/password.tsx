import Link from 'next/link';
import Layout from "../../../component/common/layout";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function PasswordLoginPage(){


    
    return <div>
        <Layout>

            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-4"></div>

                    <div className="col-12 col-md-4 p-0 bg-white shadow-sm">
                    <img src="/assets/images/banner_login_landing_300.jpg" className="w-100" />
                        
                        <form className="p-4">
                            <div className="my-3 text-2xl"> Login to your Account </div>
                            
                            
                            <div className="flex border border-dark my-3"> 
                                <input type="number" name="phone" id="phone" placeholder="Mobile Number *"
                                className="w-100 p-2 border-0 outline-none" />
                            </div>
                            <div className="flex border border-dark my-3"> 
                                <input type="password" name="password" id="password" placeholder="Password *"
                                className="w-100 p-2 border-0 outline-none" />
                            </div>

                            <Link href="/"><Button variant="contained" color="secondary">
                              Login
                            </Button></Link>

                            <h5 className="text-lg text-secondary my-2">Forgot your password <span className="text-danger">Reset here</span> </h5>
                            <h5 className="text-lg text-secondary my-2">Having trouble logging in ? <span className="text-danger">Get help</span> </h5>
                            



                        </form>
                        
                    </div>
                </div>
            </div>

        </Layout>
    </div>
}