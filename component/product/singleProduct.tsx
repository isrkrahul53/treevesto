import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import ProductImageBanner from './productImage';
import ReactCarousel from '../react/carousel';
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const UpdatQtyButton = (props) => {
  return <div className="flex items-center justify-between w-full border-2 border-blue-800 text-blue-800 p-0">
      <Button variant="text" size="small" color="primary" disabled={+props.cart.qty <= 0}>
      <RemoveIcon onClick={()=>props.dispatch("updateItemQty",{id:props.cart._id,qty:+props.cart.qty-1})} />
      </Button>
      <div className="text-md font-medium">{props.cart.qty}</div>
      <Button variant="text" size="small" color="primary" disabled={+props.cart.qty >= (+props.pro.stock)}>
      <AddIcon onClick={()=>props.dispatch("updateItemQty",{id:props.cart._id,qty:+props.cart.qty+1})} />
      </Button>
  </div>
}

export default function SingleProduct(props){
    const router = useRouter();
  
    const dispatch = useDispatch();
    const [cart,setCart] = React.useState(null);
    const cartPromise = useSelector((state:any)=>state.cart)
    const [wishlist,setWishlist] = React.useState(null);
    const wishlistPromise = useSelector((state:any)=>state.wishlist)
    
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
  
    cartPromise.then(d=>{
      setCart(d.find(e=>e.productId === productSelected._id))
    })
    wishlistPromise.then(d=>{
        setWishlist(d.find(e=>e.productId === productSelected._id))
    })
    
    const dispatchMiddleware = (type,payloads) => {
      var user = JSON.parse(localStorage.getItem('user'))
      if(!user){
          router.replace('/auth/login')
          return
      }
      props.dispatch({type,payloads})

  }
  
    return <div className={"cursor-pointer"} >
    {/* <ProductImageBanner indicator={false} images={productSelected?.productImages} /> */}
    {/* <Link href={"/product/"+productSelected._id}>
    </Link> */}

    <div className="p-0 pb-4 position-relative">
        <div className="position-absolute text-danger" style={{right:0,top:0,zIndex:100,margin:5}}>
        
        {wishlist ? <FavoriteIcon onClick={()=>dispatchMiddleware("deleteWishlistItem",productSelected?._id)} />:<FavoriteBorderIcon onClick={()=>dispatchMiddleware("addToWishlist",productSelected)} />}
        </div>
        <a href={"/product/"+productSelected?._id}><div>
            <ReactCarousel customHeight={true} data={[productSelected?.productImages[0]]} arrows={false} autoplayOnhover={true} />
            {/* <div className="text-sm text-secondary"> {productSelected?.productType} </div> */}
            <div className="text-lg px-1 font-light hidden md:block">
                {productSelected?.productName?.length > 46 ? productSelected?.productName.substring(0,46):productSelected?.productName}
                {productSelected?.productName?.length > 46 ? " ...":""}
            </div>
            <div className="text-sm px-1 font-normal md:hidden">
                {productSelected?.productName?.length > 32 ? productSelected?.productName.substring(0,32):productSelected?.productName}
                {productSelected?.productName?.length > 32 ? " ...":""}
            </div>
            <div className="text-sm px-1 font-normal d-flex-row"> 
              <div>
                <strong>Rs. {productSelected?.sellingPrice} </strong>
                <s className="text-sm text-secondary"> Rs. {productSelected?.regularPrice} </s> 
              </div>
              <div className='d-flex align-items-center justify-between'>
                {Math.round(((productSelected?.regularPrice - productSelected?.sellingPrice)/productSelected?.regularPrice) * 100) > 0 && <small className="text-primary">
                  ({Math.round(((productSelected?.regularPrice - productSelected?.sellingPrice)/productSelected?.regularPrice) * 100)}% OFF)
                </small>}
              </div>
              
              
            </div>
        </div></a>
      {!props.hideDetails && <>
        {/* <div className="flex items-center">
          {colour.map((e,k)=>(
            <span key={k} onClick={()=>setColourSelected(k)} className={k === colourSelected?"rounded-circle mr-1 border-2 border-dark":"rounded-circle border mr-1"} style={{backgroundColor:e,padding:"8px"}}></span>
          ))}
        </div>
        <div className="flex items-center my-1">
          {size.map((e,k)=>(
            <span key={k} onClick={()=>setSizeSelected(k)} className={k === sizeSelected?"rounded-circle border mr-1 border-2 border-dark":"rounded-circle border mr-1"} style={{height:"50px",width:"50px",padding:"10px",textAlign:"center"}} >{e}</span>
          ))}
        </div> */}
        <div className="my-2 flex items-center">
          {+productSelected?.stock <= 0 ? <>
            <span className="text-center py-2 w-full text-sm font-normal border-1 border-red-200 bg-red-200 text-red-500">
              OUT OF STOCK
            </span>
          </>:<>
              {cart?<> 
                <UpdatQtyButton pro={productSelected} cart={cart} dispatch={dispatchMiddleware} />
              </>:<> 
                <button type="button"  onClick={()=>dispatchMiddleware("addToWishlist",productSelected)} className="text-center py-2 w-full text-sm font-normal cursor-pointer border-1 border-gray-800 hover:bg-gray-800 hover:text-white">
                  ADD TO WISHLIST
                </button>
              </>}
          </>}
        </div>
      </>}
    </div>
  </div>
  }