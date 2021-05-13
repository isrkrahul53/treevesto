import React from 'react'
import { useRouter } from 'next/router';
import AdminLayout from "../../../component/common/AdminLayout";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';  

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import AddIcon from '@material-ui/icons/Add';

import CategoryIcon from '@material-ui/icons/Category';
import AppsIcon from '@material-ui/icons/Apps';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';

import { useForm } from 'react-hook-form';

import axios from 'axios';
import https from 'https'
import Button from '@material-ui/core/Button'


export default function AdminCouponsPage(props){
  
  const router = useRouter();
  const {register,handleSubmit,errors} = useForm()

  const [navigation, setNavigation] = React.useState('active');
  const [isLoading,setLoading] = React.useState(false)
  const [discountType,setDiscountType] = React.useState("Rs")

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
  
  const onSubmit = (data) => {
    setLoading(true)
    var formData = new FormData();
    formData.append("discountType",discountType)
    formData.append("couponActive","1")
    Object.keys(data).map((key,i)=>{
      if(data[key] != null && data[key] != ''){
          formData.append(key,data[key]) 
      }
    })

    fetch(`https://api.treevesto.com:4000/coupon`,{
      method:"POST",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
      setNavigation('active')
      setLoading(false)
    })
  }

  

  const updateCoupon = (id,x) => {
    var formData = new FormData();
    formData.append("couponActive",x)
    if(confirm('Are you sure to '+x==="1"?"Activate":"Deactivate"+' it !')){
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

  return <AdminLayout>
  <div className="p-3 text-xl border shadow-sm bg-white" style={{borderRadius:"10px"}}>Coupouns</div>
  
  <div className="my-2 border shadow-sm rounded overflow-hidden">
    <BottomNavigation value={navigation} onChange={handleNavigationChange}>
        <BottomNavigationAction label="Active" value="active" icon={<AccessibilityNewIcon />} />
        <BottomNavigationAction label="Disabled" value="disabled" icon={<AirlineSeatIndividualSuiteIcon />} />
        <BottomNavigationAction label="Create" value="add" icon={<AddIcon />} />
    </BottomNavigation>
  </div>

  {navigation === "active"?<>

    <table className="table table-hover border p-2 shadow-md my-2 bg-white">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Coupon Name</th>
          <th>Description</th>
          <th>Discount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.coupon.filter(e=>e.couponActive === "1").map((e,key)=>(
        <tr key={key}>
          <td> {key+1} </td>
          <td> {e.couponName} </td>
          <td> {e.couponDesc} </td>
          <td>{e.discountType === "Rs" && "Rs."} {e.discount} {e.discountType === "%" && "%"} </td>
          <td>  
              {/* <AirlineSeatIndividualSuiteIcon className="text-danger cursor-pointer" /> */}
              <Button variant="contained" color="secondary" size="small" onClick={()=>updateCoupon(e._id,"0")}>
                Disable
              </Button>
              {/* <div className="cursor-pointer" onClick={()=>removeCoupon(e._id)}>delte</div> */}
          </td>

        </tr>
        ))}
      </tbody>

    </table> 
  </>:<></>}

  {navigation === "disabled"?<>

    <table className="table table-hover border p-2 shadow-md my-2 bg-white">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Coupon Name</th>
          <th>Description</th>
          <th>Discount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.coupon.filter(e=>e.couponActive === "0").map((e,key)=>(
        <tr key={key}>
          <td> {key+1} </td>
          <td> {e.couponName} </td>
          <td> {e.couponDesc} </td>
          <td> {e.discountPercent || e.discountPrice} </td>
          <td> 
          {/* <AccessibilityNewIcon className="text-success cursor-pointer" /> */}
              <Button variant="contained" color="primary" size="small" onClick={()=>updateCoupon(e._id,"1")}>
                Activate
              </Button>
          </td>

        </tr>
        ))}
      </tbody>
    </table> 
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
      <div className="text-right">
        <button type="submit" className="btn btn-primary mx-2" disabled={isLoading}>
          {isLoading ? "Loading ....":"Submit"}
        </button>
      </div>
    </form>
  </>:<></>}

 
     
</AdminLayout> 
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