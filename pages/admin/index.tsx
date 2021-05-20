import React, { useEffect } from 'react'
import Link from 'next/link';
import AdminLayout from '../../component/common/AdminLayout'
import { Card, CardContent, Button } from '@material-ui/core';

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import axios from 'axios';
import https from 'https';
import PieChart from '../../component/charts/pie';
import LineChart from '../../component/charts/lineChart';
import PolarAreaChart from '../../component/charts/polarArea';

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
            <div className="row my-3">
                <div className="col-md-4">

                    <Card>
                        <h3 className="text-xl font-medium p-2 px-3 text-secondary">Sale By Gender</h3>
                        <div className="mb-3">
                            <PieChart />
                        </div>
                    </Card>
                </div>
                <div className="col-md-8">
                    <Card>
                        <h3 className="text-xl font-medium p-2 px-3 text-secondary">Yearly Sales</h3>
                        <div className="mx-2 mb-3">
                            <LineChart />
                        </div>
                    </Card> 
                </div>
            </div>


            <div className="row my-3">
                <div className="col-md-6">
                    {/* <Card> */}
                        <div className="mx-2 mb-3">
                        <TableContainer component={Paper}>
                            <h3 className="text-xl font-medium p-2 px-3 text-secondary">Best Vendor</h3>
                            <Table className={""} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Vendor</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                 
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                    {/* </Card>  */}

                </div>
                <div className="col-md-6">
                    <Card>
                        <h3 className="text-xl font-medium p-2 px-3 text-secondary">Sales Overview</h3>
                        <div className="mx-2 mb-3">
                            <PolarAreaChart />
                        </div>
                    </Card> 
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