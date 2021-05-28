import { Button } from "@material-ui/core";

export default function CartItem(props) {
    return <>
        {props.cart.map((el,key)=>(
            <div key={key} className="">
                    <div className="flex items-start">
                        <img src={el.image} className="w-20 rounded" />
                        <div className="px-2">
                            <div className="text-sm font-bold">{el.name}</div>
                            <div className="text-sm text-secondary">Sold by : Flashtech Retail</div>
                            <div className="text-sm "> Size : {el.size}  </div>
                            <div className="text-sm "> Qty : {el.qty}  </div>
                        </div>
                        <div className="ml-auto text-right">
                            <div>Rs. {el.price} </div>
                            {/* <div className="text-red-500">50% OFF</div> */}
                        </div>
                    </div>
                <hr />
                <div className="my-2 flex items-center">
                    {/* <Button className="mx-2" variant="outlined" color="inherit" onClick={()=>props.deleteCartItem(el.productId)}>
                        Delete
                    </Button> */}
                    <div onClick={()=>props.deleteCartItem(el._id)} className="px-4 py-1 mx-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                        Delete
                    </div>
                    {/* <Button className="mx-2" variant="outlined" color="secondary" onClick={()=>props.movetoWishlist(el)}>
                        Move to Wishlist
                    </Button> */}
                    <div onClick={()=>props.movetoWishlist(el._id)} className="px-4 py-1 mx-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
                        Move to Wishlist
                    </div>
                </div>
            </div>
        ))}
    </>
}