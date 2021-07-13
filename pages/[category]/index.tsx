import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import https from 'https'
import MaterialChipArray from '../../component/material/chipArray';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch } from "react-redux"; 

const Layout = lazy(()=>import('../../component/common/layout'))
const FilterPage = lazy(()=>import('../../component/pages/filterPage'))
const SortByPage = lazy(()=>import('../../component/pages/sortByPage'))
const SingleProduct = lazy(()=>import('../../component/product/singleProduct'))
const Filterbar = lazy(()=>import('../../component/common/filterbar'))

export default function Product(props){

  const dispatch = useDispatch();
  const router = useRouter(); 
  // console.log(props.productsArr)
  const min = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.min(a,b))-1:0;
  const max = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.max(a,b))+1:0;
  const [products,setProducts] = React.useState([])
   
  const [isFront, setIsFront] = React.useState(false);
  
  useEffect(()=>{
    process.nextTick(() => {
      if (globalThis.window ?? false) {
          setIsFront(true);
      }
    });
    
    initializeProducts();
  },[])

  useEffect(()=>{
    initializeProducts();
  },[router.query])
  
  const initializeProducts = () => {
    setLoading(true)
    var colourFilter = "",sortFilter = "",sizeFilter = "",fromFilter = "",toFilter = ""
    colourFilter += router.query.color || ""
    sizeFilter += router.query.size || ""
    sortFilter = router.query.sort?.toString() || ""
    fromFilter += router.query.from || min
    toFilter += router.query.to || max
    setColour(colourFilter.split(",").filter(e=>e!=""))
    setSize(sizeFilter.split(",").filter(e=>e!=""))
    setPriceRange([fromFilter,toFilter])
    filterProduct(colourFilter,sizeFilter,sortFilter,fromFilter,toFilter)
    
  }
   
  
  // FilterPage
  const [isLoading,setLoading] = React.useState(false)
  const [size, setSize] = React.useState([]);
  const [colour, setColour] = React.useState([]);
  const [sort, setSort] = React.useState("latest");
  const [priceRange, setPriceRange] = React.useState([min,max]);
  const filterData={size,colour,sort,priceRange}

  useEffect(()=>{
    setLoading(true)
    var colourFilter="color=",sortFilter="sort=",sizeFilter="size=",fromFilter="from=",toFilter="to=";
    filterData.colour.map((e,k)=>colourFilter+=k!=0?","+e:""+e)
    filterData.size.map((e,k)=>sizeFilter+=k!=0?","+e:""+e)
    sortFilter += filterData.sort
    fromFilter += filterData.priceRange[0].toString()
    toFilter += filterData.priceRange[1].toString()
    filterProduct(colourFilter,sizeFilter,sortFilter,fromFilter,toFilter) 
    // router.replace("/"+router.query.category+"?"+colourFilter+"&"+sizeFilter+"&"+fromFilter+"&"+toFilter)
  },[filterData.colour,filterData.size,filterData.sort,filterData.priceRange])

  const filterProduct = async (colour,size,sort,from,to) => {
    var arr = []
    const res = await fetch(`https://api.treevesto.com:4000/product/filter?`+colour+`&`+size+`&`+sort+`&`+from+`&`+to+`&subcatId=`+router.query.category);
    const json = await res.json();
    if(json.success === 1){ 
      var temp = await json.result;
      await temp.map(e=>e.productCode).filter((e,k,ar)=>ar.indexOf(e) === k).map(el=>{
        arr.push(temp.filter(e=>e.productCode === el))
      })
      setProducts(arr)
      setLoading(false)
    }

  }

  const handleSizeChange = (e) => {
    if(e.target.checked){
        setSize([...size,e.target.name])
    }else{
        setSize(size.filter(d=>d != e.target.name))
    }
  }
  const handleSortChange = (e) => {
    setSort(e.target.value)
  }
  const handleColourChange = (e) => {
      if(e.target.checked){
          setColour([...colour,e.target.name])
      }else{
          setColour(colour.filter(d=>d != e.target.name))
      }
  }
  
  const handleRangeChange = (event, newValue) => {
      setPriceRange(newValue);
  };

  const clearAll = () => {
    setSize([])
    setColour([])
    setPriceRange([min,max])
  }

  
  const filterChange={handleSizeChange,handleSortChange,handleColourChange,handleRangeChange}
  if (!isFront) return null;

  return <div>
    <Head>
      <title> {props.catName} </title>
    </Head>
    <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
      <Layout>
        

        <div className="container my-4">
            <nav className="breadcrumb my-0" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                    <li className="breadcrumb-item active"> {props.catName} </li> 
                </ol>
            </nav>
            <div className="row m-0">
                {props.products.length != 0?<>
                  <div className="col-md-3 p-0 hidden md:block">
                    <Suspense fallback={<div>
                        <div className="container">
                          <Skeleton variant="text" className="w-1/3" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-1/3" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-1/3" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                          <Skeleton variant="text" className="w-full" />
                        </div>
                      </div>}>

                        {/* <select name="sorting" id="sorting" className="form-select">
                          <option value="popularity">Latest</option>
                          <option value="popularity">Popularity</option>
                          <option value="popularity">Price Low to High</option>
                          <option value="popularity">Price High to Low</option>
                        </select> */}
                        <SortByPage values={filterData} change={filterChange}/>

                        <FilterPage values={filterData} change={filterChange} 
                        min={min} 
                        max={max} 
                        colourList={props.products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k)}
                        sizeList={props.products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k)}
                        />

                      
                    </Suspense>
                  </div>
                </>:<></>}

              <div className="col-md-9 p-0 md:px-3">
                {/* <div className="text-3xl py-2 font-light"> {props.catName} </div> */}
                <div className="flex-row md:flex items-center">
                  <div className="hidden md:block">
                    <MaterialChipArray data={filterData} 
                    delSize={e=>setSize(size.filter((d,k)=>k!==e))}
                    delColour={e=>setColour(size.filter((d,k)=>k!==e))}
                    />
                  </div>
                  
                  <Suspense fallback={<div>
                    <Skeleton className="w-full" />
                    </div>}>
                      <Filterbar values={filterData} change={filterChange} clearAll={clearAll} chips={<MaterialChipArray data={filterData} 
                      delSize={e=>setSize(size.filter((d,k)=>k!==e))}
                      delColour={e=>setColour(size.filter((d,k)=>k!==e))}
                      />}
                      min={min} 
                      max={max} 
                      colourList={props.products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k)}
                      sizeList={props.products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k)}
                      /> 
                  </Suspense>
                </div>

                {isLoading ?<>
                  {props.products.length != 0 ? <> 
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4 my-2">
                      {[1,2,3,4].map(e=>(
                        <div key={e}>
                          <Skeleton className="my-1 w-full" variant="rect" height={140} />
                          <Skeleton className="my-1 w-full" variant="text" height={20} />
                          <Skeleton className="my-1 w-2/5" variant="text" height={20} /> 
                        </div>
                      ))}
                    </div>
                  </>:<>
                    <div className="p-4">
                      <div className="display-6"> No Products Available </div>
                      <div className="text-secondary"> 
                      Go to homepage 
                      <span className="cursor-pointer text-primary px-2"><Link href="/">click here</Link></span>  
                      </div>
                    </div>
                  </>}
                </>:<>
                  {products.length > 0 ?<>
                        <div className={"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4 p-0"}>
                          {products?.map((el,key)=>(
                            <div key={key}>
                              <Suspense fallback={<div>
                                <Skeleton className="my-1 w-full" variant="rect" height={140} />
                                <Skeleton className="w-full" variant="text" height={20} />
                                <Skeleton className="w-2/5" variant="text" height={20} />
                                </div>}>
                                  <SingleProduct data={el} dispatch={dispatch} />
                              </Suspense>

                            </div> 
                          ))}
                        </div>
                  </>:<>
                    <div className="p-4">
                      <div className="display-6"> No Products Available </div>
                      <div className="text-secondary"> 
                      Go to homepage 
                      <span className="cursor-pointer text-primary px-2"><Link href="/">click here</Link></span>  
                      </div>
                    </div>
                  </>}
                </>}


              </div>
            </div>

        </div>

         

      </Layout>
    </Suspense>

  </div>
}

