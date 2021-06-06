import React, { useEffect, lazy, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import {useForm} from 'react-hook-form'

const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));

export default function AddSection() {
    
    const router = useRouter();
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
        // console.log(data)
 
        var formData = new FormData();
        formData.append('title',data.title)
        formData.append('grid',data.grid)
        formData.append('priority',data.priority)
        formData.append('position',data.position)
        formData.append('hiddenTitle',data.hiddenTitle)

        fetch(`https://api.treevesto.com:4000/section`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                router.push('/admin/homepage')
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

            <div className="p-3 text-xl border shadow-sm mb-2 bg-white" style={{borderRadius:"10px"}}>Add New Section</div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-sm p-3" style={{borderRadius:"10px"}}>
                <input type="text" name="priority" id="priority" ref={register({required:true})}
                className="form-control my-2" placeholder="Enter priority of the card" />
                <select name="position" id="position" className="form-select my-2" ref={register({required:true})} >
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                </select>
                <div className="input-group">
                    <input type="text" name="title" id="title" ref={register({required:true})}
                    className="form-control my-2" placeholder="Enter title of the card" />
                    <div className="input-group-text">
                        <input className="form-check-input mr-2" name="hiddenTitle" type="checkbox" ref={register()} />
                    </div>
                </div>

                <select name="grid" id="grid" className="form-select my-2" ref={register({required:true})} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                
                <div className="text-right">
                    <Button type="submit" variant="contained" color="secondary">
                    Submit
                    </Button>
                </div>

            </form>


        </AdminLayout>
    </Suspense>
}