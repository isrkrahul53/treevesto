import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../component/common/layout'; 
import ProductPage from '../../component/pages/productPage';
import TextField from '@material-ui/core/TextField'

import axios from 'axios';
import https from 'https'

                                                         
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
    const [cart,setCart] = React.useState([]);
    const [wishlist,setWishlist] = React.useState([])
    const [navigation,setNavigation] = React.useState(0)

    const handleNavigationChange  = (x) => {
        setNavigation(x)
    }

    useEffect(()=>{
        setSelectedImage(props.product?.productImages[0].src)
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
        var data = cart.filter(e=>e.id==props.product?._id)
        var x = [...cart,{
            id:props.product?._id,qty:1,size:s,
            image:props.product?.productImages[0].src,
            name:props.product?.productName,
            price:props.product?.regularPrice
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
        var data = wishlist.filter(e=>e.id==props.product?._id)
        var x = [...wishlist,{
            id:props.product?._id,qty:1,
            image:props.product?.productImages[0].src,
            name:props.product?.productName,
            price:props.product?.regularPrice
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

            <div className="m-2 md:ml-6 my-3 flex items-start justify-between">
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                        <li className="breadcrumb-item active">{props.product?.productName}</li> 
                    </ol>
                </nav>
                
                {/* <div className="btn-group m-2">
                    <button className="btn btn-primary" disabled={grid==1} onClick={()=>{setGrid(1)}}>1</button> 
                    <button className="btn btn-primary" disabled={grid==2} onClick={()=>{setGrid(2)}}>2</button> 
                </div> */}

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
            
            {grid==1?<div className="flex-row md:flex m-2 md:ml-6">
                <div className="w-full md:w-1/3 flex items-start">
                    <div className={"grid grid-cols-1 gap-2 w-32"}>
                        {props.product?.productImages.map((el,key)=>(
                            <img src={el.src} onClick={()=>{setSelectedImage(el.src)}}
                            className={selectedImage==el.src?"w-100 cursor-pointer border-2 border-red-500 rounded":"w-100 cursor-pointer"} />
                        ))} 
                    </div>
                    <img src={selectedImage} className="w-75 mx-3" />
 
                </div>
                <div className="w-full md:w-2/3 md:px-6">
                    <ProductPage addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} />
                </div>
            </div>:<></>}

            <div className="m-2 md:ml-6 my-4">
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
                        <div>Seller: TCNS Clothing Co. Ltd</div>
                    </div> 
                </div>
            </div>
            
 


        </Layout>

    </div>
}


export const getStaticProps = async (context) => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`https://api.treevesto.com:4000/product/${context.params.id}`,{httpsAgent:agent})
    
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
        product:data[0]
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