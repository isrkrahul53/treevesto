import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../component/common/layout'; 
import ProductPage from '../../component/pages/productPage';
import TextField from '@material-ui/core/TextField'
import StarRateIcon from '@material-ui/icons/StarRate';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import axios from 'axios';
import https from 'https'
import Button from '@material-ui/core/Button'
import MaterialDialog from '../../component/material/materialDialog';

function RatingUI(props){
    
    return <div className="flex items-center w-full"> 
        <span>{props.val}</span> 
        <StarRateIcon />
        <div className="w-64 border rounded border-dark">
            <div className={"bg-"+props.color+" p-1"} style={{width:props.width}}></div>
        </div>
    </div>
}

                                                         
export default function Product(props) { 
    const router = useRouter();
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }

    const [grid,setGrid] = React.useState(1);
    const [selectedImage,setSelectedImage] = React.useState(null)
    const [vendordata,setVendordata] = React.useState(null)
    const [cart,setCart] = React.useState([]);
    const [wishlist,setWishlist] = React.useState([])
    const [navigation,setNavigation] = React.useState(0)

    const handleNavigationChange  = (x) => {
        setNavigation(x)
    }

    useEffect(()=>{
        setSelectedImage(props.product?.productImages[0].src)
        fetch(`https://api.treevesto.com:4000/vendor/`+props.product.vendorId).then(d=>d.json()).then(json=>{
            setVendordata(json.result[0])
        }).catch(err=>console.log(err.message))
    },[props.product])
    


    useEffect(()=>{
        var cart = JSON.parse(localStorage.getItem('cart'))
        var wishlist = JSON.parse(localStorage.getItem('wishlist'))
        if(cart){
            setCart(cart)
        }
        if(wishlist){
            setWishlist(wishlist)
        }

    },[])

    const addtoCart = (s) => { 
        var data = cart.filter(e=>e.productId==props.product?._id)
        var x = [...cart,{
            productId:props.product?._id,qty:1,size:s,
            vendorId:props.product?.vendorId,
            image:props.product?.productImages[0].src,
            name:props.product?.productName,
            price:props.product?.sellingPrice
        }]
        if(data.length == 0){
            setCart(x)
            localStorage.setItem('cart',JSON.stringify(x));
            setSuccess('Item Added to cart')
        }else{
            setError('Already added to cart')
        }
    }
     
    const addtoWishlist = () => { 
        var data = wishlist.filter(e=>e.productId==props.product?._id)
        var x = [...wishlist,{
            productId:props.product?._id,qty:1,
            vendorId:props.product?.vendorId,
            image:props.product?.productImages[0].src,
            name:props.product?.productName,
            price:props.product?.sellingPrice
        }]
        if(data.length == 0){
            setWishlist(x)
            localStorage.setItem('wishlist',JSON.stringify(x));
            setSuccess('Item Added wishlist')
        }else{
            setError('Already added to wishlist')
        } 
      }
     
    return <div> 
        <Layout error={error} success={success} cart={cart.length} wishlist={wishlist.length}>
            <Head>
                <title>{props.product?.productName}</title>
                <meta name="description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}></meta>
                <meta property="og:title" content={props.product?.productName} />
                <meta property="og:url" content={"https://admiring-bardeen-fc41ec.netlify.app"+router.asPath} />
                <meta property="og:description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."} />
                <meta property="og:image:secure_url" content={props.product?.productImages[0].src}></meta>
                <meta property="og:type" content="article" />

            </Head>
            <div className="container">
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                        <li className="breadcrumb-item active">{props.product?.productName}</li> 
                    </ol>
                </nav>

                {grid==1?<div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <div className={"grid grid-cols-6 md:grid-cols-1 gap-2 my-2"}>
                                {props.product?.productImages.map((el,key)=>(
                                    <img key={key} src={el.src} onClick={()=>{setSelectedImage(el.src)}}
                                    className={selectedImage==el.src?"w-100 cursor-pointer border-2 border-red-500 rounded":"w-100 cursor-pointer"} />
                                ))} 
                            </div>
                        </div>
                        <div className="col-md-3">
                            <img src={selectedImage} className="w-full md:w-75" />
                        </div>
                        <div className="col-md-8">
                            <ProductPage addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} />
                        </div>
                    </div>
                </div>:<></>}
    
                <div className="my-2">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer active" onClick={e=>handleNavigationChange(0)} id="DELIVERY OPTIONS-tab" data-bs-toggle="tab" data-bs-target="#DELIVERY OPTIONS" role="tab" aria-controls="DELIVERY OPTIONS" aria-selected="true">DELIVERY OPTIONS</span>
                        </li>
                        <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer" onClick={e=>handleNavigationChange(1)} id="PRODUCT DETAILS-tab" data-bs-toggle="tab" data-bs-target="#PRODUCT DETAILS" role="tab" aria-controls="PRODUCT DETAILS" aria-selected="false">PRODUCT DETAILS</span>
                        </li>
                        <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer" onClick={e=>handleNavigationChange(2)} id="Seller DETAILS-tab" data-bs-toggle="tab" data-bs-target="#Seller DETAILS" role="tab" aria-controls="Seller DETAILS" aria-selected="false">Seller DETAILS</span>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className={navigation === 0?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="DELIVERY OPTIONS" role="tabpanel" aria-labelledby="DELIVERY OPTIONS-tab">
                            <TextField id="pincode" label="Pincode" variant="outlined" size="small" color="primary" fullWidth />
                            <p className="text-secondary">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
                            <div className="my-3">
                                <p> 100% Original Products</p>
                                <p> Free Delivery on order above Rs. 799</p>
                                <p>Pay on delivery might be available</p>
                                <p>Easy 30 days returns and exchanges</p>
                                <p>Try & Buy might be available</p> 
                            </div>
                        </div> 
                        <div className={navigation === 1?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="PRODUCT DETAILS" role="tabpanel" aria-labelledby="PRODUCT DETAILS-tab">
                            <p>{props.product?.productDesc}</p>
                        </div> 
                        <div className={navigation === 2?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="Seller DETAILS" role="tabpanel" aria-labelledby="Seller DETAILS-tab">
                            <div>Seller: <span className="text-xl px-2"> {vendordata?.store_name} </span> </div>
                            <div className="text-lg text-secondary"> {vendordata?.completeAddress}</div>
                        </div> 
                    </div>
                </div>

                <div className="my-2">
                    <div className="bg-white border shadow-sm rounded p-3">
                        <div className="flex item-center">
                            <h3 className="text-lg md:text-2xl">Ratings & Reviews</h3>
                            <div className="ml-auto">
                                <MaterialDialog button="Rate Product" title="Write a Review" id={props.product?._id} />
                            </div>
                        </div>
                        
                        <div className="my-2">
                            <div className="flex-row md:flex item-center">
                                <div className="mr-3">
                                    <div className="text-4xl">4.2 <StarRateIcon /></div>
                                    <div className="text-sm text-secondary">7,631 Ratings & 824 Reviews</div>
                                </div>
                                <div className="mr-3">
                                    <RatingUI val={5} width={"80%"} color={"success"} />
                                    <RatingUI val={4} width={"60%"} color={"success"} />
                                    <RatingUI val={3} width={"52%"} color={"success"} />
                                    <RatingUI val={2} width={"30%"} color={"warning"} />
                                    <RatingUI val={1} width={"5%"} color={"danger"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.review.map((e,k)=>(
                        <div key={k} className="bg-white border shadow-sm rounded p-3">
                            <div className="flex items-center">
                                <div className={
                                    e.rating >= 3?"bg-success text-white p-1 px-2 mr-2 rounded shadow-sm":e.rating === 2?"bg-warning text-white p-1 px-2 mr-2 rounded shadow-sm":"bg-danger text-white p-1 px-2 mr-2 rounded shadow-sm"
                                }>
                                    {e.rating}<StarRateIcon />
                                </div>
                                <h3 className="text-lg md:text-2xl">{e.title}</h3>
                            </div>
                            <div className="my-2">{e.desc}</div>
                            <div className="text-right">
                                <ThumbUpIcon className="mx-2 text-secondary cursor-pointer" /> {e.likes}
                                <ThumbDownIcon className="mx-2 text-secondary cursor-pointer" />{e.dislikes}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
 

            {/* {grid==2?<div className="flex-row md:flex items-start">
                <div className="w-full md:w-2/3 m-2 md:ml-6">
                    <div className={"grid grid-cols-"+grid+" gap-8"}>
                        {props.product?.productImages.map((el,key)=>(
                            <img key={key} src={el.src} className="w-100" />
                        ))} 
                    </div>
                    
                </div>
                <div className="w-full md:w-1/3 md:px-6"> 
                    <ProductPage addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} />

                </div>
            </div>:<></>} */}
            
            
 


        </Layout>

    </div>
}


export const getStaticProps = async (context) => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`https://api.treevesto.com:4000/product/${context.params.id}`,{httpsAgent:agent})
    const review = await axios.get(`https://api.treevesto.com:4000/review/product/${context.params.id}`,{httpsAgent:agent})
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
        product:data[0],
        review:review.data.result
      }
    };
  }

export const getStaticPaths = async () => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})

    const data = res.data.result.map((el)=>({params:{id:el._id}}))
    
    return {
      paths: data,
      fallback: false
    };
  }