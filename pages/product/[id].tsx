import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../component/common/layout'; 
import ProductPage from '../../component/pages/productPage';

           







                                                         
export default function Product(props) {
    console.log(props.product)
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

            <div className="ml-6 my-3 flex items-start justify-between">
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                        <li className="breadcrumb-item active">{props.product?.productName}</li> 
                    </ol>
                </nav>
                
                <div className="btn-group m-2">
                    <button className="btn btn-primary" disabled={grid==1} onClick={()=>{setGrid(1)}}>1</button> 
                    <button className="btn btn-primary" disabled={grid==2} onClick={()=>{setGrid(2)}}>2</button> 
                </div>

            </div>

            {grid==2?<div className="flex items-start">
                <div className="w-2/3 ml-6">
                    <div className={"grid grid-cols-"+grid+" gap-8"}>
                        {props.product?.productImages.map((el,key)=>(
                            <img key={key} src={el.src} className="w-100" />
                        ))} 
                    </div>
                    
                </div>
                <div className="w-1/3 px-6"> 
                    <ProductPage addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} />

                </div>
            </div>:<></>}
            
            {grid==1?<div className="flex ml-6">
                <div className="w-1/3 flex items-start">
                    <div className={"grid grid-cols-1 gap-2 w-32"}>
                        {props.product?.productImages.map((el,key)=>(
                            <img src={el.src} onClick={()=>{setSelectedImage(el.src)}}
                            className={selectedImage==el.src?"w-100 cursor-pointer border-2 border-red-500 rounded":"w-100 cursor-pointer"} />
                        ))} 
                    </div>
                    <img src={selectedImage} className="w-75 mx-3" />
 
                </div>
                <div className="w-2/3 px-6">
                    <ProductPage addtoCart={(s)=>{addtoCart(s)}} addtoWishlist={()=>{addtoWishlist()}} data={props.product} />
                </div>
            </div>:<></>}

            
 


        </Layout>

    </div>
}


export const getStaticProps = async (context) => {
    const res = await fetch(`http://treevesto55.herokuapp.com/product/${context.params.id}`).then(d=>d.json())
    
    var data = []
    res.result.forEach(element => {
        var images = [];
        element.productImages.forEach(e => {
        images.push({src:"http://treevesto55.herokuapp.com/"+e,href:"/product/"+element._id})
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
    return {
      paths: [
        // { params: {  }}
      ],
      fallback: true
    };
  }