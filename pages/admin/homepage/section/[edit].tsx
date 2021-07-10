import React, { useEffect, lazy, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import {useForm} from 'react-hook-form'

import axios from 'axios';
import https from 'https'


const AdminLayout = lazy(()=>import('../../../../component/common/AdminLayout'));

export default function EditSection(props) {
    console.log(props.section)
    const router = useRouter();
    const [isLoading,setLoading] = React.useState(false)
    const {register,setValue,handleSubmit,errors} = useForm({
        defaultValues:{
            title:props.section.title,
            position:props.section.position,
            grid:props.section.grid,
            mobileGrid:props.section.mobileGrid,
            desktopView:props.section.desktopView === "true" ? true : false,
            mobileView:props.section.mobileView === "true" ? true : false,
        }
    });
 
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
        formData.append('title',data.title)
        formData.append('grid',data.grid)
        formData.append('mobileGrid',data.mobileGrid)
        formData.append('desktopView',data.desktopView)
        formData.append('mobileView',data.mobileView)
        formData.append('position',data.position)

        fetch(`https://api.treevesto.com:4000/section/${props.section._id}`,{
                method:"PATCH",
                body:formData
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    router.push('/admin/homepage')
                }
            })
    } 

    if (!isFront) return null;

    return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
        <AdminLayout>
            {isLoading?<>
                <div className="my-4 text-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            </>:<>
            
                <div className="p-3 text-xl border shadow-sm mb-2 bg-white" style={{borderRadius:"10px"}}>Edit Section</div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-sm p-3" style={{borderRadius:"10px"}}>
                    <select name="position" id="position" className="form-select my-2" ref={register({required:true})} >
                        <option value="Top">Top</option>
                        <option value="Bottom">Bottom</option>
                    </select>
                    <input type="text" name="title" id="title" ref={register({required:true})}
                    className="form-control my-2" placeholder="Enter title of the card" />
                    <select name="grid" id="grid"  className="form-select my-2" ref={register({required:true})}>
                        <option value="">Select grid for Desktop View</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <select name="mobileGrid" id="mobileGrid"  className="form-select my-2" ref={register()}>
                        <option value="">Select grid for Mobile View</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <div className="flex-items-center">
                        <input type="checkbox" name="desktopView" id="desktopView" ref={register()} />
                        <label htmlFor="desktopView" className="mx-2">Desktop</label>
                    </div>
                    <div className="flex-items-center">
                        <input type="checkbox" name="mobileView" id="mobileView" ref={register()} />
                        <label htmlFor="mobileView" className="mx-2">Mobile</label>
                    </div>
                    <div className="text-right">
                        <Button type="submit" variant="contained" color="secondary">
                        Submit
                        </Button>
                    </div>

                </form>
            
            </>}


        </AdminLayout>
    </Suspense>
}
 
export const getStaticProps = async (context) => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const section = await axios.get(`https://api.treevesto.com:4000/section/${context.params.edit}`,{httpsAgent:agent})
    
    return {
        props: {
            section:section.data.result
        }
    };
 
}

export const getStaticPaths = async () => {
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    const res = await axios.get(`https://api.treevesto.com:4000/section`,{httpsAgent:agent})
    var data = [];
    // res.data.result = res.data.result.filter(e=>(e.parentCatId != 0))
    res.data.result.forEach((el,key)=>{
      data[key] = {params:{edit:el._id}}
    })
    
    return {
      paths: data,
      fallback: false
    };
  }