export const getStaticProps = async (context) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const res = await axios.get(`https://api.treevesto.com:4000/product/cat/subcat/${context.params.category}`,{httpsAgent:agent})
  const category = await axios.get(`https://api.treevesto.com:4000/category/id/${context.params.category}`,{httpsAgent:agent})
  
  var data = []
  res.data.result.forEach(element => {
    var images = [];
    element.productImages.forEach(e => {
      images.push({src:"https://api.treevesto.com:4000/"+e,href:"/product/"+element._id})
    });
    data.push({...element,productImages:images})
  }); 
  var arr = []
  var temp = data;
  temp.map(e=>e.productCode).filter((e,k,ar)=>ar.indexOf(e) === k).map(el=>{
    arr.push(temp.filter(e=>e.productCode === el))
  })
  
  return {
    props: {
      products:data,
      productsArr:arr,
      catName:category.data.result[0].catName
    }
  };
}

export const getStaticPaths = async () => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const res = await axios.get(`https://api.treevesto.com:4000/category/all`,{httpsAgent:agent})
  var data = [];
  // res.data.result = res.data.result.filter(e=>(e.parentCatId != 0))
  res.data.result.forEach((el,key)=>{
    data[key] = {params:{category:el._id}}
  })
  
  return {
    paths: data,
    fallback: false
  };
}