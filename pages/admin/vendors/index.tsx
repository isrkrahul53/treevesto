import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout' 
import { useRouter } from 'next/router'; 
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'; 
import StoreIcon from '@material-ui/icons/Store';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';


// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import axios from 'axios';
import https from 'https'
import Button from '@material-ui/core/Button'
import { Card } from '@material-ui/core';

export default function VendorPage(props) {
  console.log(props.vendors)
  const router = useRouter();
  const [navigation, setNavigation] = React.useState('products');
  const [selectedVendor, setSelectedVendor] = React.useState("");
  var isLoading = false;
  const [products,setProducts] = React.useState([])
  
  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
   
  useEffect(()=>{
    isLoading = true;
    if(selectedVendor != ""){
      fetch(`https://api.treevesto.com:4000/product/vendor/`+selectedVendor).then(d=>d.json()).then(json=>{
        setProducts(json.result)
        isLoading = false;
      })
    }else{
      setProducts([])
    }

  },[selectedVendor])



  const deleteVendor = (x) => {
    if(confirm('Are you sure to delete this vendor')){
      fetch(`https://api.treevesto.com:4000/vendor/`+x,{
        method:"DELETE"
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
      })

    }
  }

  const approve = (x,y) => {
    if(confirm('Are you sure to approve it !')){
      const formData = new FormData();
      formData.append(y,"2")
      fetch(`https://api.treevesto.com:4000/vendor/`+x,{
        method:"PATCH",
        body:formData
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
        setNavigation("verification")
      })
    }
  }

  const disapprove = (x,y) => {
    if(confirm('Are you sure to disapprove it !')){
      const formData = new FormData();
      formData.append(y,"-1")
      fetch(`https://api.treevesto.com:4000/vendor/`+x,{
        method:"PATCH",
        body:formData
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
        setNavigation("verification")
      })
    }
  }

    return <AdminLayout>
      
      
        <BottomNavigation value={navigation} onChange={handleNavigationChange}>
            <BottomNavigationAction label="Vendors" value="vendors" icon={<StoreIcon />} />
            <BottomNavigationAction label="Products" value="products" icon={<AppsIcon />} />
            <BottomNavigationAction label="Verification" value="verification" icon={<AssignmentTurnedInIcon />} />
        </BottomNavigation>
      

        
        {navigation == 'vendors'?<div>
            <TableContainer component={Paper}>
              <Table className={""} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.vendors.map((el,key) => (
                    <TableRow key={key}>
                      
                      <TableCell>{key+1}</TableCell>
                      <TableCell>{el.name}</TableCell>
                      <TableCell>{el.email}</TableCell>
                      <TableCell>{el.phone}</TableCell>
                      {el.verified !== 0 ? <TableCell className="text-success">Verified</TableCell>:<TableCell className="text-danger">Pending</TableCell>}
                      <TableCell className="text-primary cursor-pointer" onClick={e=>deleteVendor(el._id)}><CloseIcon /></TableCell>
                        
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
             
        </div>:<></>}

        {navigation === 'verification'?<>
            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow> 
                  <TableCell>Purpose</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Store Name</TableCell>
                  <TableCell>Verify</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {props.vendors.filter(e=>e.gstin_verified && e.gstin_verified === "1").map((e,key)=>(
                <TableRow key={key}> 
                  <TableCell> GST Verification </TableCell>
                  <TableCell> {e.name} </TableCell>
                  <TableCell> {e.store_name || '-'} </TableCell>
                  <TableCell> {e.gstNo} </TableCell>
                  <TableCell> 
                    <CheckBoxIcon className="mr-1 cursor-pointer text-success" onClick={()=>approve(e._id,"gstin_verified")} />
                    <CloseIcon className="mr-1 cursor-pointer text-danger" onClick={()=>disapprove(e._id,"gstin_verified")} />
                  </TableCell>
                </TableRow>
              ))}
              {props.vendors.filter(e=>e.signature_verified && e.signature_verified === "1").map((e,key)=>(
                <TableRow key={key}> 
                  <TableCell> Signature Verification </TableCell>
                  <TableCell> {e.name} </TableCell>
                  <TableCell> {e.store_name || '-'} </TableCell>
                  <TableCell className="flex"> 
                    <img src={"https://api.treevesto.com:4000/"+e.signature_docs} width="20px" className="rounded shadow-sm border" alt=""/>
                    <a href={"https://api.treevesto.com:4000/"+e.signature_docs} target="_blank">
                      <VisibilityIcon className="mx-2 cursor-pointer" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <CheckBoxIcon className="mr-1 cursor-pointer text-success" onClick={()=>approve(e._id,"signature_verified")} />
                    <CloseIcon className="mr-1 cursor-pointer text-danger" onClick={()=>disapprove(e._id,"signature_verified")} />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
            </TableContainer>

        </>:<></>}


        {navigation == 'products'?<div> 
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <select className="form-select my-3" defaultValue={selectedVendor} onChange={e=>setSelectedVendor(e.target.value)}>
                  <option value="">Select Vendor</option> 
                  {props.vendors.map((el,key)=>(
                    <option key={key} value={el._id}>{el.name}</option>
                  ))}
                </select>

              </div>
            </div>
          </div>

            {isLoading?<>
              <div className="text-center">
                <div className="spinner-border text-primary"></div>
              </div>
            </>:<>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {products.map((el,key)=>(
                  <div key={key} className="bg-white border shadow-sm">
                    <img src={"https://api.treevesto.com:4000/"+el.productImages[0]} alt=""/>
                    <div className="p-1">
                      <div>
                        <span className="text-sm"> {el.productName.lengTableCell>16?el.productName.substr(0,16):el.productName} </span>
                        <span className="text-sm"> {el.productName.lengTableCell>16?"...":""} </span>
                        <div> Rs. {el.sellingPrice} </div>
                        {/* <div className="p-1 px-3 text-center text-sm cursor-pointer border-2 border-dark rounded bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">Set Attribute</div> */}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
              
              {products.length == 0?<div className="px-4">
                <div className="text-2xl"> No Products Available </div>
                <div className="text-secondary"> 
                Go to homepage  
                </div> 
              </div>:<div></div>}
            
            </>}

        </div>:<div></div>}


    </AdminLayout> 
}


export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const vendors = await axios.get(`https://api.treevesto.com:4000/vendor`,{httpsAgent:agent})
 

  return {
    props: {
      vendors:vendors.data.result, 
    }
  };
}