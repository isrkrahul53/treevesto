import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import AdminLayout from "../../../component/common/AdminLayout";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';  
import CategoryIcon from '@material-ui/icons/Category';
import AppsIcon from '@material-ui/icons/Apps';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';

import { useForm } from 'react-hook-form';

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

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };

  useEffect(()=>{ 
    if(router.query.id){
        fetch(`https://api.treevesto.com:4000/category/id/`+router.query.id).then(d=>d.json()).then(json=>{
            var data = json.result[0];
            console.log(json)
            if(json.success == 1){
              setValue("catName",data.catName)
              setValue("desc",data.desc)
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
    formData.append("catName",data.catName)
    formData.append("desc",data.desc)
    formData.append("catImage",image.blob)
    fetch(`https://api.treevesto.com:4000/category/`+router.query.id,{
      method:"PATCH",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace("/admin/category")
    })
  }
 

  return <AdminLayout>
     
     <div className="row">
        <div className="col-md-4">
          <img src={image.dataURL || "/assets/icons/image.png"} className="w-full" alt="image" />
        </div>
        <div className="col-md-8 p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" name="catImage" className="form-control my-2" onChange={e=>renderImage(e.target.files[0])} />
            <input type="text" name="catName" className="form-control my-2" placeholder="Enter Category Name"
            ref={register({required:true})} />
            <textarea name="desc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
            ref={register()} />
            <div className="text-right">
              <button type="submit" className="btn btn-primary mx-2">Submit</button>
            </div>
          </form>
        </div>
     </div>
     
</AdminLayout> 
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