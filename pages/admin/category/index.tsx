import React from 'react'
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

export default function AdminCategoryPage(props){
  const router = useRouter();
  const {register,handleSubmit,errors} = useForm()

  const [selectedCategory,setSelectedCategory] = React.useState(null); 
  const [navigation, setNavigation] = React.useState('category');

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
  
  const onSubmit = (data) => {
    // console.log(data)
    var formData = new FormData();
    formData.append("parentCatId",data.parentCatId)
    formData.append("catName",data.catName)
    formData.append("desc",data.desc)
    fetch(`https://api.treevesto.com:4000/category`,{
      method:"POST",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
      setNavigation('list')
    })
  }

  const removeCategory = (id) => {
    if(confirm('Are you sure to remove it !')){
      fetch(`https://api.treevesto.com:4000/category/`+id,{
        method:"DELETE",
      }).then(d=>d.json()).then(json=>{
        router.replace(router.asPath)
      })
    }
  }

  return <AdminLayout>
    
  <div className="my-2 border shadow-sm rounded overflow-hidden">
    <BottomNavigation value={navigation} onChange={handleNavigationChange}>
        <BottomNavigationAction label="Category List" value="list" icon={<FilterListIcon />} />
        <BottomNavigationAction label="Categories" value="category" icon={<CategoryIcon />} />
        <BottomNavigationAction label="Subcategories" value="subcategory" icon={<AppsIcon />} />
    </BottomNavigation>
  </div>

  {navigation === "list"?<>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="bg-white rounded border shadow-sm">
        {props.category.map((e,key)=>(
          <div key={key} className="flex items-center justify-between p-2 px-3 text-lg hover:bg-gray-200 cursor-pointer" 
          onClick={()=>setSelectedCategory(e._id)}> 
            {e.catName} 
            <div className="ml-auto">
              <DeleteIcon onClick={()=>removeCategory(e._id)} className="text-sm hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded border shadow-sm">
        {props.categories.filter(e=>e.parentCatId === selectedCategory).map((e,key)=>(
          <div key={key} className="flex items-center justify-between p-2 px-3 text-lg hover:bg-gray-200 cursor-pointer">
            {e.catName} 
            <div className="ml-auto">
              <DeleteIcon onClick={()=>removeCategory(e._id)} className="text-sm hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>

  </>:<></>}

  {navigation === "category"?<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="parentCatId" ref={register({required:true})} defaultValue={"0"} />
      <input type="text" name="catName" className="form-control my-2" placeholder="Enter Category Name"
      ref={register({required:true})} />
      <textarea name="desc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
      ref={register()} />
      <div className="text-right">
        <button type="submit" className="btn btn-primary mx-2">Submit</button>
      </div>
    </form>
  </>:<></>}
  
  {navigation === "subcategory"?<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <select name="parentCatId" className="form-select my-2" ref={register({required:true})}>
        <option value="">Select Category</option>
        {props.category.map((e,key)=>(
          <option key={key} value={e._id}> {e.catName} </option>
        ))} 
      </select>
      <input type="text" name="catName" className="form-control my-2" placeholder="Enter Subcategory Name"
      ref={register({required:true})} />
      <textarea name="desc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
      ref={register()} />
      <div className="text-right">
        <button type="submit" className="btn btn-primary mx-2">Submit</button>
      </div>
    </form>
  </>:<></>}

 
     
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