import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../component/common/layout';
import FilterPage from '../../component/pages/filterPage';
import MaterialChipArray from '../../component/material/chipArray';
import axios from 'axios';
import https from 'https'
import SingleProduct from '../../component/product/singleProduct';
import Filterbar from '../../component/common/filterbar';


export default function Product(props){
  
  const router = useRouter();
  
  const [error,setError] = React.useState("");
  const [success,setSuccess] = React.useState(""); 
  
  const min = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.min(a,b))-1:0;
  const max = props.products?.length > 0?props.products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.max(a,b))+1:0;
  const [showFilter,setShowFilter] = React.useState(false)
  const [grid,setGrid] = React.useState(5)
  const [products,setProducts] = React.useState([])
  const [cart,setCart] = React.useState([])
  const [wishlist,setWishlist] = React.useState([])
  const [selectedFilters,setSelectedFilters] = React.useState(null)
  
  
  useEffect(()=>{
    var cart = JSON.parse(localStorage.getItem('cart'))
    if(cart){
      setCart(cart)
    }
    var colourFilter = "",sizeFilter = "",fromFilter = "",toFilter = ""
    colourFilter += router.query.color || ""
    sizeFilter += router.query.size || ""
    fromFilter += router.query.from || min
    toFilter += router.query.to || max
    setColour(colourFilter.split(",").filter(e=>e!=""))
    setSize(sizeFilter.split(",").filter(e=>e!=""))
    setPriceRange([fromFilter,toFilter])
    filterProduct(colourFilter,sizeFilter,fromFilter,toFilter)
  },[])
  
  
  const addtoCart = (pro) => { 
    var data = cart.filter(e=>e.productId==pro._id)
    var x = [...cart,{
        productId:pro._id,qty:1,size:pro.size,
        vendorId:pro.vendorId,
        image:pro.productImages[0].src,
        name:pro.productName,
        price:pro.sellingPrice
    }]
    if(data.length == 0){
        setCart(x)
        localStorage.setItem('cart',JSON.stringify(x));
        setSuccess('Item Added to cart')
    }else{
        setError('Already added to cart')
    }
}
  
  // FilterPage
  const [size, setSize] = React.useState([]);
  const [colour, setColour] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([min,max]);
  const filterData={size,colour,priceRange}

  useEffect(()=>{
    var colourFilter="color=",sizeFilter="size=",fromFilter="from=",toFilter="to=";
    filterData.colour.map((e,k)=>colourFilter+=k!=0?","+e:""+e)
    filterData.size.map((e,k)=>sizeFilter+=k!=0?","+e:""+e)
    fromFilter += filterData.priceRange[0].toString()
    toFilter += filterData.priceRange[1].toString()
    filterProduct(colourFilter,sizeFilter,fromFilter,toFilter) 
    // router.replace("/"+router.query.category+"?"+colourFilter+"&"+sizeFilter+"&"+fromFilter+"&"+toFilter)
  },[filterData.colour,filterData.size,filterData.priceRange])

  const filterProduct = (colour,size,from,to) => {
    setProducts([])
    fetch(`https://api.treevesto.com:4000/product/filter?`+colour+`&`+size+`&`+from+`&`+to+`&catId=`+router.query.category).then(d=>d.json()).then(json=>{
      if(json.success === 1){
        var data = []
        json.result.forEach(element => {
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
        
        setProducts(arr)
      }
    }).catch(err=>console.log(err))

  }

  const handleSizeChange = (e) => {
      if(e.target.checked){
          setSize([...size,e.target.name])
      }else{
          setSize(size.filter(d=>d != e.target.name))
      }
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
  
  const filterChange={handleSizeChange,handleColourChange,handleRangeChange}

  return <div>
    <Head>
      <title>Products</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <Layout error={error} success={success} cart={cart.length} wishlist={wishlist.length}>
      

      <div className="container my-4">
          <nav className="breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                  <li className="breadcrumb-item active"> {props.catName} </li> 
              </ol>
          </nav>
        <div className="row">
            {props.products.length != 0?<>
              <div className="col-md-3 hidden md:block">
                  <FilterPage values={filterData} change={filterChange} 
                  min={min} 
                  max={max} 
                  colourList={props.products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k)}
                  sizeList={props.products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k)}
                  />
              </div>
            </>:<></>}

          <div className="col-md-9 p-2 px-3">

              {props.products.length == 0?<div className="p-4">
                <div className="display-6"> No Products Available </div>
                <div className="text-secondary"> 
                Go to homepage 
                <span className="cursor-pointer text-primary px-2"><Link href="/">click here</Link></span>  
                </div>
              </div>:<>
                <div className="text-2xl p-2 font-normal"> {props.catName} </div>
                <div className="flex-row md:flex items-center">
                  <div className="hidden md:block">
                    <MaterialChipArray data={filterData} 
                    delSize={e=>setSize(size.filter((d,k)=>k!==e))}
                    delColour={e=>setColour(size.filter((d,k)=>k!==e))}
                    />
                  </div>
                  <Filterbar values={filterData} change={filterChange}
                  min={min} 
                  max={max} 
                  colourList={props.products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k)}
                  sizeList={props.products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k)}
                  />
                  {/* <article className="flex items-center justify-between md:ml-auto my-2 md:my-0">
                    <select className="form-select" name="sort" id="sort">
                      <option value="">Recommended</option>
                      <option value="">Better Discount</option>
                      <option value="">Popularity</option>
                      <option value="">Price : Low to high</option>
                      <option value="">Price : High to low</option>
                    </select>
                  </article> */}
                </div>
                {products.length > 0 ?<>
                  <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2"}>
                    {products?.map((el,key)=>(
                      <div key={key}>
                        <SingleProduct data={el} cart={addtoCart} />
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

      
        {/* <div className={"bg-white w-full border shadow-sm rounded p-4 "+styles.filter}>
          <FilterPage />
        </div>
      {showFilter?<>
      </>:<></>} */}

    </Layout>

  </div>
}

export const getStaticProps = async (context) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const res = await axios.get(`https://api.treevesto.com:4000/product/subcat/${context.params.category}`,{httpsAgent:agent})
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
  res.data.result = res.data.result.filter(e=>(e.parentCatId != 0))
  res.data.result.forEach((el,key)=>{
    data[key] = {params:{category:el._id}}
  })
  
  return {
    paths: data,
    fallback: false
  };
}