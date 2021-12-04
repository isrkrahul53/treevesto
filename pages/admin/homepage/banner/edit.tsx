import React, { useEffect, lazy, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

const AdminLayout = lazy(()=>import('../../../../component/common/AdminLayout'));
const RangeSlider = lazy(()=>import('../../../../component/material/range'));

import axios from 'axios';
import https from 'https'

export default function EditBanner(props) {
    const { register,setValue, handleSubmit, errors } = useForm();
    
    const router = useRouter()
    
    const min = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.min(a,b))-1:0;
    const max = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.max(a,b))+1:0;
    const [values,setValues] = React.useState(null)
    
    const [filters,setFilters] = React.useState({
        subcat:'',
        color:[],
        size:[],
        from:''+min,
        to:''+max
    })

     
    const [isFront, setIsFront] = React.useState(false);
    
     
    useEffect(()=>{ 
        process.nextTick(() => {
          if (globalThis.window ?? false) {
              setIsFront(true);
            }
        });
         
        
    },[])
    useEffect(()=>{
        
        var id = router.query.id; 
        if(id){
            fetch(`${process.env.NEXT_PUBLIC_apiUrl}banner/`+id).then(d=>d.json()).then(json=>{
                var d = json.result;
                if(json.success == 1){
                    setValues(d) 
                }
            })
        }
    },[router.query])
    
    useEffect(()=>{
        var data = values?.link.split("/")[1]?.split("?");
        if(data){
            setFilters({...filters,
                subcat:data ? data[0]:'',
                color:data ? data[1]?.split("&").find(e=>e.indexOf("color")>=0).split("=")[1].split(","):[],
                size:data ? data[1]?.split("&").find(e=>e.indexOf("size")>=0).split("=")[1].split(","):[],
                from:data ? data[1]?.split("&").find(e=>e.indexOf("from")>=0).split("=")[1]:'',
                to:data ? data[1]?.split("&").find(e=>e.indexOf("to")>=0).split("=")[1]:'',
            })
            handleFiltersChange()


        }
    },[values])

    useEffect(()=>{
        handleFiltersChange()
    },[filters])

    const handleFiltersChange = () => {
        
        var link = '/';
        link += filters.subcat && filters.subcat + "?"
        link += filters.color?.length > 0 ? 'color='+filters.color?.join(",")+"&":''
        link += filters.size?.length > 0 ? 'size='+filters.size?.join(",")+"&":''
        link += filters.from && 'from='+filters.from+"&"
        link += filters.to && 'to='+filters.to+"&"
        setValue("link",link.substr(0,link?.length-1))
    }

    const addColourFilter = (e) => {
        filters.color?.find(a=>a==e) ? setFilters({...filters,color:[...filters.color?.filter(a=>a!=e)]}):setFilters({...filters,color:[...filters.color,e]})
    }
    const addSizeFilter = (e) => {
        filters.size?.find(a=>a==e) ? setFilters({...filters,size:[...filters.size?.filter(a=>a!=e)]}):setFilters({...filters,size:[...filters.size,e]})
    }

    const onSubmit = (data) => {
        console.log(data)
        var formData = new FormData();
        formData.append('image',data.image[0] || values?.image)
        formData.append('mobileImage',data.mobileImage[0] || values?.mobileImage)
        formData.append('link',data.link)
        formData.append('Meta_Keywords',data.Meta_Keywords)
        formData.append('Meta_Data',data.Meta_Data)
        formData.append('Meta_Description',data.Meta_Description)
        formData.append('Meta_image_URL',data.Meta_image_URL)

        fetch(`${process.env.NEXT_PUBLIC_apiUrl}banner/${values?._id}`,{
            method:"PATCH",
            body:formData
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            if(json.success == 1){
                router.push('/admin/homepage')
            }
        }).catch(err=>console.log(err.message))
    }
    if (!isFront) return null;

    return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
        <AdminLayout>

            <div className="p-3 text-xl border shadow-sm mb-2 bg-white" style={{borderRadius:"10px"}}>Banners</div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="my-2 bg-white border shadow-sm p-3" style={{borderRadius:"10px"}}>
                <div className="row">
                <label className="col-md-6 mr-auto">Desktop banner 
                <input type="file" name="image" id="image" ref={register()} className="form-control my-2"  /></label>
                <label className="col-md-6 mr-auto">Mobile Banner
                <input type="file" name="mobileImage" id="mobileImage" ref={register()}  className="form-control my-2"  /></label>
                </div>
                <input type="text" name="Meta_Keywords" defaultValue={values?.Meta_Keywords} ref={register()} className="form-control my-2" placeholder="Meta_Keywords" />
                <input type="text" name="Meta_Data" defaultValue={values?.Meta_Data} ref={register()} className="form-control my-2" placeholder="Meta_Data" />
                <textarea name="Meta_Description" defaultValue={values?.Meta_Description} ref={register()} className="form-control my-2" placeholder="Meta_Description" cols={30} rows={4}></textarea>
                <input type="text" name="Meta_image_URL" defaultValue={values?.Meta_image_URL} ref={register()} className="form-control my-2" placeholder="Meta_image_URL" />



                <input type="text" name="link" id="link" readOnly ref={register({required:true})} className="form-control my-2" 
                placeholder="Enter the link of the page to be redirected" 
                />
                
                <select name="subCatId" id="subCatId" className="form-select my-2" defaultValue={filters.subcat} onChange={e=>setFilters({...filters,subcat:e.target.value})}>
                    <option value="">Select Category</option>
                    {props.category.map((e,k)=>(
                        <option key={k} value={e._id}> {e.catName} </option>
                    ))}
                </select>
                <div className="grid lg:grid-cols-3 gap-2">
                    <div className="my-2">
                        <div className="text-lg font-medium px-1">Colour</div>
                        <div className="flex items-center flex-wrap">
                            {props.products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k).map((e,k)=>(
                                <div key={k} 
                                className={filters.color?.find(a=>a==e)?"text-sm cursor-pointer mr-1 p-2 border-2 border-dark":"text-sm cursor-pointer mr-1 p-2 border-2"} 
                                onClick={()=>addColourFilter(e)}> 
                                    {e} 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="text-lg font-medium px-1">Size</div>
                        <div className="flex items-center flex-wrap">
                            {props.products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k).map((e,k)=>(
                                <div key={k} 
                                className={filters.size?.find(a=>a==e)?"text-sm cursor-pointer mr-1 p-2 border-2 border-dark":"text-sm cursor-pointer mr-1 p-2 border-2"} 
                                onClick={()=>addSizeFilter(e)}> 
                                    {e} 
                                </div>
                            ))}
                        </div>
                    </div> 
                    <div className="my-2">
                        <div className="text-lg font-medium px-1">Price Range</div>
                        <RangeSlider min={min} max={max} change={(e,data)=>setFilters({...filters,from:data[0],to:data[1]})} value={[filters.from,filters.to]} />
                    </div>

                </div>

                <Button type="submit" variant="contained" color="secondary">
                Submit
                </Button>

            </form>

        </AdminLayout>
    </Suspense>
}
 
export const getServerSideProps = async (context) => {
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    var category = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}category/all`,{httpsAgent:agent})
    const products = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}product`,{httpsAgent:agent})
    
    category = category.data.result.filter(e=>e.parentCatId != "0")
    return {
        props: {
            category:category,
            products:products.data.result,
        }
    };
}