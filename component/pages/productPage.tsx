import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button' 
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import TextField from '@material-ui/core/TextField'
import CustomAlert from '../common/customAlert';
import { useRouter } from 'next/router';

export default function ProductPage(props) {
    
    const router = useRouter();
    const [size,setSize] = React.useState("M");

    return  <div> 

        <h4 className="display-6">{props.data?.productName}</h4>
        <h5 className="text-secondary">Women Taupe & White Printed Straight Kurta</h5>

        <h4 className="display-6 mt-3">Rs. {props.data?.regularPrice}</h4>
        <h5 className="text-success">inclusive of all taxes</h5>

        <h4 className="h5 mt-4">Select Sizes</h4>
        <div className="flex flex-wrap items-center">
            <div onClick={()=>{setSize("XS")}} className={size == "XS"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XS</div>
            <div onClick={()=>{setSize("S")}} className={size == "S"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>S</div>
            <div onClick={()=>{setSize("M")}} className={size == "M"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>M</div>
            <div onClick={()=>{setSize("M/L")}} className={size == "M/L"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>M/L</div>
            <div onClick={()=>{setSize("L")}} className={size == "L"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>L</div>
            <div onClick={()=>{setSize("XL")}} className={size == "XL"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XL</div>
            <div onClick={()=>{setSize("XXL")}} className={size == "XXL"?"p-2 cursor-pointer hover:shadow m-1 border-dark rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XXL</div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-around fixed left-0 bottom-0 w-full py-1 border-t-2 border-dark bg-white shadow-sm">
            <div onClick={()=>{props.addtoCart(size)}} className="w-full px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                <LocalMallOutlinedIcon /> Add Bag
            </div>
            <div className="px-1"></div>
            <div onClick={()=>{props.addtoWishlist()}} className="w-full px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                <FavoriteBorderOutlinedIcon /> Wishlist
            </div>
            <div className="p-2 border-2 border-dark mx-1">
                <a target="_blank" href={"whatsapp://send?text="+router.asPath}>
                    <WhatsAppIcon />
                </a>

            </div>
        </div> 

        {/* Desktop */}
        <div className="md:flex items-center justify-around w-3/5 hidden my-2">
            <div onClick={()=>{props.addtoCart(size)}} className="w-full px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                <LocalMallOutlinedIcon /> Add To Bag
            </div>
            <div className="px-1"></div>
            <div onClick={()=>{props.addtoWishlist()}} className="w-full px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
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