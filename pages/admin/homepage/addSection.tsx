import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'


export default function AddSection() {
    
    const router = useRouter();
    const [section,setSection] = React.useState({
        title:'',
        grid:"4"
    })
     

    const handleSubmit = () => {
 
        var formData = new FormData();
        formData.append('title',section.title)
        formData.append('grid',section.grid)

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

        <div className="p-3 text-xl border shadow-sm mb-2">Add New Section</div>

        <form>
            <input type="text" name="title" id="title" onChange={e=>setSection({...section,title:e.target.value})} defaultValue={section.title} className="form-control my-2" placeholder="Enter title of the card" />
            <select name="grid" id="grid" onChange={e=>setSection({...section,grid:e.target.value})} defaultValue={section.grid} className="form-select my-2">
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            
            <div className="text-right">
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                  Submit
                </Button>
            </div>

        </form>


    </AdminLayout>
}