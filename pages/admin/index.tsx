import React, { useEffect } from 'react'
import Link from 'next/link';
import AdminLayout from '../../component/common/AdminLayout'
import { Card, CardContent, Button } from '@material-ui/core';

import axios from 'axios';
import https from 'https'

export default function AdminPage(props){
    const [admin,setAdmin] = React.useState(null);

    useEffect(()=>{
        var admin = JSON.parse(localStorage.getItem('admin'))
        if(admin){
            setAdmin(admin)
        }
    },[])
    return <AdminLayout>
        <div className="container-fluid">
            <div className="row my-3">
                <div className="col-md-9">
                    <Card className="p-8" style={{backgroundColor:"rgb(200, 250, 205)"}}>
                        <CardContent>
                            <div className="text-2xl">Welcome back,</div>
                            <div className="text-xl">{admin?.name || admin?.email || "John Doe"}</div>
                            <p className="text-secondary">
                            If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                            </p>
                        </CardContent>
                    </Card>

                </div>
                <div className="col-md-3">
                    <Card className="p-0 mb-2">
                        <CardContent className="p-0">
                            <img src="/assets/icons/admin/homepage.jpg" alt="homepage" className="w-full" />
                            <div className="text-right px-2">
                                <Link href="/admin/homepage"><Button variant="text" color="primary" className="my-1" size="small">
                                Start
                                </Button></Link>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <Card className="p-1">
                        <CardContent className="p-1">
                            <div className="tex-sm leading-5 text-secondary">Cusotmize banners and sections of Treevesto.</div>
                            <Button variant="contained" color="primary" className="my-1" fullWidth size="small">
                              Start
                            </Button>
                        </CardContent>
                    </Card> */}

                </div>
            </div>
            <div className="row my-3">
                <div className="col-md-4 my-1">
                    <Link href="/admin/users"><Card className="bg-light cursor-pointer">
                        <CardContent>
                            <img src="/assets/icons/admin/users.jpg" alt="users" width="100px" className="float-right" />
                            <div className="text-lg text-secondary font-medium">Total Active Users</div>
                            <div className="text-4xl font-light">{props.userLength}</div>
                        </CardContent>
                    </Card></Link>

                </div>
                <div className="col-md-4 my-1">
                    <Link href="/admin/orders"><Card className="bg-light cursor-pointer">
                        <CardContent>
                            <img src="/assets/icons/admin/order.png" alt="order" width="90px" className="float-right -mt-4" />
                            <div className="text-lg text-secondary font-medium">Total Orders</div>
                            <div className="text-4xl font-light">{props.orderLength}</div>
                        </CardContent>
                    </Card></Link>


                </div>
                <div className="col-md-4 my-1">
                    <Link href="/admin/vendors"><Card className="bg-light cursor-pointer">
                        <CardContent>
                            <img src="/assets/icons/admin/products.png" alt="products" width="120px" className="float-right" />
                            <div className="text-lg text-secondary font-medium">PRoducts</div>
                            <div className="text-4xl font-light">{props.productLength}</div>
                        </CardContent>
                    </Card></Link>


                </div>
            </div>
        </div>

    </AdminLayout> 
}
export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const vendors = await axios.get(`https://api.treevesto.com:4000/vendor`,{httpsAgent:agent})
  const orders = await axios.get(`https://api.treevesto.com:4000/order`,{httpsAgent:agent})
  const products = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})
  const users = await axios.get(`https://api.treevesto.com:4000/user`,{httpsAgent:agent})
 

  return {
    props: {
      vendorLength:vendors.data.result.length, 
      orderLength:orders.data.result.length, 
      productLength:products.data.result.length, 
      userLength:users.data.result.length, 
    }
  };
}