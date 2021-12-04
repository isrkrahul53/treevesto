import React, { useEffect, lazy, Suspense } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const Banner = lazy(()=>import('../../../component/common/banner'));
const MaterialModal = lazy(()=>import('../../../component/material/materialModal'));
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));
const AddImagetoSectionModal = lazy(()=>import('../../../component/root/addImagetoSection'));
const CloseIcon = lazy(()=>import('@material-ui/icons/Close'));
const BottomNavigation = lazy(()=>import('@material-ui/core/BottomNavigation'));
const BottomNavigationAction = lazy(()=>import('@material-ui/core/BottomNavigationAction'));
const ViewCarouselIcon = lazy(()=>import('@material-ui/icons/ViewCarousel'));
const ViewAgendaIcon = lazy(()=>import('@material-ui/icons/ViewAgenda'));
const AddPhotoAlternateIcon = lazy(()=>import('@material-ui/icons/AddPhotoAlternate'));
const ReactBannerCarousel = lazy(()=>import('../../../component/react/bannerCarousel'))
const EditIcon = lazy(()=>import('@material-ui/icons/Edit'));


const EasyEdit = lazy(()=>import('react-easy-edit'));

import { Card, CardActions, CardContent, Avatar, CardHeader, IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
 
export default function CustomizeHomepage(props) {
        
    const isMobileDevice = useMediaQuery({
        query: "(min-device-width: 500px)",
    });

    const router = useRouter(); 
    const [images,setImages] = React.useState({ 
        image:null,
        link:'',
        Meta_Keywords:'',
        Meta_Data:'',
        Meta_Description:'',
        Meta_image_URL:'',
    })
    
    const [banner,setBanner] = React.useState([]) 
    const [sections,setSections] = React.useState([]) 
    const [cards,setCards] = React.useState([]) 
    const [closeModal,setCloseModal] = React.useState(false)
    const [navigation, setNavigation] = React.useState('banner');

    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
          if (globalThis.window ?? false) {
              setIsFront(true);
          }
        });
        fetchData();
    },[])
    
    const fetchData = () => {
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}banner`).then(d=>d.json()).then(json=>{
            console.log(json.result)
            setBanner(json.result)
        }).catch(err=>console.log(err.message))
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}section`).then(d=>d.json()).then(json=>{
            var data = json.result.sort((a,b)=>Number(a.priority) - Number(b.priority))
            setSections(data)
        }).catch(err=>console.log(err.message))
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}card`).then(d=>d.json()).then(json=>{
            setCards(json.result)
        }).catch(err=>console.log(err.message))
        
        
    }

    const handleNavigationChange = (event, newValue) => {
        setNavigation(newValue);
      };
       
      const save = (id,value) => {
          var formData = new FormData();
          formData.append('priority',value)
  
          fetch(`${process.env.NEXT_PUBLIC_apiUrl}section/`+id,{
              method:"PATCH",
              body:formData
          }).then(d=>d.json()).then(json=>{
              if(json.success == 1){
                  fetchData();
              }else{
                  alert(json.msg)
              }
          }).catch(err=>alert(err.message))
      }

       
      const hideTitle = (e,id) => {
        var formData = new FormData();
        formData.append('hiddenTitle',e.target.checked)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}section/`+id,{
            method:"PATCH",
            body:formData
        }).then(d=>d.json()).then(json=>{
            if(json.success == 1){
                fetchData();
            }else{
                alert(json.msg)
            }
        }).catch(err=>alert(err.message))
    }
  

    const deleteBanner = (id) => {
        if(confirm('Are you sure to delete this banner')){
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}banner/`+id,{
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
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}section/`+id,{
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
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}card/`+id,{
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
        formData.append('Meta_Keywords',images.Meta_Keywords)
        formData.append('Meta_Data',images.Meta_Data)
        formData.append('Meta_Description',images.Meta_Description)
        formData.append('Meta_image_URL',images.Meta_image_URL)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}card`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                fetchData(); 
                setCloseModal(true)
            }else{
                alert(json.msg)
            }
        }).catch(err=>alert(err.message))
    }
    
    if (!isFront) return null;
    
    return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
        <AdminLayout>
            

            <BottomNavigation value={navigation} onChange={handleNavigationChange}>
                <BottomNavigationAction label="Banner" value="banner" icon={<ViewCarouselIcon />} />
                <BottomNavigationAction label="Sections" value="section" icon={<ViewAgendaIcon />} />
            </BottomNavigation>
        
            {navigation === "banner" && <>
                <Card className="my-2">
                    {/* <Banner images={banner} />  */}
                    
                    
                    <ReactBannerCarousel data={banner} mobile={!isMobileDevice} arrows={true} showDots={true} />
                        
              
              
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {banner.map((element,key)=>(
                        <Card key={key} className="p-0 border-2 shadow-sm">
                            <CardActions>
                                <div className="ml-auto text-red-500">
                                    <Link href={`/admin/homepage/banner/edit?id=${element._id}`}><EditIcon className="cursor-pointer text-blue-500" /></Link>
                                    <CloseIcon className="text-red-500" onClick={e=>deleteBanner(element._id)} />
                                </div>
                            </CardActions>
                            <CardContent className="p-0 grid grid-cols-2">
                                {element.image && <img key={key} src={process.env.NEXT_PUBLIC_apiUrl+element.image} className="w-full border shadow-sm"  />}
                                {element.mobileImage && <img key={key} src={process.env.NEXT_PUBLIC_apiUrl+element.mobileImage} className="w-full border shadow-sm"  />}
                                
                            </CardContent>
                        </Card>
                    ))}
                </div> 
                <div className="text-right m-3">
                    <Link href="/admin/homepage/banner/create"><Button variant="contained" color="secondary">
                        Add New Banner +
                    </Button></Link>
                </div>
            </>}

            {navigation === "section" && <div>
                <div className="row">
                    <div className="col-md-6">
                        {sections?.filter(e=>e.position === "Top").map((el,key)=>(
                            <Card key={key} className="my-2">
                                <CardContent>
                                    <div className="flex items-center">
                                        <input className="form-check-input mr-2" name="hiddenTitle" defaultChecked={el.hiddenTitle === "true"} onChange={e=>hideTitle(e,el._id)} type="checkbox" />

                                        <h3 className="text-lg font-light">
                                            {el.hiddenTitle === "true"? <s>{el.title}</s> : el.title}
                                        </h3>
                                        <div className="text-sm md:text-lg text-blue-600 p-2">
                                            <EasyEdit type="number" onSave={(val)=>save(el._id,val)} value={el.priority} />
                                        </div>
                                    </div>
                                    <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-2"}>
                                        {cards.filter(e=>el._id === e.sectionId)?.map((e,key)=>{ 
                                            return <div key={key} className={el._id==e.sectionId?"":"d-none"}>
                                                <div className="text-right">
                                                    <span className="text-xl text-danger cursor-pointer" onClick={()=>deleteCard(e._id)}>&times;</span>
                                                </div>
                                                <img src={process.env.NEXT_PUBLIC_apiUrl+e.image} width="100%" className="border shadow-sm" />
                                            </div> 
                                        })}
                                        
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Link href={`/admin/homepage/section/edit?id=${el._id}`}><Button variant="contained" color="primary">
                                    Edit
                                    </Button></Link>
                                    <Button variant="contained" color="secondary" onClick={()=>deleteSection(el._id)}>
                                    Delete
                                    </Button>
                                    <MaterialModal label={<AddPhotoAlternateIcon className="text-blue-800 ml-auto cursor-pointer" />} name="Add Image" close={closeModal} content={<AddImagetoSectionModal 
                                        image={e=>setImages({...images,image:e.target.files[0]})} 
                                        link={e=>setImages({...images,link:e.target.value})} 
                                        Meta_Keywords={e=>setImages({...images,Meta_Keywords:e.target.value})} 
                                        Meta_Data={e=>setImages({...images,Meta_Data:e.target.value})} 
                                        Meta_Description={e=>setImages({...images,Meta_Description:e.target.value})} 
                                        Meta_image_URL={e=>setImages({...images,Meta_image_URL:e.target.value})} 
                                        value={images}
                                        submit={()=>handleSubmit(el._id)} 
                                        />} 
                                    /> 
                                </CardActions>
                            </Card>
                        ))}

                    </div>
                    <div className="col-md-6">
                        {sections?.filter(e=>e.position === "Bottom").map((el,key)=>(
                            <Card key={key} className="my-2">
                                <CardContent>
                                    <div className="flex items-center">
                                    <input className="form-check-input mr-2" name="hiddenTitle" defaultChecked={el.hiddenTitle === "true"} onChange={e=>hideTitle(e,el._id)} type="checkbox" />

                                        <h3 className="text-lg font-light">
                                        {el.hiddenTitle === "true"? <s>{el.title}</s> : el.title}
                                            
                                        </h3>
                                        <div className="text-sm md:text-lg text-blue-600 p-2">
                                            <EasyEdit type="number" onSave={(val)=>save(el._id,val)} value={el.priority} />
                                        </div>
                                    </div>
                                    <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-2"}>
                                        {cards.filter(e=>el._id === e.sectionId)?.map((e,key)=>{ 
                                            return <div key={key} className={el._id==e.sectionId?"":"d-none"}>
                                                <div className="text-right">
                                                    <span className="text-xl text-danger cursor-pointer" onClick={()=>deleteCard(e._id)}>&times;</span>
                                                </div>
                                                <img src={process.env.NEXT_PUBLIC_apiUrl+e.image} width="100%" className="border shadow-sm" />
                                            </div> 
                                        })}
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Link href={`/admin/homepage/section/edit?id=${el._id}`}><Button variant="contained" color="primary">
                                    Edit
                                    </Button></Link>
                                    <Button variant="contained" color="secondary" onClick={()=>deleteSection(el._id)}>
                                    Delete
                                    </Button>
                                    <MaterialModal label={<AddPhotoAlternateIcon className="text-blue-800 ml-auto cursor-pointer" />} name="Add Image" close={closeModal} content={<AddImagetoSectionModal 
                                        image={e=>setImages({...images,image:e.target.files[0]})} 
                                        link={e=>setImages({...images,link:e.target.value})}  
                                        Meta_Keywords={e=>setImages({...images,Meta_Keywords:e.target.value})} 
                                        Meta_Data={e=>setImages({...images,Meta_Data:e.target.value})} 
                                        Meta_Description={e=>setImages({...images,Meta_Description:e.target.value})} 
                                        Meta_image_URL={e=>setImages({...images,Meta_image_URL:e.target.value})} 
                                        value={images}
                                        submit={()=>handleSubmit(el._id)}
                                        />} 
                                    /> 
                                </CardActions>
                            </Card>
                        ))}

                    </div>
        

                </div>
                <div className="text-right m-3">
                    <Link href="/admin/homepage/section/create"><Button variant="contained" color="secondary">
                        Add New Section +
                    </Button></Link>
                </div> 
            </div>}


        </AdminLayout>
    </Suspense>
}
 