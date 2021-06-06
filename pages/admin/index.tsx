import React, { useEffect, lazy, Suspense } from 'react'
import Link from 'next/link';
import { Card, CardContent, Button } from '@material-ui/core';

// Table
import TableContainer from '@material-ui/core/TableContainer';
const Table = lazy(()=>import('@material-ui/core/Table'));
const TableBody = lazy(()=>import('@material-ui/core/TableBody'));
const TableCell = lazy(()=>import('@material-ui/core/TableCell'));
const TableHead = lazy(()=>import('@material-ui/core/TableHead'));
const TableRow = lazy(()=>import('@material-ui/core/TableRow'));
const Paper = lazy(()=>import('@material-ui/core/Paper'));



const AdminLayout = lazy(()=>import('../../component/common/AdminLayout'));
const PieChart = lazy(()=>import('../../component/charts/pie'));
const LineChart = lazy(()=>import('../../component/charts/lineChart'));
const PolarAreaChart = lazy(()=>import('../../component/charts/polarArea'));


import axios from 'axios';
import https from 'https';

export default function AdminPage(props){
    const [admin,setAdmin] = React.useState(null);

    const [income,setIncome] = React.useState(null)
    const [saleByGender,setSaleGender] = React.useState([0,0])
    const [totalIncome,setTotalIncome] = React.useState(null)

    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        var admin = JSON.parse(localStorage.getItem('admin'))
        if(admin){
            setAdmin(admin)
        }
        var income = [];
        const arr = props.sales.filter(e=>e.date.split("-")[0] === "2021").map(e=>({date:Number(e.date.split("-")[1]),vendor:e.vendorId,price:e.price}))
        for(var i=1;i<=12;i++){
            var ar = arr.filter(e=>e.date === i)
            income.push(ar.length > 0 ?ar.map(e=>e.price) : 0)
        }
        income = income.map(e=>typeof(e) === 'object' ? e.reduce((a,b)=>Number(a)+Number(b)) : e)
        setIncome(income)
        setTotalIncome(income.reduce((a,b)=>a+b))

        var male = props.sales.filter(e=>e.userId.gender === "Male").map(e=>e.price)
        male = male.length > 0 ? male.reduce((a,b)=>Number(a)+Number(b)) : 0
        var female = props.sales.filter(e=>e.userId.gender === "Female").map(e=>e.price)
        female = female.length > 0 ? female.reduce((a,b)=>Number(a)+Number(b)) : 0
        
        setSaleGender([male,female])

        props.vendor.forEach(element => {
            element.income = arr.length > 0 ? arr.map(e=>e.vendor === element._id ? e.price : 0).reduce((a,b)=>(Number(a)+Number(b))) : 0
        });
        
    },[])

    
    if (!isFront) return null;


    return <Suspense fallback={<div className="text-center py-10">
        <div className="spinner-border text-primary"></div>
    </div>}>
        <AdminLayout>
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
                                <div className="text-lg text-secondary font-medium">Product Sold</div>
                                <div className="text-4xl font-light">{props.sales.length}</div>
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
                                <PieChart data={saleByGender} />
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-8">
                        <Card>
                            <h3 className="text-xl font-medium p-2 px-3 text-secondary">Yearly Sales</h3>
                            <div className="mx-2 mb-3">
                                <LineChart data={income} />
                            </div>
                        </Card> 
                    </div>
                </div>


                <div className="row my-3">
                    <div className="col-md-6">
                        {/* <Card> */}
                            <div className="mx-2 mb-3">
                            <TableContainer component={Paper}>
                                <h3 className="text-xl font-medium p-2 px-3 text-secondary">Best Salesman</h3>
                                <Table className={""} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Vendor</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>Income</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.vendor.map((e,k)=>(
                                        <TableRow key={k}>
                                            <TableCell> {e.name} </TableCell>
                                            <TableCell> {e.phone} </TableCell>
                                            <TableCell> {e.state} </TableCell>
                                            <TableCell> Rs. {e.income} </TableCell>
                                        </TableRow>

                                        ))}
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
                                <PolarAreaChart data={[props.productLength,props.userLength,props.vendor.length,props.sales.length]} />
                            </div>
                        </Card> 
                    </div>

                </div>
            </div>

        </AdminLayout> 
    </Suspense>
}
export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const vendors = await axios.get(`https://api.treevesto.com:4000/vendor`,{httpsAgent:agent})
  const sales = await axios.get(`https://api.treevesto.com:4000/orderedproduct`,{httpsAgent:agent})
  const products = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})
  const users = await axios.get(`https://api.treevesto.com:4000/user`,{httpsAgent:agent})
 

  return {
    props: {
      vendor:vendors.data.result, 
      productLength:products.data.result.length, 
      userLength:users.data.result.length, 
      sales:sales.data.result, 
    }
  };
}