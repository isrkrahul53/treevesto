import Button from '@material-ui/core/Button'
import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";


const Layout = lazy(()=>import('../../component/common/layout'))


function Card(props){
    return <div className="border bg-white shadow-sm">
    <div className="float-right"><span onClick={()=>{props.deleteWishlistItem({type:"deleteWishlistItem",payloads:props.productId})}} className="cursor-pointer text-xl p-1 px-2 rounded shadow-sm border-2 border-gray-500 text-gray-500">&times;</span></div>
    <img src={props.image}  className="w-100 h-56 md:h-64 lg:72" />
    <div className="p-2">
            <div className="text-sm font-normal hidden md:block">
                {props?.name.length > 24 ? props?.name.substring(0,24):props?.name}
                {props?.name.length > 24 ? " ...":""}
            </div>
            <div className="text-sm font-normal md:hidden">
                {props?.name.length > 15 ? props?.name.substring(0,15):props?.name}
                {props?.name.length > 15 ? " ...":""}
            </div>
        <div className="text-lg">Rs. {props.price}</div>
        <hr className="my-2" />
        {/* <Button variant="text" color="secondary" fullWidth onClick={()=>{props.movetoCart({type:"",payloads:props.id})}}>
          Move to Bag
        </Button> */}
        
        <div onClick={()=>{props.movetoCart({type:"movetoCart",payloads:props.id})}} className="w-full px-4 py-1 md:text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
        Move to Bag
        </div>
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

                        <h3 className="text-xl font-md my-4">My Wishlist ( {wishlist.length} items )</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-4">

                            {wishlist?wishlist.map((el,key)=>(
                                <div key={key}>
                                    <Card  name={el.name} price={el.price} image={el.image} id={el._id} productId={el.productId}
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