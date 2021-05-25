import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

import {useForm} from 'react-hook-form'

export default function AddSection() {
    
    const router = useRouter();
    const {register,setValue,handleSubmit,errors} = useForm();
 
    const onSubmit = (data) => {
 
        var formData = new FormData();
        formData.append('title',data.title)
        formData.append('grid',data.grid)
        formData.append('priority',data.priority)
        formData.append('position',data.position)

        fetch(`https://api.treevesto.com:4000/section`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                router.push('/admin/homepage')
            }
        })
        
    }

    return <AdminLayout>

        <div className="p-3 text-xl border shadow-sm mb-2 bg-white" style={{borderRadius:"10px"}}>Add New Section</div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-sm p-3" style={{borderRadius:"10px"}}>
            <input type="text" name="priority" id="priority" ref={register({required:true})}
            className="form-control my-2" placeholder="Enter priority of the card" />
            <select name="position" id="position" className="form-select my-2" ref={register({required:true})} >
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
            </select>
            <input type="text" name="title" id="title" ref={register({required:true})}
            className="form-control my-2" placeholder="Enter title of the card" />
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
}