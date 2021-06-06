import React, { useEffect, lazy, Suspense } from 'react'
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));

import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';
import https from 'https' 
import Button from '@material-ui/core/Button'
import {useForm} from 'react-hook-form'
import { useRouter } from "next/router";

export default function AdminGSTPage(props){
console.log(props.gst)

  const router = useRouter()
  const {register,setValue,handleSubmit,errors} = useForm();
  const [isFront, setIsFront] = React.useState(false);

  useEffect(()=>{
    process.nextTick(() => {
      if (globalThis.window ?? false) {
          setIsFront(true);
      }
    });
  },[])

  
  
  const onSubmit = (data) => { 
    var formData = new FormData();
    formData.append('label',data.label)
    formData.append('value',data.value)
    
    fetch(`https://api.treevesto.com:4000/gst`,{
      method:"POST",
      body:formData
    }).then(d=>d.json()).then(json=>{
      console.log(json)
      if(json.success == 1){
        router.push('/admin/gst')
      }else{
        alert(json.msg)
      }
    }).catch(err=>console.log(err.msg))
    
  }
  const onDelte = (id) => {  
    fetch(`https://api.treevesto.com:4000/gst/`+id,{
        method:"DELETE",
    }).then(d=>d.json()).then(json=>{
      console.log(json)
        if(json.success == 1){
          router.push('/admin/gst')
        }else{
          alert(json.msg)
        }
      }).catch(err=>console.log(err.msg))
      
    }
    
  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
    <AdminLayout> 
    
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <input type="text" name="label" ref={register({required:true})} className="form-control m-2" placeholder="Enter lable" />
      <input type="text" name="value" ref={register({required:true})} className="form-control m-2" placeholder="Enter value" />
      
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
    <div className="container-fluid">
      {props.gst.map((e,k)=>(
        <div key={k} className="flex items-center justify-between">
        <div className="text-lg bg-light w-full shadow-sm border rounded p-2"> 
          <div>Label : {e.label}</div>
          <small>VAlue : {e.label}</small>
        </div>
        
      <Button type="button" onClick={()=>onDelte(e._id)} variant="text" color="primary">
        <CloseIcon />
      </Button>
        {/* <CloseIcon  onClick={()=>onDelte(e._id)} className="text-red-800 cursor-pointer" /> */}
      </div>
      ))}
    </div>


    

    </AdminLayout> 
  </Suspense>
}

export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const gst = await axios.get(`https://api.treevesto.com:4000/gst`,{httpsAgent:agent})
 

  return {
    props: {
      gst:gst.data.result, 
    }
  };
}

