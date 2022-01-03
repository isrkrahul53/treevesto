import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';


const Layout = lazy(()=>import('../../component/common/layout'))


function Card(props){
    return <div className="bg-white border shadow-md my-2 flex-row md:flex items-center justify-content-between pe-2">
    <div className="flex items-center">
        <Link href={"/product/"+props.productId}><img src={props.image}  className="w-20 cursor-pointer" /></Link>
        <div className="p-2">
            {props?.name}
            <div className="text-lg">Rs. {props.price}</div>
            {props.stock > 0 ? <h4 className="text-success">In Stock</h4>:<h4 className="text-danger">Out of Stock</h4>}
        </div>
    </div>
    <div className="flex items-center justify-content-end">
        <div onClick={()=>{props.movetoCart({type:"movetoCart",payloads:props.id})}} className="px-4 py-1 md:text-xl cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
        Move to Bag
        </div>
        <div className="px-2"><span onClick={()=>{props.deleteWishlistItem({type:"deleteWishlistItem",payloads:props.productId})}} className="cursor-pointer text-xl p-1 px-2 rounded shadow-sm border-2 border-gray-500 text-gray-500">&times;</span></div>
    </div>
</div>
}
 
export default function Wishlist(props) {
    
    const dispatch = useDispatch();
      
    const [wishlist,setWishlist] = React.useState([]);
    const wishlistPromise = useSelector((state:any)=>state.wishlist)
    wishlistPromise.then(d=>setWishlist(d))
    
    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        }); 
    },[])
 
  
    if (!isFront) return null;

    return <div>
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <Layout>


                <div className="">
                    <div className="container mx-auto my-4">

                        <div className="text-center my-2">
                            <h1 className="display-6">Wishlist <sup><small className="p-0 px-2 bg-red-400 text-white border shadow-sm rounded">{wishlist.length}</small></sup> </h1>
                            <p className="text-secondary">Save items for later</p>
                        </div>
                        {/* <h3 className="text-xl font-md my-4">My Wishlist ( {wishlist.length} items )</h3> */}
                        

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-4">

                            

                        </div>
                        <div className="w-full lg:w-4/5 mx-auto">
                            {wishlist?wishlist.map((el,key)=>(
                                <div key={key}>
                                    <Card  name={el.name} price={el.price} image={el.image} id={el._id} productId={el.productId} stock={el.stock}
                                    movetoCart={dispatch} deleteWishlistItem={dispatch} />
                                </div>
                            )):<div></div>} 

                        </div>



                    </div>

                </div>

            </Layout>
        </Suspense>
    </div>
}