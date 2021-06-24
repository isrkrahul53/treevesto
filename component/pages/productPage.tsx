import React, { useEffect } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button' 
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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

    useEffect(()=>{
        fetch(`https://api.treevesto.com:4000/product`).then(d=>d.json()).then(json=>{
            var product = json.result.filter(e=>e.productCode === props.data.productCode) 
            setProducts(product)
            setSizeList(product.filter(e=>e.colour == colour).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
            setColourList(product.filter(e=>e.size == size).map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
        })
        
    },[])
    
    useEffect(()=>{
        setSizeList(products.filter(e=>e.colour == colour).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
        setColourList(products.filter(e=>e.size == size).map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
        var pid = products.filter(e=>e.colour === colour && e.size === size)[0]?._id;
        pid && router.replace("/product/"+pid)
    },[size,colour])
 
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
          <small className="text-success px-2">{(((props.data?.regularPrice - props.data?.sellingPrice)/props.data?.regularPrice)*100).toFixed(2)+"% off"}</small>
        </h4>
        <h5 className="text-success">inclusive of all taxes</h5>

        <h4 className="h5 mt-4">Select Colour</h4>
        <div className="flex flex-wrap items-center">
            {colourList.map((e,k)=>(
                <div key={k} onClick={()=>{setColour(e)}} className={colour == e?"p-1 cursor-pointer hover:shadow m-1 border-dark rounded-circle border-2":"p-1 cursor-pointer hover:shadow m-1 rounded-circle border-2"}>
                    <div className="p-2 rounded-circle" style={{backgroundColor:e}}></div>
                </div>
            ))}
        </div>
        <h4 className="h5 mt-4">Select Sizes</h4>
        <div className="flex flex-wrap items-center">
            {sizeList.map((e,k)=>(
                <div key={k} onClick={()=>{setSize(e)}} className={size == e?"cursor-pointer hover:shadow border-dark rounded-circle border-2 m-1":"cursor-pointer hover:shadow rounded-circle border-2 m-1"}   style={{height:"50px",width:"50px",padding:"10px",textAlign:"center"}}>{e}</div>
            ))}
        </div>
        <p className="my-3">
            {props.data?.productDesc.length > 140  ? props.data?.productDesc.substr(0,140) + " ..." : props.data?.productDesc}
        </p>
        {/* Mobile */}
        <div className="md:hidden flex items-center justify-around fixed left-0 bottom-0 z-50 bg-white w-full py-1" style={{zIndex:1200}} >
            <div onClick={()=>{props.addtoCart(size)}} className="w-full px-4 mx-1 py-2 cursor-pointer border-2 border-yellow-800 bg-yellow-800 text-yellow-50 hover:bg-yellow-50 hover:text-yellow-800">
                <LocalMallOutlinedIcon /> Add Bag
            </div>
            <div onClick={()=>{props.addtoWishlist()}} className="w-full p-2 mr-1 cursor-pointer border-2 border-yellow-800 bg-yellow-50 text-yellow-800">
                <FavoriteBorderOutlinedIcon /> Wishlist
            </div>
            <div className="p-2 border-2 border-dark mr-1">
                <a target="_blank" href={"whatsapp://send?text=https://admiring-bardeen-fc41ec.netlify.app"+router.asPath}>
                    <WhatsAppIcon />
                </a>

            </div>
        </div> 

        {/* Desktop */}
        <div className="md:flex items-center justify-around w-3/5 hidden my-2">
            {props.isAdded?<>
                <Link href="/checkout/cart"><div className="w-full px-4 py-2 cursor-pointer border-2 border-blue-800 bg-blue-800 text-blue-50 hover:bg-blue-50 hover:text-blue-800">
                    <LocalMallOutlinedIcon /> Go to Bag
                </div></Link>
            </>:<>
                <div onClick={()=>{props.addtoCart(size)}} className="w-full px-4 py-2 cursor-pointer border-2 border-yellow-800 bg-yellow-800 text-yellow-50 hover:bg-yellow-50 hover:text-yellow-800">
                    <LocalMallOutlinedIcon /> Add To Bag
                </div>
            </>}
            <div className="px-1"></div>
            <div onClick={()=>{props.addtoWishlist()}} className="w-full px-4 py-2 cursor-pointer border-2 border-yellow-800 bg-yellow-50 text-yellow-800">
                <FavoriteBorderOutlinedIcon /> Wishlist
            </div>
        </div> 

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