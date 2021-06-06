import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const AdminLayout = lazy(()=>import("../../../component/common/AdminLayout"));



import axios from 'axios';
import https from 'https'

export default function AdminCategoryEditPage(props){
  const router = useRouter();
  const {register,setValue,handleSubmit,errors} = useForm()

  const [selectedCategory,setSelectedCategory] = React.useState(null); 
  const [navigation, setNavigation] = React.useState('category');

  const [image,setImage] = React.useState({
    blob:null,
    dataURL:null
  })
  const [isFront, setIsFront] = React.useState(false);

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };

  useEffect(()=>{ 
    process.nextTick(() => {
        if (globalThis.window ?? false) {
            setIsFront(true);
        }
    });
    
    if(router.query.id){
        fetch(`https://api.treevesto.com:4000/category/id/`+router.query.id).then(d=>d.json()).then(json=>{
            var data = json.result[0];
            if(json.success == 1){
              setValue("catName",data.catName)
              setValue("desc",data.desc)
              setValue("Meta_Keywords",data.Meta_Keywords)
              setValue("Meta_Data",data.Meta_Data)
              setValue("Meta_Description",data.Meta_Description)
              setValue("Meta_image_URL",data.Meta_image_URL)
              data.catImage && setImage({...image,dataURL:"https://api.treevesto.com:4000/"+data.catImage})
            }
        })
    }
  },[])
  
  const renderImage = (img) => {
    
    var oFReader = new FileReader();
    oFReader.readAsDataURL(img);

    oFReader.onload = function (oFREvent) {
        setImage({blob:img,dataURL:oFREvent.target.result})
    };
  }

  const onSubmit = (data) => { 
    var formData = new FormData(); 
    image.blob && formData.append("catImage",image.blob)
    
    Object.keys(data).map((key,i)=>{
      if(data[key] != null && data[key] != ''){
          formData.append(key,data[key]) 
      }
    })

    fetch(`https://api.treevesto.com:4000/category/`+router.query.id,{
      method:"PATCH",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace("/admin/category")
    })
  }
 
  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
      <AdminLayout>
        
        <div className="row">
            <div className="col-md-4">
              <img src={image.dataURL || "/assets/icons/image.png"} className="w-full" alt="image" />
            </div>
            <div className="col-md-8 p-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" name="catImage" className="form-control my-2" onChange={e=>renderImage(e.target.files[0])} />
                <input type="text" name="catName" className="form-control my-2" placeholder="Enter Category Name *"
                ref={register({required:true})} />
                <textarea name="desc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
                ref={register()} />
                
                <input type="text" name="Meta_Keywords" ref={register()} className="form-control my-2" placeholder="Meta_Keywords" />
                <input type="text" name="Meta_Data" ref={register()} className="form-control my-2" placeholder="Meta_Data" />
                <textarea name="Meta_Description" ref={register()} className="form-control my-2" placeholder="Meta_Description" cols={30} rows={4}></textarea>
                <input type="text" name="Meta_image_URL" ref={register()} className="form-control my-2" placeholder="Meta_image_URL" />


                <div className="text-right">
                  <button type="submit" className="btn btn-primary mx-2">Submit</button>
                </div>
              </form>
            </div>
        </div>
        
    </AdminLayout>
  </Suspense>
}

export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  var categories = await axios.get(`https://api.treevesto.com:4000/category/all`,{httpsAgent:agent})
  const category = await axios.get(`https://api.treevesto.com:4000/category`,{httpsAgent:agent})
 
  categories = categories.data.result.filter(e=>e.parentCatId !== "0")

  return {
    props: {
      categories:categories, 
      category:category.data.result, 
    }
  };
}