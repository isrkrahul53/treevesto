import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

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

const Button = lazy(()=>import('@material-ui/core/Button'))
const AddIcon = lazy(()=>import('@material-ui/icons/Add'))
const BottomNavigation = lazy(()=>import('@material-ui/core/BottomNavigation'))
const BottomNavigationAction = lazy(()=>import('@material-ui/core/BottomNavigationAction'))
const AccessibilityNewIcon = lazy(()=>import('@material-ui/icons/AccessibilityNew'))
const AirlineSeatIndividualSuiteIcon = lazy(()=>import('@material-ui/icons/AirlineSeatIndividualSuite'))
const AdminLayout = lazy(()=>import("../../../component/common/AdminLayout"))





export default function AdminCouponsPage(props){
  
  const router = useRouter();
  const {register,handleSubmit,errors} = useForm()

  const [navigation, setNavigation] = React.useState('active');
  const [isLoading,setLoading] = React.useState(false)
  const [discountType,setDiscountType] = React.useState("Rs")
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

  
  const onSubmit = (data) => {
    setLoading(true)
    var formData = new FormData();
    Object.keys(data).map((key,i)=>{
      if(data[key] != null && data[key] != ''){
        formData.append(key,data[key]) 
      }
    })
    formData.append("discountType",discountType)
    formData.append("couponActive","1")

    fetch(`https://api.treevesto.com:4000/coupon`,{
      method:"POST",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
      setNavigation('active')
      setLoading(false)
      console.log(json)
    })
  }

  

  const updateCoupon = (id,x) => {
    var formData = new FormData();
    formData.append("couponActive",x)
    if(confirm('Are you sure to '+(x==="1"?"Activate":"Disable")+' it !')){
      fetch(`https://api.treevesto.com:4000/coupon/`+id,{
        method:"PATCH",
        body:formData
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
      })
    }
  }

  const removeCoupon = (id) => {
    if(confirm('Are you sure to remove it !')){
      fetch(`https://api.treevesto.com:4000/coupon/`+id,{
        method:"DELETE",
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
      })
    }
  }
  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
      <AdminLayout>
        
      <BottomNavigation value={navigation} onChange={handleNavigationChange}>
          <BottomNavigationAction label="Active" value="active" icon={<AccessibilityNewIcon />} />
          <BottomNavigationAction label="Disabled" value="disabled" icon={<AirlineSeatIndividualSuiteIcon />} />
          <BottomNavigationAction label="Create" value="add" icon={<AddIcon />} />
      </BottomNavigation> 

      {navigation === "active"?<>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Coupon Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.coupon.filter(e=>e.couponActive === "1").map((e,key)=>(
              <TableRow key={key}>
                <TableCell> {key+1} </TableCell>
                <TableCell> {e.couponName} </TableCell>
                <TableCell> {e.couponDesc} </TableCell>
                <TableCell>{e.discountType === "Rs" && "Rs."} {e.discount} {e.discountType === "%" && "%"} </TableCell>
                <TableCell className="flex items-center">  
                    {/* <AirlineSeatIndividualSuiteIcon className="text-danger cursor-pointer" /> */}
                    <Button variant="contained" color="secondary" size="small" onClick={()=>updateCoupon(e._id,"0")}>
                      Disable
                    </Button>
                    {/* <div className="cursor-pointer" onClick={()=>removeCoupon(e._id)}>
                      <DeleteIcon />
                    </div> */}
                </TableCell>

              </TableRow>
              ))}
            </TableBody>

          </Table> 
        </TableContainer>
      </>:<></>}

      {navigation === "disabled"?<>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Coupon Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.coupon.filter(e=>e.couponActive === "0").map((e,key)=>(
              <TableRow key={key}>
                <TableCell> {key+1} </TableCell>
                <TableCell> {e.couponName} </TableCell>
                <TableCell> {e.couponDesc} </TableCell>
                <TableCell>{e.discountType === "Rs" && "Rs."} {e.discount} {e.discountType === "%" && "%"} </TableCell>
                <TableCell className="flex items-center"> 
                {/* <AccessibilityNewIcon className="text-success cursor-pointer" /> */}
                    <Button variant="contained" color="primary" size="small" onClick={()=>updateCoupon(e._id,"1")}>
                      Activate
                    </Button>
                    {/* <div className="cursor-pointer" onClick={()=>removeCoupon(e._id)}>
                      <DeleteIcon />
                    </div> */}
                </TableCell>

              </TableRow>
              ))}
            </TableBody>
          </Table> 
        </TableContainer>
      </>:<></>}
      
      {navigation === "add"?<>
        <form onSubmit={handleSubmit(onSubmit)}>  
          <input type="text" name="couponName" className="form-control my-2" placeholder="Enter Coupon Name"
          ref={register({required:true})} /> 
          <input type="text" name="couponCode" className="form-control my-2" placeholder="Enter Coupon Code"
          ref={register({required:true})} />
          {/* {errors.couponName && errors.couponName.type==="required" && (<div className="form-text text-danger text-sm -mt-1 px-2">Coupon Name is required</div>)} */}
          <textarea name="couponDesc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
          ref={register()} /> 
          <div className="flex items-center">
            <div onClick={e=>setDiscountType("Rs")} className={discountType === "Rs"?"p-2 cursor-pointer border shadow-sm mr-1 border-dark":"p-2 cursor-pointer border shadow-sm mr-1"}>Rs.</div>
            <div onClick={e=>setDiscountType("%")} className={discountType === "%"?"p-2 cursor-pointer border shadow-sm mr-1 border-dark":"p-2 cursor-pointer border shadow-sm mr-1"}>%</div>
            <input type="number" name="discount" className="form-control my-2" placeholder="Enter Discount"
            ref={register({required:true})} /> 
          </div>
          <div className="form-check">
            <input className="form-check-input" name="hidden" ref={register()} type="checkbox" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Hidden
            </label>
          </div>

          
          <div className="text-right">
            <button type="submit" className="btn btn-primary mx-2" disabled={isLoading}>
              {isLoading ? "Loading ....":"Submit"}
            </button>
          </div>
        </form>
      </>:<></>}

    
        
    </AdminLayout>
  </Suspense>
}

export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  
  const coupon = await axios.get(`https://api.treevesto.com:4000/coupon`,{httpsAgent:agent})
 

  return {
    props: {
      coupon:coupon.data.result, 
    }
  };
}