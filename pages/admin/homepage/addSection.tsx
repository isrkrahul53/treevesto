import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Button from '@material-ui/core/Button'


export default function AddSection() {
    
    const [section,setSection] = React.useState({
        title:'',
        grid:""
    })
     

    const handleSubmit = () => {
        
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