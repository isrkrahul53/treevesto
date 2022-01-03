import React, { useEffect, lazy, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import {useForm} from 'react-hook-form' 

const AdminLayout = lazy(()=>import('../../../../component/common/AdminLayout'));

export default function EditSection() {
    
    const router = useRouter();
    const [isLoading,setLoading] = React.useState(true)
    const {register,setValue,handleSubmit,errors} = useForm();
    const [values,setValues] = React.useState(null)
    const [isFront, setIsFront] = React.useState(false);
    
    useEffect(()=>{ 
        process.nextTick(() => {
          if (globalThis.window ?? false) {
              setIsFront(true);
          }
        });
        var id = router.query.id; 
        if(id){
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}section/`+id).then(d=>d.json()).then(json=>{
                var d = json.result;
                setValues(d)
                setLoading(false)
            })
        }
        
    },[])

    
    const onSubmit = (data) => {
        var formData = new FormData();
        formData.append('title',data.title)
        formData.append('grid',data.grid)
        formData.append('mobileGrid',data.mobileGrid)
        formData.append('desktopView',data.desktopView)
        formData.append('mobileView',data.mobileView)
        formData.append('position',data.position)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}section/${router.query.id}`,{
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
                    <select name="position" id="position" defaultValue={values?.position} className="form-select my-2" ref={register({required:true})} >
                        <option value="Top">Top</option>
                        <option value="Bottom">Bottom</option>
                    </select>
                    <input type="text" name="title" id="title" defaultValue={values?.title} ref={register({required:true})}
                    className="form-control my-2" placeholder="Enter title of the card" />
                    <select name="grid" id="grid" defaultValue={values.grid} className="form-select my-2" ref={register({required:true})}>
                        <option value="">Select grid for Desktop View</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <select name="mobileGrid" id="mobileGrid" defaultValue={values?.mobileGrid} className="form-select my-2" ref={register()}>
                        <option value="">Select grid for Mobile View</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <div className="flex-items-center">
                        <input type="checkbox" name="desktopView" id="desktopView" defaultChecked={values?.desktopView === "true"?true:false} ref={register()} />
                        <label htmlFor="desktopView" className="mx-2">Desktop</label>
                    </div>
                    <div className="flex-items-center">
                        <input type="checkbox" name="mobileView" id="mobileView" defaultChecked={values?.mobileView === "true"?true:false} ref={register()} />
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
  