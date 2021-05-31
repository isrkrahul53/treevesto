import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import ProductImageBanner from './productImage';
import ReactCarousel from '../react/carousel';

export default function SingleProduct(props){
    const router = useRouter();
  
    
    const [productSelected,setProductSelected] = React.useState(props.data[0])
    const [colourSelected,setColourSelected] = React.useState(0)
    const [sizeSelected,setSizeSelected] = React.useState(0)
  
    const [colour,setColour] = React.useState(props.data.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
    const [size,setSize] = React.useState(props.data.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
  
    useEffect(()=>{
      setColour(props.data.filter(e=>e.size == size[sizeSelected]).map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
      setSize(props.data.filter(e=>e.colour == colour[colourSelected]).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
      setProductSelected(props.data.find(e=>e.colour === colour[colourSelected] && e.size === size[sizeSelected]))
    },[colourSelected,sizeSelected])
  
    
    return <div className={"cursor-pointer"} >
    {/* <ProductImageBanner indicator={false} images={productSelected?.productImages} /> */}
    <ReactCarousel data={productSelected?.productImages} arrows={false} autoplayOnhover={true} />

    <div className="p-2">
        <Link href={"/product/"+productSelected._id}><div>
            <div className="text-sm text-secondary"> {productSelected?.productType} </div>
            <div className="text-sm font-normal hidden md:block">
                {productSelected?.productName.length > 18 ? productSelected?.productName.substring(0,18):productSelected?.productName}
                {productSelected?.productName.length > 18 ? " ...":""}
            </div>
            <div className="text-sm font-normal md:hidden">
                {productSelected?.productName.length > 42 ? productSelected?.productName.substring(0,42):productSelected?.productName}
                {productSelected?.productName.length > 42 ? " ...":""}
            </div>
            <div className="text-lg font-normal"> <s className="text-sm text-secondary">Rs. {productSelected?.regularPrice} </s> Rs. {productSelected?.sellingPrice}</div>
        </div></Link>
      {!props.hideDetails && <>
        <div className="flex items-center">
          {colour.map((e,k)=>(
            <span key={k} onClick={()=>setColourSelected(k)} className={k === colourSelected?"rounded-circle mr-1 border-2 border-dark":"rounded-circle border mr-1"} style={{backgroundColor:e,padding:"8px"}}></span>
          ))}
        </div>
        <div className="flex items-center my-1">
          {size.map((e,k)=>(
            <span key={k} onClick={()=>setSizeSelected(k)} className={k === sizeSelected?"rounded-circle border mr-1 border-2 border-dark":"rounded-circle border mr-1"} style={{height:"50px",width:"50px",padding:"10px",textAlign:"center"}} >{e}</span>
          ))}
        </div>
        <div className="my-2 flex items-center">
          <span  onClick={()=>props.cart(productSelected)} className="text-center py-2 w-full text-sm font-normal cursor-pointer border-1 border-yellow-800 hover:bg-yellow-800 hover:text-white">
            ADD TO CART
          </span>
        </div>
      </>}
    </div>
  </div>
  }