import { Button } from "@material-ui/core";
import Link from 'next/link';

export default function CartItem(props) {
    return <>
        {props.cart.map((el,key)=>(
            <tr key={key} className="border shadow-sm">
                <td className="d-flex-row d-md-flex align-items-start">
                    <span className="text-2xl cursor-pointer"  onClick={()=>props.dispatch({type:"deleteCartItem",payloads:el._id})}>&times;</span>
                    <Link href={"/product/"+el.productId}>
                         <img src={el.image} className="w-20 cursor-pointer text-decoration-none" />
                    </Link>
                    <div className="text-sm font-bold">{el.name.length > 30 ? el.name.substring(0,30)+" ...":el.name}</div>
                </td>
                <td>{el.price}</td>
                <td> 
                    <div className="flex items-center">
                        <button type="button" className="px-2 mx-1 border-1 border-gray-700"  disabled={+el.qty <= 0}
                        onClick={()=>props.dispatch({type:"updateItemQty",payloads:{id:el._id,qty:+el.qty-1}})}>-</button>
                        <div className="text-sm ">{el.qty}  </div>
                        <button type="button" className="px-2 mx-1 border-1 border-gray-700" disabled={+el.qty >= (+el.stock)}
                        onClick={()=>props.dispatch({type:"updateItemQty",payloads:{id:el._id,qty:+el.qty+1}})}>+</button>
                    </div>
                </td>
                <td> {el.price * el.qty} </td>

            </tr>
            // <div key={key} className="">
            //         <div className="flex items-start">
            //             <Link href={"/product/"+el.productId}><img src={el.image} className="w-20 cursor-pointer rounded" /></Link>
            //             <div className="px-2">
            //                 <div className="text-sm font-bold">{el.name.length > 30 ? el.name.substring(0,30)+" ...":el.name}</div>
            //                 <div className="text-sm text-secondary">Sold by : Flashtech Retail</div>
            //                 <div className="text-sm "> Size : {el.size}  </div>
            //                 <div className="text-sm flex items-center">
            //                     <div>Qty : </div>
            //                     <div className="flex items-center">
            //                         <button type="button" className="px-2 mx-1 border-1 border-gray-700"  disabled={+el.qty <= 0}
            //                         onClick={()=>props.dispatch({type:"updateItemQty",payloads:{id:el._id,qty:+el.qty-1}})}>-</button>
            //                         <div className="text-sm ">{el.qty}  </div>
            //                         <button type="button" className="px-2 mx-1 border-1 border-gray-700" disabled={+el.qty >= (+el.stock)}
            //                         onClick={()=>props.dispatch({type:"updateItemQty",payloads:{id:el._id,qty:+el.qty+1}})}>+</button>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="ml-auto text-right">
            //                 <div>Rs. {el.price} </div>
            //                 {/* <div className="text-red-500">50% OFF</div> */}
            //             </div>
            //         </div>
            //     <hr />
            //     <div className="my-2 flex items-center">
            //         {/* <Button className="mx-2" variant="outlined" color="inherit" onClick={()=>props.deleteCartItem(el.productId)}>
            //             Delete
            //         </Button> */}
            //         <div onClick={()=>props.dispatch({type:"deleteCartItem",payloads:el._id})} className="px-4 py-1 mx-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
            //             Delete
            //         </div>
            //         {/* <Button className="mx-2" variant="outlined" color="secondary" onClick={()=>props.movetoWishlist(el)}>
            //             Move to Wishlist
            //         </Button> */}
            //         <div onClick={()=>props.dispatch({type:"movetoWishlist",payloads:el._id})} className="px-4 py-1 mx-2 cursor-pointer border-2 border-gray-800 bg-gray-50 text-gray-800">
            //             Move to Wishlist
            //         </div>
            //     </div>
            // </div>
        ))}
    </>
}