import React from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'


export default function HomepageBanner() {
    
    const router = useRouter()

    const [values,setValues] = React.useState({
        image:null,
        link:''
    })

    const handleSubmit = () => {
 
        var formData = new FormData();
        formData.append('image',values.image)
        formData.append('link',values.link)

        fetch(`http://treevesto55.herokuapp.com/banner`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            if(json.success == 1){
                router.push('/admin/homepage')
            }
        })
    }

    return <AdminLayout>

        <div className="p-3 text-xl border shadow-sm mb-2">Banners</div>
        
        <form className="my-4">

            <input type="file" name="image" id="image" defaultValue={values.image} 
            onChange={e=>setValues({...values,image:e.target.files[0]})} className="form-control my-2"  />
            
            <input type="text" name="imagelink" id="imagelink" defaultValue={values.link} 
            onChange={e=>setValues({...values,link:e.target.value})} className="form-control my-2" 
            placeholder="Enter the link of the page to be redirected" 
            />

            <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
            </Button>

        </form>

    </AdminLayout>
}