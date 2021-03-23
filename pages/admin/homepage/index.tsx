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
  
export default function CustomizeHomepage(props) {
    const router = useRouter(); 
    const [images,setImages] = React.useState({ 
        image:null,
        link:''
    })
    console.log(props.cards)
    const [banner,setBanner] = React.useState(props.banner) 

    const deleteBanner = (id) => {
        if(confirm('Are you sure to delete this banner')){
            fetch(`http://treevesto55.herokuapp.com/banner/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    location.reload();
                }
            })
        }

    }
    const deleteSection = (id) => {
        if(confirm('Are you sure to delete this section')){
            fetch(`http://treevesto55.herokuapp.com/section/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    router.replace(router.asPath)
                }
            })
        }

    }
    const deleteCard = (id) => {
        if(confirm('Are you sure to delete this card')){
            fetch(`http://treevesto55.herokuapp.com/card/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    router.replace(router.asPath)
                }
            })
        
        }

    }
    const handleSubmit = (id) => {
        
        var formData = new FormData();
        formData.append('image',images.image)
        formData.append('link',images.link)
        formData.append('sectionId',id)

        fetch(`http://treevesto55.herokuapp.com/card`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                router.replace(router.asPath)
            }
        })
    }
    
    return <AdminLayout>
        <div className="p-3 text-xl border shadow-sm">Homepage</div>

        <div className="my-2"></div>

        <Banner images={banner} />
        <div className="grid grid-cols-3 gap-4 m-2 mx-4">
            {banner.map((element,key)=>(
                <div key={key}>
                    <div className="text-right">
                        <span className="text-xl text-danger cursor-pointer" onClick={e=>deleteBanner(element.id)}>&times;</span>
                    </div>
                    <img src={element.src} className="border shadow-sm"  />
                </div>
            ))}
        </div> 

        <div className="text-right my-3">
            <Link href="/admin/homepage/banner"><Button variant="contained" color="secondary">
                Add New Banner +
            </Button></Link>
        </div>

        {props.sections?.map((el,key)=>(
            <div key={key}>
                <h3 className="display-5 my-8 text-secondary"> {el.title} 
                </h3>
                    <span className="btn btn-primary mx-2" onClick={()=>router.push({pathname:"/admin/homepage/editSection",query:{id:el._id}})}>Edit</span> 
                    <span className="btn btn-danger mx-2" onClick={()=>deleteSection(el._id)}>Delete</span> 
                <div className={"grid grid-cols-"+el.grid+" gap-4"}>
                    {props.cards?.map((e,key)=>{ 
                        return <div key={key} className={el._id==e.sectionId?"":"d-none"}>
                            <div className="text-right">
                                <span className="text-xl text-danger cursor-pointer" onClick={()=>deleteCard(e._id)}>&times;</span>
                            </div>
                            <img src={"http://treevesto55.herokuapp.com/"+e.image} width="100%" className="border shadow-sm" />
                        </div> 
                    })}
                    <MaterialModal label={"Add Image"} name="Add Image" content={<AddImagetoSectionModal 
                        image={e=>setImages({...images,image:e.target.files[0]})} 
                        link={e=>setImages({...images,link:e.target.value})} 
                        value={images}
                        submit={()=>handleSubmit(el._id)}
                        />} 
                    />
                </div>
            
            </div>
        ))}

        


        <div className="text-right my-3">
            <Link href="/admin/homepage/addSection"><Button variant="contained" color="secondary">
                Add New Section +
            </Button></Link>
        </div>
    </AdminLayout> 
}

export const getStaticProps = async (context) => {

    var banner = await fetch(`http://treevesto55.herokuapp.com/banner`).then(d=>d.json())
    var sections = await fetch(`http://treevesto55.herokuapp.com/section`).then(d=>d.json())
    var cards = await fetch(`http://treevesto55.herokuapp.com/card`).then(d=>d.json())
    
    banner = banner.result.map((el,key)=>{
        return {id:el._id,href:el.link,src:"http://treevesto55.herokuapp.com/"+el.image}
    })

    return {
        props: {
            banner:banner,
            sections:sections.result,
            cards:cards.result,
        }
    };
}