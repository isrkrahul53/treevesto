import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button' 
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import TextField from '@material-ui/core/TextField'
import CustomAlert from '../common/customAlert';

export default function ProductPage(props) {
     
    const [size,setSize] = React.useState("M");

    return  <div> 

        <h4 className="display-6">{props.data?.productName}</h4>
        <h5 className="text-secondary">Women Taupe & White Printed Straight Kurta</h5>

        <h4 className="display-6 mt-3">Rs. {props.data?.regularPrice}</h4>
        <h5 className="text-success">inclusive of all taxes</h5>

        <h4 className="h5 mt-4">Select Sizes</h4>
        <div className="flex flex-wrap items-center">
            <div onClick={()=>{setSize("XS")}} className={size == "XS"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XS</div>
            <div onClick={()=>{setSize("S")}} className={size == "S"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>S</div>
            <div onClick={()=>{setSize("M")}} className={size == "M"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>M</div>
            <div onClick={()=>{setSize("M/L")}} className={size == "M/L"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>M/L</div>
            <div onClick={()=>{setSize("L")}} className={size == "L"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>L</div>
            <div onClick={()=>{setSize("XL")}} className={size == "XL"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XL</div>
            <div onClick={()=>{setSize("XXL")}} className={size == "XXL"?"p-2 cursor-pointer hover:shadow m-1 border-danger rounded border-2":"p-2 cursor-pointer hover:shadow m-1 rounded border-2"}>XXL</div>
        </div>

        <div className="flex items-center my-3">
            <Button variant="contained" size="large" color="primary" onClick={()=>{props.addtoCart(size)}} startIcon={<LocalMallOutlinedIcon />}>
            Add to Bag
            </Button>
            <div className="px-1"></div>
            <Button variant="contained" color="secondary" onClick={()=>{props.addtoWishlist()}} startIcon={<FavoriteBorderOutlinedIcon />}>
            Whishlist
            </Button>

        </div>

        <hr/>
        <div className="my-3">
            <h4>Rs. {props.data?.regularPrice}</h4>
            <div>Seller: TCNS Clothing Co. Ltd</div>
        </div>
        <hr/>

        <div className="my-3">
            <h4 className="h5">DELIVERY OPTIONS </h4>
            <TextField id="pincode" label="Pincode" variant="outlined" size="small" color="secondary" fullWidth />
            <p className="text-secondary">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
            <div className="my-3">
                <p> 100% Original Products</p>
                <p> Free Delivery on order above Rs. 799</p>
                <p>Pay on delivery might be available</p>
                <p>Easy 30 days returns and exchanges</p>
                <p>Try & Buy might be available</p> 
            </div>
        </div>

        
        <div className="my-3">
            <h4 className="h5">PRODUCT DETAILS </h4>
            <p>{props.data?.productDesc}</p>


        </div>
    </div>
}