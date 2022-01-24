import React, { useEffect } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button' 
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useSelector, useDispatch } from "react-redux";


import TextField from '@material-ui/core/TextField'
import CustomAlert from '../common/customAlert';
import { useRouter } from 'next/router';


export default function ProductPage(props) {
    
    const router = useRouter();
    const [products,setProducts] = React.useState([])
    const [colourList,setColourList] = React.useState([]);
    const [sizeList,setSizeList] = React.useState([]);
    const [colour,setColour] = React.useState(props.data.colour);
    const [size,setSize] = React.useState(props.data.size);

    const [cart,setCart] = React.useState(null);
    const [wishlist,setWishlist] = React.useState(null);
    const cartPromise = useSelector((state:any)=>state.cart)
    const wishlistPromise = useSelector((state:any)=>state.wishlist)
    
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}product`).then(d=>d.json()).then(json=>{
            var product = json.result.filter(e=>e.productCode === props.data.productCode) 
            setProducts(product)
            setSizeList(product.filter(e=>e.colour == colour).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
            setColourList(product.filter(e=>e.size == size).map(e=>({colour:e.colour,img:e.productImages[0]})).filter((e,k,ar)=>ar.indexOf(e) === k))
        })
    },[])
    
    useEffect(()=>{
        cartPromise.then(d=>setCart(d.find(e=>e.productId === props.data._id)))
        wishlistPromise.then(d=>{
            setWishlist(d.find(e=>e.productId === props.data._id))

        })
    },[cartPromise,wishlistPromise])
    

    useEffect(()=>{
        setSizeList(products.filter(e=>e.colour == colour).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
        setColourList(products.filter(e=>e.size == size).map(e=>({colour:e.colour,img:e.productImages[0]})).filter((e,k,ar)=>ar.indexOf(e) === k))
        var pid = products.filter(e=>e.colour === colour && e.size === size)[0]?._id;
        pid && router.replace("/product/"+pid)
    },[size,colour])
 


    const dispatchMiddleware = (type,payloads) => {
        var user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            router.replace('/auth/login')
            return
        }
        props.dispatch({type,payloads})

    }
    
    return  <div> 

        {props.data?.stock > 3 ? <>
            <span className="p-1 text-sm bg-success text-white">In Stock </span>
        </>:props.data?.stock > 0 ? <>
            <span className="p-1 text-sm bg-primary text-white"> Only {props.data?.stock} left </span>
        </>:<>
            <span className="p-1 text-sm bg-danger text-white">Out of Stock </span>
        </>}
        {/* <h4 className="text-xl text-secondary">{props.data?.productType}</h4> */}
        <h4 className="text-2xl">{props.data?.productName}</h4>

        <h4 className="text-3xl mt-3"> 
            {props.data?.regularPrice != props.data?.sellingPrice && <s className="text-xl pr-2 text-secondary">Rs. {props.data?.regularPrice}</s>}
          Rs. {props.data?.sellingPrice}
          {/* <small className="text-success px-2">{(((props.data?.regularPrice - props.data?.sellingPrice)/props.data?.regularPrice)*100).toFixed(2)+"% off"}</small> */}
          {Math.round(((props.data?.regularPrice - props.data?.sellingPrice)/props.data?.regularPrice) * 100) > 0 && <small className="text-primary px-2">
            {Math.round(((props.data?.regularPrice - props.data?.sellingPrice)/props.data?.regularPrice) * 100)}% OFF
            </small>}
        </h4>
        <h5 className="text-success">inclusive of all taxes</h5>

        <h4 className="h5 mt-4">Colour <span className="text-secondary"> ( {colour} ) </span> </h4>
        <div className="flex flex-wrap items-center">
            {colourList.map((e,k)=>(
                <div key={k} onClick={()=>{setColour(e.colour)}} className={colour == e?.colour?"cursor-pointer hover:shadow m-1 border-dark rounded border-2":"cursor-pointer hover:shadow m-1 rounded border-2"}>
                    {/* <div className="p-3" style={{backgroundColor:e}} title={e}></div> */}
                    <img src={process.env.NEXT_PUBLIC_apiUrl+e?.img} width="40px" className="rounded" alt="" />
                </div>
            ))}
        </div>
        <div className="d-flex align-items-center justify-content-between">
            <h4 className="h5 mt-4">Sizes <span className="text-secondary">( {size} )</span> </h4>
            <a className='cursor-pointer underline mt-4'>Size Chart</a>
        </div>
        <div className="flex flex-wrap items-center">
            {sizeList.map((e,k)=>(
                <div key={k} onClick={()=>{setSize(e)}} className={size == e?"cursor-pointer hover:shadow border-dark rounded border-2 m-1":"cursor-pointer hover:shadow rounded border-2 m-1"}   style={{height:"50px",width:"50px",padding:"10px",textAlign:"center"}}>{e}</div>
            ))}
        </div>

        {props.data?.stock > 0 && <>
        
            {/* Mobile */}
            <div className="md:hidden flex items-center justify-around fixed left-0 bottom-0 z-50 bg-white w-full py-1" style={{zIndex:1200}} >
                
                {wishlist ? <>
                    <Link href="/wishlist"><div className="w-full px-4 py-2 cursor-pointer border-2 border-blue-800 bg-blue-800 text-blue-50 hover:bg-blue-50 hover:text-blue-800">
                        <FavoriteBorderOutlinedIcon /> Wishlist
                    </div></Link>
                </>:<>
                    <button type="button" onClick={()=>dispatchMiddleware("addToWishlist",props.data)} className="w-full p-2 mr-1 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                        <FavoriteBorderOutlinedIcon /> Wishlist
                    </button>
                </>}
                {/* <div className="p-2 border-2 border-dark mr-1">
                    <a target="_blank" href={"whatsapp://send?text=https://admiring-bardeen-fc41ec.netlify.app"+router.asPath}>
                    <WhatsAppIcon />
                    </a>
                    
                </div> */}
                {cart?<>
                    <div className="flex items-center justify-between mx-1 w-full border-2 border-blue-800 text-blue-800 text-blue-50 px-1">
                        <Button variant="text" color="primary" disabled={+cart.qty <= 0}>
                        <RemoveIcon onClick={()=>dispatchMiddleware("updateItemQty",{id:cart._id,qty:+cart.qty-1})} />
                        </Button>
                        <div className="p-2 px-3 text-lg font-medium">{cart.qty}</div>
                        <Button variant="text" color="primary" disabled={+cart.qty >= (+props.data.stock)}>
                        <AddIcon onClick={()=>dispatchMiddleware("updateItemQty",{id:cart._id,qty:+cart.qty+1})} />
                        </Button>
                    </div>
                </>:<>
                    <button type="button" onClick={()=>dispatchMiddleware("addToCart",props.data)} className="w-full px-4 mx-1 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        <LocalMallOutlinedIcon /> Add Bag
                    </button>
                </>}
            </div> 

            {/* Desktop */}
            <div className="md:block items-center justify-around w-full hidden my-2">
                {cart?<>
                    {/* <Link href="/checkout/cart"><div className="w-full px-4 py-2 cursor-pointer border-2 border-blue-800 bg-blue-800 text-blue-50 hover:bg-blue-50 hover:text-blue-800">
                        <LocalMallOutlinedIcon /> Go to Bag
                    </div></Link> */}
                    <div className="flex items-center justify-between w-full border-2 border-blue-800 text-blue-800 text-blue-50 px-1">
                        <Button variant="text" color="primary" disabled={+cart.qty <= 0}>
                        <RemoveIcon onClick={()=>dispatchMiddleware("updateItemQty",{id:cart._id,qty:+cart.qty-1})} />
                        </Button>
                        <div className="p-2 px-3 text-lg font-medium">{cart.qty}</div>
                        <Button variant="text" color="primary" disabled={+cart.qty >= (+props.data.stock)}>
                        <AddIcon onClick={()=>dispatchMiddleware("updateItemQty",{id:cart._id,qty:+cart.qty+1})} />
                        </Button>
                    </div>
                </>:<>
                    <button type="button" onClick={()=>dispatchMiddleware("addToCart",props.data)} className="w-full my-1 px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        <LocalMallOutlinedIcon /> Add To Bag
                    </button>
                </>}
                <div className="px-1"></div>
                {wishlist ? <>
                    <Link href="/wishlist"><div className="w-full my-1 px-4 py-2 cursor-pointer text-center border-2 border-blue-800 bg-blue-800 text-blue-50 hover:bg-blue-50 hover:text-blue-800">
                        <FavoriteBorderOutlinedIcon /> Go to Wishlist
                    </div></Link>
                </>:<>
                    <button type="button" onClick={()=>dispatchMiddleware("addToWishlist",props.data)} className="w-full my-1 px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                        <FavoriteBorderOutlinedIcon /> Wishlist
                    </button>
                </>}
            </div> 
        
        </>}
        {/* <p className="my-3">
            {props.data?.productDesc.length > 140  ? props.data?.productDesc.substr(0,140) + " ..." : props.data?.productDesc}
        </p> */}

        {/* <hr/>
        <div className="my-3">
        <h4>Rs. {props.data?.regularPrice}</h4>
        </div>
        <hr/>
        
        <div className="my-3">
        <h4 className="h5">DELIVERY OPTIONS </h4>
        </div>
        
        
        <div className="my-3">
        <h4 className="h5">PRODUCT DETAILS </h4>
        </div> */}



        

    </div>
}