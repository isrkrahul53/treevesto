import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router'; 
import Button from '@material-ui/core/Button'
import { Card } from '@material-ui/core';


const BottomNavigation = lazy(()=>import('@material-ui/core/BottomNavigation'));
const BottomNavigationAction = lazy(()=>import('@material-ui/core/BottomNavigationAction'));
const StoreIcon = lazy(()=>import('@material-ui/icons/Store'));
const AppsIcon = lazy(()=>import('@material-ui/icons/Apps'));
const AssignmentTurnedInIcon = lazy(()=>import('@material-ui/icons/AssignmentTurnedIn'));
const VisibilityIcon = lazy(()=>import('@material-ui/icons/Visibility'));
const CheckBoxIcon = lazy(()=>import('@material-ui/icons/CheckBox'));
const CloseIcon = lazy(()=>import('@material-ui/icons/Close'));
const CategoryIcon = lazy(()=>import('@material-ui/icons/Category'));
const VerifiedUserIcon = lazy(()=>import('@material-ui/icons/VerifiedUser'));
const LocalOfferIcon = lazy(()=>import('@material-ui/icons/LocalOffer'));
const MaterialModal = lazy(()=>import("../../../component/material/materialModal"));
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));





// Table
import TableContainer from '@material-ui/core/TableContainer';
const Table = lazy(()=>import('@material-ui/core/Table'));
const TableBody = lazy(()=>import('@material-ui/core/TableBody'));
const TableCell = lazy(()=>import('@material-ui/core/TableCell'));
const TableHead = lazy(()=>import('@material-ui/core/TableHead'));
const TableRow = lazy(()=>import('@material-ui/core/TableRow'));
const Paper = lazy(()=>import('@material-ui/core/Paper'));



import axios from 'axios';
import https from 'https'


import {useForm} from 'react-hook-form'


export default function VendorPage(props) {
  
  const {register,setValue,handleSubmit,errors} = useForm();

  const router = useRouter();
  const [navigation, setNavigation] = React.useState('products');
  const [selectedVendor, setSelectedVendor] = React.useState("");
  var isLoading = false;
  const [products,setProducts] = React.useState([])
  const [isFront, setIsFront] = React.useState(false);
  
  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
   
  useEffect(()=>{
    process.nextTick(() => {
        if (globalThis.window ?? false) {
            setIsFront(true);
        }
    });
    
  },[])


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



  const updateVendor = (x,val) => {
    // console.log(!x)
    var formData = new FormData();
    formData.append("assured",val)
    fetch(`https://api.treevesto.com:4000/vendor/email/`+x,{
      method:"PATCH",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
    })

  }
  const updateProduct = (data) => {
    // console.log(data)
    var formData = new FormData();
    
    Object.keys(data).map((key,i)=>{
      if(data[key] != null && data[key] != '' && data[key] != 'id'){
          formData.append(key,data[key]) 
      }
    })

    fetch(`https://api.treevesto.com:4000/product/`+data.id,{
      method:"PATCH",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
    })

  }


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


  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
      <AdminLayout>
        
        
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
                      <TableCell> 
                        <VerifiedUserIcon onClick={e=>updateVendor(el.email,el.assured === "1"?"0":"1")} className={el.assured === "1" ? "text-green-800 cursor-pointer":"text-gray-400 cursor-pointer"} />
                          {el.name}
                      </TableCell>
                      <TableCell>{el.email}</TableCell>
                      <TableCell>{el.phone}</TableCell>
                      {el.verified !== 0 ? <TableCell className="text-success">Verified</TableCell>:<TableCell className="text-danger">Pending</TableCell>}
                      <TableCell>
                        {/* {el.assured === "0"? <>
                          <CategoryIcon  className="cursor-pointer text-primary" />
                        </>:<></>} */}
                        <CloseIcon  onClick={e=>deleteVendor(el._id)} className="cursor-pointer text-danger" />
                      </TableCell>
                        
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
                  <div key={key} className="bg-white border shadow-sm relative">
                    <img src={"https://api.treevesto.com:4000/"+el.productImages[0]} alt=""/>
                    <div className="p-1">
                      <div>
                        <span className="text-sm"> {el.productName.lengTableCell>16?el.productName.substr(0,16):el.productName} </span>
                        <span className="text-sm"> {el.productName.lengTableCell>16?"...":""} </span>
                        <div> Rs. {el.sellingPrice}  </div>
                        <MaterialModal name="Add Tags" label={<LocalOfferIcon className="cursor-pointer absolute top-0 right-0 m-1 text-blue-800" />} 
                        content={<> 
                          <form onSubmit={handleSubmit(updateProduct)} > 
                            <input type="hidden" name="id" defaultValue={el._id} ref={register()} className="form-control m-2" />
                            <input type="text" name="Meta_Keywords" defaultValue={el.Meta_Keywords} ref={register()} className="form-control m-2" placeholder="Meta_Keywords" />
                            <input type="text" name="Meta_Data" defaultValue={el.Meta_Data} ref={register()} className="form-control m-2" placeholder="Meta_Data" />
                            <textarea name="Meta_Description" defaultValue={el.Meta_Description} ref={register()} className="form-control m-2" placeholder="Meta_Description" cols={30} rows={4}></textarea>
                            <input type="text" name="Meta_image_URL" defaultValue={el.Meta_image_URL} ref={register()} className="form-control m-2" placeholder="Meta_image_URL" />

                            <div className="text-right">
                                <Button type="submit" variant="contained" color="secondary">
                                  Submit
                                </Button>
                            </div>
                          </form>

                        </>} />
                        
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
    </Suspense>
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