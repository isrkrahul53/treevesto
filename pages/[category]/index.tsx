import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../component/common/layout';
import Button from '@material-ui/core/Button' 
import FilterPage from '../../component/pages/filterPage';
import MaterialChipArray from '../../component/material/chipArray';
import Banner from '../../component/common/banner';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import styles from './style.module.scss'
import CustomAlert from '../../component/common/customAlert';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FilterBar from '../../component/common/filterbar'
import axios from 'axios';
import https from 'https'


function SingleProduct(props){
  const router = useRouter();
  console.log(props.images)
  return <div className={"cursor-pointer "+styles.product} >
  <Banner indicator={false} images={props.images} />
  <footer className="text-center p-2 bg-white shadow-sm border">
    {/* <Button variant="contained" color="secondary" onClick={props.onclick} startIcon={<LocalMallOutlinedIcon />}>
      Wishlist
    </Button> */}
    <button type="button" onClick={props.onclick} className="px-4 py-1 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
    <FavoriteBorderOutlinedIcon /> Wishlist
    </button>
    
    <h5 className="py-1">Sizes : S, M, XL</h5>
  </footer>
  <section className="p-2 border bg-white shadow-sm">
    <h6> {props.name} </h6>
    <h6>Rs. <span className="text-2xl">{props.price}</span> </h6>
  </section>
</div>
}


export default function Product(props){
 

    const router = useRouter();
    
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState(""); 

    const [showFilter,setShowFilter] = React.useState(false)

    const [grid,setGrid] = React.useState(5)
    const [cart,setCart] = React.useState([])
    const [wishlist,setWishlist] = React.useState([])
    const [selectedFilters,setSelectedFilters] = React.useState(null)
    
    
    useEffect(()=>{
      var wishlist = JSON.parse(localStorage.getItem('wishlist'))
      if(wishlist){
        setWishlist(wishlist)
      }
      var cart = JSON.parse(localStorage.getItem('cart'))
      if(cart){
        setCart(cart)
      }
      
    },[])
    

    const addtoWishlist = (pro) => { 
      var data = wishlist.filter(e=>e.id==pro?._id)
      var x = [...wishlist,{
          id:pro?._id,qty:1,
          image:pro?.productImages[0].src,
          name:pro.productName,
          price:pro.regularPrice
      }]
      if(data.length == 0){
        setWishlist(x)
        localStorage.setItem('wishlist',JSON.stringify(x));
        setSuccess('Item Added to wishlist')
      }else{
        setError('Already added to wishlist')
      }
    }
    
    // FilterPage
    const [category, setCategory] = React.useState([]);
    const [colour, setColour] = React.useState([]);
    const [priceRange, setPriceRange] = React.useState([240,450]);
 
    const handleCategoryChange = (e) => {
        if(e.target.checked){
            setCategory([...category,e.target.name])
        }else{
            setCategory(category.filter(d=>d != e.target.name))
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
    
    const filterChange={handleCategoryChange,handleColourChange,handleRangeChange}
    const filterData={category,colour,priceRange}

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
                    <li className="breadcrumb-item active">{router.query.category}</li> 
                </ol>
            </nav>
          <div className="row">
            <div className="col-md-3 hidden md:block">
                <FilterPage values={filterData} change={filterChange} />

            </div>
            <div className="col-md-9">

                <div className="flex-row md:flex items-center">
                  <div className="hidden md:block">
                    <MaterialChipArray data={filterData} delCategory={e=>setCategory(category.filter((d,k)=>k!==e))} />
                  </div>
                  <article className="flex items-center justify-between md:ml-auto my-2 md:my-0">
                    <div className="hidden md:block">
                      <div className="btn-group mx-1">
                        <button className="btn btn-primary" disabled={grid==4} onClick={()=>{setGrid(4)}}>4</button>
                        <button className="btn btn-primary" disabled={grid==5} onClick={()=>{setGrid(5)}}>5</button>
                        <button className="btn btn-primary" disabled={grid==6} onClick={()=>{setGrid(6)}}>6</button>
                      </div>
                    </div>
                    <select className="form-select" name="sort" id="sort">
                      <option value="">Recommended</option>
                      <option value="">Better Discount</option>
                      <option value="">Popularity</option>
                      <option value="">Price : Low to high</option>
                      <option value="">Price : High to low</option>
                    </select>
                    <FilterBar values={filterData} change={filterChange} />
                  </article>
                </div>


                <div className={"grid grid-cols-2 md:grid-cols-"+grid+" gap-4 p-2"}>
                  {props.products?.map((el,key)=>(
                    <div key={key}>
                      <SingleProduct id={el._id} name={el.productName} price={el.regularPrice} images={el.productImages}
                      onclick={()=>{addtoWishlist(el)}} />
                    </div> 
                  ))}
                </div>

                {props.products.length == 0?<div className="p-4">
                  <div className="display-6"> No Products Available </div>
                  <div className="text-secondary"> 
                  Go to homepage 
                  <span className="cursor-pointer text-primary px-2"><Link href="/">click here</Link></span>  
                  </div>
                 
                </div>:<></>}
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

  var data = []
  res.data.result.forEach(element => {
    var images = [];
    element.productImages.forEach(e => {
      images.push({src:"https://api.treevesto.com:4000/"+e,href:"/product/"+element._id})
    });
    data.push({...element,productImages:images})
  }); 
  return {
    props: {
      products:data
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