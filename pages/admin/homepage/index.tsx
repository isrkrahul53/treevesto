import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Link from 'next/link';
import Banner from '../../../component/common/banner'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
import MaterialModal from '../../../component/material/materialModal';
import AddImagetoSectionModal from '../../../component/root/addImagetoSection';

function Card(props){
    return <div className="bg-white border rounded shadow-sm mb-2">
    <div className="d-flex align-items-center justify-content-between p-3">
        <div>
            {/* <CheckIcon color={props.icon} /> */}
            <span className="p-2 h6">{props.cardName}</span>
        </div>
        <MaterialModal label={"Edit"} name={props.modalName} content={props.modalContent} />
    </div>
    <div>
        {props.child}
    </div> 
</div>
}


function Cards(props){
    
    const router = useRouter();



    return <div>
      <h3 className="display-5 my-8 text-secondary"> {props.title} 
      <span className="btn btn-primary" onClick={()=>router.push({pathname:"/admin/homepage/editSection",query:{id:0}})}>edit</span> </h3>
      <div className={"grid grid-cols-"+props.grid+" gap-4"}>
        {props.images.map((data,key)=>(
          <Link key={key} href={data.href}><img src={data.src} className="w-100" /></Link>
        ))} 
      </div>
  
    </div>
  }
  
export default function CustomizeHomepage() {
    const router = useRouter();
    
    const [images,setImages] = React.useState({
        image:'',
        path:''
    })

    const [banner,setBanner] = React.useState([
        {src:'/assets/images/banner/banner1.jpg',href:'/product'},
        {src:'/assets/images/banner/banner2.jpg',href:'/product'},
        {src:'/assets/images/banner/banner3.jpg',href:'/product'},
    ])

    
    return <AdminLayout>
        <div className="p-3 text-xl border shadow-sm">Homepage</div>

        <div className="my-2"></div>

        <Banner images={banner} />
        <div className="grid grid-cols-3 gap-4 m-2 mx-4">
            {banner.map((element,key)=>(
                <Link key={key} href={element.href}><img src={element.src} className="border shadow-sm"  /></Link>
            ))}
        </div> 

        <div className="text-right my-3">
            <Link href="/admin/homepage/banner"><Button variant="contained" color="secondary">
                Add New Banner +
            </Button></Link>
        </div>

        <div>
            <h3 className="display-5 my-8 text-secondary"> SEction title 
            <span className="btn btn-primary" onClick={()=>router.push({pathname:"/admin/homepage/editSection",query:{id:0}})}>edit</span> </h3>
            <div className={"grid grid-cols-4 gap-4"}>
                {/* <img src="/assets/images/dealsOfDay/image1.jpg" width="80px" /> */}
                <MaterialModal label={"Add Image"} name="Add Image" content={<AddImagetoSectionModal 
                    image={e=>setImages({...images,image:e.target.value})} 
                    path={e=>setImages({...images,path:e.target.value})} 
                    value={images}
                />} />
            </div>
        
        </div>

        


        <div className="text-right my-3">
            <Link href="/admin/homepage/addSection"><Button variant="contained" color="secondary">
                Add New Card +
            </Button></Link>
        </div>
    </AdminLayout> 
}