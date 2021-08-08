import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const AdminLayout = lazy(()=>import("../../../component/common/AdminLayout"));
const BottomNavigation = lazy(()=>import('@material-ui/core/BottomNavigation'));
const BottomNavigationAction = lazy(()=>import('@material-ui/core/BottomNavigationAction'));
const CategoryIcon = lazy(()=>import('@material-ui/icons/Category'));
const AppsIcon = lazy(()=>import('@material-ui/icons/Apps'));
const FilterListIcon = lazy(()=>import('@material-ui/icons/FilterList'));
const DeleteIcon = lazy(()=>import('@material-ui/icons/Delete'));
const EditIcon = lazy(()=>import('@material-ui/icons/Edit'));
const DoneIcon = lazy(()=>import('@material-ui/icons/Done'));
const VerifiedUserIcon = lazy(()=>import('@material-ui/icons/VerifiedUser'));

import axios from 'axios';
import https from 'https' 
import Button from '@material-ui/core/Button'



const NewCategory = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div className="text-right">
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button type="button" variant="text" color="secondary" onClick={props.cancel}>
          Cancel
        </Button>
      </div>
      <input type="hidden" name="parentCatId" ref={props.required} defaultValue={props.pCatId} />
      <input type="hidden" name="parentSubCatId" ref={props.required} defaultValue={props.pSubCatId} />
      <input type="text" name="catName" className="form-control my-2" placeholder="Enter Category Name"
      ref={props.required} />
      <textarea name="desc" className="form-control my-2" cols={30} rows={5} placeholder="Write a description to this category" 
      ref={props.notReq} />
    </form>
  )
}

export default function AdminCategoryPage(props){
  const router = useRouter();
  const {register,handleSubmit,errors} = useForm()

  const [selectedCategory,setSelectedCategory] = React.useState(null); 
  const [selectedSubCategory,setSelectedSubCategory] = React.useState(null); 
  const [navigation, setNavigation] = React.useState('list');
  const [isFront, setIsFront] = React.useState(false);
  const [create,setCreate] = React.useState('')

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
  useEffect(()=>{
    process.nextTick(() => {
        if (globalThis.window ?? false) {
            setIsFront(true);
        }
    });
    
  },[])
  
  const onSubmit = (data) => {
    // console.log(data)
    var formData = new FormData();
    formData.append("parentCatId",data.parentCatId)
    formData.append("parentSubCatId",data.parentSubCatId)
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

  const updateCategory = (x,val) => {
    // console.log(x,val)
    var formData = new FormData();
    formData.append("assured",val)
    fetch(`https://api.treevesto.com:4000/category/`+x,{
      method:"PATCH",
      body:formData
    }).then(d=>d.json()).then(json=>{
      router.replace(router.asPath)
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
  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
      <AdminLayout>
        
      <div className="my-2 border shadow-sm rounded overflow-hidden">
        <BottomNavigation value={navigation} onChange={handleNavigationChange}>
            <BottomNavigationAction label="Category List" value="list" icon={<FilterListIcon />} />
            <BottomNavigationAction label="Categories" value="category" icon={<CategoryIcon />} />
            <BottomNavigationAction label="Subcategories" value="subcategory" icon={<AppsIcon />} />
        </BottomNavigation>
      </div>

      {navigation === "list"?<>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="bg-white rounded border shadow-sm">
            {props.category.map((e,key)=>(
              <div key={key} className={`flex items-center justify-between p-2 px-3 text-lg ${selectedCategory === e._id ? "bg-gray-200":""} hover:bg-gray-200 cursor-pointer`} onClick={()=>{setSelectedCategory(e._id);setSelectedSubCategory(null)}}> 
                <VerifiedUserIcon onClick={()=>updateCategory(e._id,e.assured === "1"?"0":"1")} className={e.assured === "1" ? "text-green-800 cursor-pointer":"text-gray-400 cursor-pointer"} />
                <span> {e.catName}  </span>
                <div className="ml-auto flex items-center"> 
                  <EditIcon onClick={()=>router.push("/admin/category/edit?id="+e._id)} className="text-sm hover:text-blue-500" />
                  <DeleteIcon onClick={()=>removeCategory(e._id)} className="text-sm hover:text-red-500" />
                </div>
              </div>
            ))}
            {create === 'category' ? <NewCategory cancel={e=>setCreate('')} submit={handleSubmit(onSubmit)} pCatId={"0"} pSubCatId={"0"}  required={register({required:true})} notReq={register()} />: <>
            <div className="text-end p-1">
              <Button variant="contained" color="primary" onClick={e=>setCreate('category')}>
                Add New +
              </Button>
            </div>
            </>}
            
          </div>

          {selectedCategory && <div className="bg-white rounded border shadow-sm">
            {props.categories.filter(e=>e.parentCatId === selectedCategory && e.parentSubCatId === "0").map((e,key)=>(
              <div key={key} className={`flex items-center justify-between p-2 px-3 text-lg ${selectedSubCategory === e._id ? "bg-gray-200":""} hover:bg-gray-200 cursor-pointer`} onClick={()=>setSelectedSubCategory(e._id)}>
                <VerifiedUserIcon onClick={()=>updateCategory(e._id,e.assured === "1"?"0":"1")} className={e.assured === "1" ? "text-green-800 cursor-pointer":"text-gray-400 cursor-pointer"} />
                <span>{e.catName} </span>
                <div className="ml-auto">
                  <DeleteIcon onClick={()=>removeCategory(e._id)} className="text-sm hover:text-red-500" />
                </div>
              </div>
            ))}
            {create === 'subcategory' ? <NewCategory cancel={e=>setCreate('')} submit={handleSubmit(onSubmit)} pCatId={selectedCategory} pSubCatId={"0"}  required={register({required:true})} notReq={register()} /> : <>
            <div className="text-end p-1">
              <Button variant="contained" color="primary" onClick={e=>setCreate('subcategory')}>
                Add New +
              </Button>
            </div>
            </>}
            
          </div>}

          {selectedSubCategory && <div className="bg-white rounded border shadow-sm">
            {props.categories.filter(e=>e.parentSubCatId === selectedSubCategory).map((e,key)=>(
              <div key={key} className="flex items-center justify-between p-2 px-3 text-lg hover:bg-gray-200 cursor-pointer">
                <VerifiedUserIcon onClick={()=>updateCategory(e._id,e.assured === "1"?"0":"1")} className={e.assured === "1" ? "text-green-800 cursor-pointer":"text-gray-400 cursor-pointer"} />
                <span>{e.catName} </span>
                <div className="ml-auto">
                  <DeleteIcon onClick={()=>removeCategory(e._id)} className="text-sm hover:text-red-500" />
                </div>
              </div>
            ))}
            {create === 'subsubcategory' ? <NewCategory cancel={e=>setCreate('')} submit={handleSubmit(onSubmit)} pCatId={selectedCategory} pSubCatId={selectedSubCategory}  required={register({required:true})} notReq={register()} /> : <>
            <div className="text-end p-1">
              <Button variant="contained" color="primary" onClick={e=>setCreate('subsubcategory')}>
                Add New +
              </Button>
            </div>
            </>}
            
          </div>}
          
          
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
  </Suspense>
}

export const getServerSideProps = async (context) => {

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