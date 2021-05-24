import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout'
import Link from 'next/link';
import Banner from '../../../component/common/banner'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
import MaterialModal from '../../../component/material/materialModal';
import AddImagetoSectionModal from '../../../component/root/addImagetoSection';
import CloseIcon from '@material-ui/icons/Close';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'; 
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
 
import { Card, CardActions, CardContent, Avatar, CardHeader, IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
 
export default function CustomizeHomepage(props) {
    const router = useRouter(); 
    const [images,setImages] = React.useState({ 
        image:null,
        link:''
    })
    
    const [banner,setBanner] = React.useState([]) 
    const [sections,setSections] = React.useState([]) 
    const [cards,setCards] = React.useState([]) 
    const [navigation, setNavigation] = React.useState('banner');


    useEffect(()=>{
        fetchData();
    },[])
    
    const fetchData = () => {
        fetch(`https://api.treevesto.com:4000/banner`).then(d=>d.json()).then(json=>{
            setBanner(json.result.map((el,key)=>({id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.image})))
        }).catch(err=>console.log(err.message))
        fetch(`https://api.treevesto.com:4000/section`).then(d=>d.json()).then(json=>{
            setSections(json.result)
        }).catch(err=>console.log(err.message))
        fetch(`https://api.treevesto.com:4000/card`).then(d=>d.json()).then(json=>{
            setCards(json.result)
        }).catch(err=>console.log(err.message))
        
        
    }

    const handleNavigationChange = (event, newValue) => {
        setNavigation(newValue);
      };
       
    const deleteBanner = (id) => {
        if(confirm('Are you sure to delete this banner')){
            fetch(`https://api.treevesto.com:4000/banner/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    fetchData();
                    
                }
            })
        }

    }
    const deleteSection = (id) => {
        if(confirm('Are you sure to delete this section')){
            fetch(`https://api.treevesto.com:4000/section/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    fetchData();
                }
            })
        }

    }
    const deleteCard = (id) => {
        if(confirm('Are you sure to delete this card')){
            fetch(`https://api.treevesto.com:4000/card/`+id,{
                method:"DELETE",
            }).then(d=>d.json()).then(json=>{
                if(json.success == 1){
                    fetchData();
                }
            })
        
        }

    }
    const handleSubmit = (id) => {
        
        var formData = new FormData();
        formData.append('image',images.image)
        formData.append('link',images.link)
        formData.append('sectionId',id)

        fetch(`https://api.treevesto.com:4000/card`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                fetchData();
            }
        })
    }
    
    return <AdminLayout>
        

        <BottomNavigation value={navigation} onChange={handleNavigationChange}>
            <BottomNavigationAction label="Banner" value="banner" icon={<ViewCarouselIcon />} />
            <BottomNavigationAction label="Sections" value="section" icon={<ViewAgendaIcon />} />
        </BottomNavigation>
      
        {navigation === "banner" && <>
            <Card className="my-2">
                <Banner images={banner} />
            </Card>

            <div className="grid grid-cols-3 gap-4 my-2">
                {banner.map((element,key)=>(
                    <Card className="p-0">
                        <CardActions>
                            <div className="ml-auto">
                                <CloseIcon  onClick={e=>deleteBanner(element.id)} />
                            </div>
                        </CardActions>
                        <CardContent className="p-0">
                            <img key={key} src={element.src} className="w-full"  />
                        </CardContent>
                    </Card>
                ))}
            </div> 
            <div className="text-right m-3">
                <Link href="/admin/homepage/banner"><Button variant="contained" color="secondary">
                    Add New Banner +
                </Button></Link>
            </div>
        </>}

        {navigation === "section" && <>
            {sections?.map((el,key)=>(
                <Card key={key} className="my-2">
                    <CardContent>
                        <h3 className="text-3xl font-light"> {el.title} </h3>
                        <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-4"}>
                            {cards?.map((e,key)=>{ 
                                return <div key={key} className={el._id==e.sectionId?"":"d-none"}>
                                    <div className="text-right">
                                        <span className="text-xl text-danger cursor-pointer" onClick={()=>deleteCard(e._id)}>&times;</span>
                                    </div>
                                    <img src={"https://api.treevesto.com:4000/"+e.image} width="100%" className="border shadow-sm" />
                                </div> 
                            })}
                            <MaterialModal label={"Add Image"} name="Add Image" content={<AddImagetoSectionModal 
                                image={e=>setImages({...images,image:e.target.files[0]})} 
                                link={e=>setImages({...images,link:e.target.value})} 
                                value={images}
                                />} 
                                submit={()=>handleSubmit(el._id)}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={()=>router.push({pathname:"/admin/homepage/editSection",query:{id:el._id}})}>
                        Edit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={()=>deleteSection(el._id)}>
                        Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}

            <div className="text-right m-3">
                <Link href="/admin/homepage/addSection"><Button variant="contained" color="secondary">
                    Add New Section +
                </Button></Link>
            </div> 
        </>}


    </AdminLayout> 
}
 