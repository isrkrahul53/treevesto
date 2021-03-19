import React from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Button from '@material-ui/core/Button'


export default function HomepageBanner() {
    
    const [values,setValues] = React.useState({
        image:'',
        imglink:''
    })

    const handleSubmit = () => {

        console.log(values)
    }

    return <AdminLayout>

        <div className="p-3 text-xl border shadow-sm mb-2">Banners</div>
        
        <form className="my-4">

            <input type="file" name="image" id="image" defaultValue={values.image} className="form-control my-2"  />
            
            <input type="text" name="imagelink" id="imagelink" defaultValue={values.imglink} 
            onChange={e=>setValues({...values,imglink:e.target.value})} className="form-control my-2" 
            placeholder="Enter the link of the page to be redirected" 
            />

            <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
            </Button>

        </form>

    </AdminLayout>
}