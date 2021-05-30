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
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


import axios from 'axios';
import https from 'https'
import Button from '@material-ui/core/Button'
import MaterialDialog from '../../component/material/materialDialog';
import ReactMultiCarousel from '../../component/react/multiCarousel';

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
    const rating = props.review.length > 0 ? (props.review.map(e=>+e.rating).reduce((a,b)=>a+b)/props.review.length).toFixed(2) : 0
    const [grid,setGrid] = React.useState(1);
    const [selectedImage,setSelectedImage] = React.useState(null)
    const imageProps = {width: 400, height: 250, zoomWidth: 500, img: selectedImage};
    const [vendordata,setVendordata] = React.useState(null)
    const [cart,setCart] = React.useState([]);
    const [isAdded,setAdded] = React.useState(false)
    const [wishlist,setWishlist] = React.useState([])
    const [navigation,setNavigation] = React.useState(1)
    
    const [size,setSize] = React.useState([])
    const [colour,setColour] = React.useState([])

    const handleNavigationChange  = (x) => {
        setNavigation(x)
    }

    useEffect(()=>{
        setSelectedImage(props.product?.productImages[0]?.src)
        fetch(`https://api.treevesto.com:4000/vendor/`+props.product.vendorId).then(d=>d.json()).then(json=>{
            setVendordata(json.result[0])
        }).catch(err=>console.log(err.message))
        fetch(`https://api.treevesto.com:4000/product/`).then(d=>d.json()).then(json=>{
            setSize(json.result.filter(e=>e.productCode === props.product?.productCode).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
            setColour(json.result.filter(e=>e.productCode === props.product?.productCode).map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
        }).catch(err=>console.log(err.message))
    },[props.product])
    


    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            getCart(user.userId)
            getWishlist(user.userId)
        }
    },[])

    useEffect(()=>{
        cart.find(e=>e.productId === router.query.id) && setAdded(true)
    },[cart])

 

    const getCart = (x) => {
        fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{
            setCart(json.result.filter(e=>e.type === "cart"))
        })
    }
    const getWishlist = (x) => {
        fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{
            setWishlist(json.result.filter(e=>e.type === "wishlist"))
        })
    }
    const addtoCart = (s) => { 
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
          var formData = new FormData();
          formData.append("userId",user.userId)
          formData.append("productId",props.product._id)
          formData.append("vendorId",props.product.vendorId)
          formData.append("type","cart")
          formData.append("image",props.product.productImages[0]?.src)
          formData.append("name",props.product.productName)
          formData.append("price",props.product.sellingPrice)
          formData.append("qty","1")
          formData.append("stock",props.product.stock) 
          formData.append("size",s) 
    
          fetch(`https://api.treevesto.com:4000/cart/`,{
            method:"POST",
            body:formData
          }).then(d=>d.json()).then(json=>{
            if(json.success === 1){
              setSuccess('Item Added to cart')
            }else{
              setError(json.msg)
            }
          }).catch(err=>console.log(err.message))
        }else{
          router.replace("/auth/login")
        }
        // var data = cart.filter(e=>e.productId==props.product?._id)
        // var x = [...cart,{
        //     productId:props.product?._id,qty:1,size:s,
        //     vendorId:props.product?.vendorId,
        //     image:props.product?.productImages[0]?.src,
        //     name:props.product?.productName,
        //     price:props.product?.sellingPrice
        // }]
        // if(data.length == 0){
        //     setCart(x)
        //     localStorage.setItem('cart',JSON.stringify(x));
        //     setSuccess('Item Added to cart')
        // }else{
        //     setError('Already added to cart')
        // }
        
    }
    
    const addtoWishlist = () => { 
        
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
          var formData = new FormData();
          formData.append("userId",user.userId)
          formData.append("productId",props.product._id)
          formData.append("vendorId",props.product.vendorId)
          formData.append("type","wishlist")
          formData.append("image",props.product.productImages[0]?.src)
          formData.append("name",props.product.productName)
          formData.append("price",props.product.sellingPrice)
          formData.append("qty","1")
          formData.append("stock",props.product.stock) 
    
          fetch(`https://api.treevesto.com:4000/cart/`,{
            method:"POST",
            body:formData
          }).then(d=>d.json()).then(json=>{
            if(json.success === 1){
              setSuccess('Item Added to cart')
            }else{
              setError(json.msg)
            }
          }).catch(err=>console.log(err.message))
        }else{
          router.replace("/auth/login")
        }
        // var data = wishlist.filter(e=>e.productId==props.product?._id)
        // var x = [...wishlist,{
        //     productId:props.product?._id,qty:1,
        //     vendorId:props.product?.vendorId,
        //     image:props.product?.productImages[0]?.src,
        //     name:props.product?.productName,
        //     price:props.product?.sellingPrice
        // }]
        // if(data.length == 0){
        //     setWishlist(x)
        //     localStorage.setItem('wishlist',JSON.stringify(x));
        //     setSuccess('Item Added wishlist')
        // }else{
        //     setError('Already added to wishlist')
        // } 
      }
     
    return <div> 
        <Layout error={error} success={success} cart={cart.length} wishlist={wishlist.length}>
            <Head>
                <title>{props.product?.productName}</title>
                <meta name="description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}></meta>
                <meta property="og:title" content={props.product?.productName} />
                <meta property="og:url" content={"https://admiring-bardeen-fc41ec.netlify.app"+router.asPath} />
                <meta property="og:description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."} />
                <meta property="og:image:secure_url" content={props.product?.productImages[0]?.src}></meta>
                <meta property="og:type" content="article" />

            </Head>
            <div className="container">
                <nav className="breadcrumb hidden md:block" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                        <li className="breadcrumb-item"><Link href={"/"+props.product?.subcatId}>{props.catName}</Link></li> 
                        <li className="breadcrumb-item active">{props.product?.productName}</li> 
                    </ol>
                </nav>

                {grid==1?<div className="container">
                    {/* <ReactImageZoom {...imageProps} /> */}
                    <div className="w-1/2">

                    </div>
                    
                   
                    <div className="row">
                        <div className="col-md-1 hidden md:block">
                            <div className={"grid grid-cols-6 md:grid-cols-1 gap-2 my-2"}>
                                {props.product?.productImages.map((el,key)=>(
                                    <img key={key} src={el.src} onClick={()=>{setSelectedImage(el.src)}}
                                    className={selectedImage==el.src?"w-100 cursor-pointer border-2 border-gray-500 rounded":"w-100 cursor-pointer"} />
                                    ))} 
                            </div>
                        </div>
                        <div className="col-md-3 py-2">
                            {/* <img src={selectedImage} className="w-full md:w-75 hover:zoom-25" /> */}
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <React.Fragment>
                                    <div className="tools text-right">
                                        {/* <button className="btn m-1 btn-sm btn-primary" onClick={zoomIn}>+</button>
                                        <button className="btn m-1 btn-sm btn-primary" onClick={zoomOut}>-</button>
                                        <button className="btn m-1 btn-sm btn-danger" onClick={resetTransform}>x</button> */}
                                    </div>
                                    <TransformComponent>
                                    <img src={selectedImage || "image.jpg"} width="100%" alt="test" />
                                    </TransformComponent>
                                </React.Fragment>
                                )}
                            </TransformWrapper>
 

                        </div>
                        <div className="col-md-8">
                            <ProductPage isAdded={isAdded} addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} 
                            size={size} colour={colour} />
                        </div>
                    </div>
                </div>:<></>}
    
                <div className="my-2">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {/* <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer active" onClick={e=>handleNavigationChange(0)} id="DELIVERY OPTIONS-tab" data-bs-toggle="tab" data-bs-target="#DELIVERY OPTIONS" role="tab" aria-controls="DELIVERY OPTIONS" aria-selected="true">DELIVERY OPTIONS</span>
                        </li> */}
                        <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer" onClick={e=>handleNavigationChange(1)} id="PRODUCT DETAILS-tab" data-bs-toggle="tab" data-bs-target="#PRODUCT DETAILS" role="tab" aria-controls="PRODUCT DETAILS" aria-selected="false">PRODUCT DETAILS</span>
                        </li>
                        {/* <li className="nav-item" role="presentation">
                        <span className="nav-link cursor-pointer" onClick={e=>handleNavigationChange(2)} id="Seller DETAILS-tab" data-bs-toggle="tab" data-bs-target="#Seller DETAILS" role="tab" aria-controls="Seller DETAILS" aria-selected="false">Seller DETAILS</span>
                        </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        {/* <div className={navigation === 0?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="DELIVERY OPTIONS" role="tabpanel" aria-labelledby="DELIVERY OPTIONS-tab">
                            <TextField id="pincode" label="Pincode" variant="outlined" size="small" color="primary" fullWidth />
                            <p className="text-secondary">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
                            <div className="my-3">
                                <p> 100% Original Products</p>
                                <p> Free Delivery on order above Rs. 799</p>
                                <p>Pay on delivery might be available</p>
                                <p>Easy 30 days returns and exchanges</p>
                                <p>Try & Buy might be available</p> 
                            </div>
                        </div>  */}
                        <div className={navigation === 1?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="PRODUCT DETAILS" role="tabpanel" aria-labelledby="PRODUCT DETAILS-tab">
                            <p>{props.product?.productDesc}</p>
                        </div> 
                        {/* <div className={navigation === 2?"tab-pane bg-white p-4 fade show active":"tab-pane bg-white p-4 fade"} id="Seller DETAILS" role="tabpanel" aria-labelledby="Seller DETAILS-tab">
                            <div>Seller: <span className="text-xl px-2"> {vendordata?.store_name} </span> </div>
                            <div className="text-lg text-secondary"> {vendordata?.completeAddress}</div>
                        </div>  */}
                    </div>
                </div>


                <div className="my-2">
                    <div className="bg-white p-3 border">
                        <div className="flex item-center">
                            <h3 className="text-lg md:text-2xl">Ratings & Reviews</h3>
                            <div className="ml-auto">
                                <MaterialDialog button="Rate Product" title="Write a Review" id={props.product?._id} />
                            </div>
                        </div>
                        
                        <div className="my-2">
                            <div className="flex-row md:flex item-center">
                                <div className="mr-3">
                                    <div className="text-4xl">{rating} <StarRateIcon /></div>
                                    <div className="text-sm text-secondary">{props.review.length} Ratings & Reviews</div>
                                </div>
                                <div className="mr-3">
                                    <RatingUI val={5} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "5").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                    <RatingUI val={4} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "4").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                    <RatingUI val={3} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "3").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                    <RatingUI val={2} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "2").length/props.review.length)*100+"%" : 0+"%"} color={"warning"} />
                                    <RatingUI val={1} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "1").length/props.review.length)*100+"%" : 0+"%"} color={"danger"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.review.map((e,k)=>(
                        <div key={k} className="bg-white p-3 my-2 border border-left border-right border-bottom">
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

                <h3 className="text-lg md:text-2xl mt-2 px-2">Related Products</h3>
                <ReactMultiCarousel data={props.similarProduct} hideDetails={false} cart={addtoCart} />

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
    const category = await axios.get(`https://api.treevesto.com:4000/category/id/${data[0].subcatId}`,{httpsAgent:agent})
    const similarProduct = await axios.get(`https://api.treevesto.com:4000/product/subcat/${data[0].subcatId}`,{httpsAgent:agent})    

    var simData = []
    similarProduct.data.result.forEach(element => {
      var images = [];
      element.productImages.forEach(e => {
        images.push({src:"https://api.treevesto.com:4000/"+e,href:"/product/"+element._id})
      });
      simData.push({...element,productImages:images})
    }); 
    var arr = []
    var temp = simData;
    temp.map(e=>e.productCode).filter((e,k,ar)=>ar.indexOf(e) === k).map(el=>{
      arr.push(temp.filter(e=>e.productCode === el))
    })
    
    return {
      props: {
        product:data[0] || [],
        review:review.data.result,
        catName:category.data.result[0].catName,
        similarProduct:arr
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