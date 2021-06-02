import AdminLayout from "../../../component/common/AdminLayout"; 
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

  return <AdminLayout> 
  
  <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
    <input type="text" name="label" ref={register({required:true})} className="form-control m-2" placeholder="Enter lable" />
    <input type="text" name="value" ref={register({required:true})} className="form-control m-2" placeholder="Enter value" />
    
    <Button type="submit" variant="contained" color="primary">
      Add
    </Button>
  </form>
  <div className="container">
    {props.gst.map((e,k)=>(
    <div key={k} className="flex items-center justify-between">
      <div className="p-2 text-lg bg-light w-full shadow-sm border rounded"> {e.label} </div>
      <CloseIcon  onClick={()=>onDelte(e._id)} className="text-red-800 cursor-pointer" />
    </div>
    ))}
  </div>


  

  </AdminLayout> 
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

