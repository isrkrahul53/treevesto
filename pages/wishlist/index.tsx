import Button from '@material-ui/core/Button'
import React, { useEffect, lazy, Suspense } from "react";

const Layout = lazy(()=>import('../../component/common/layout'))


function Card(props){
    return <div className="border bg-white shadow-sm">
    <div className="float-right"><span onClick={()=>{props.deleteWishlistItem()}} className="cursor-pointer text-xl p-1 px-2 rounded shadow-sm border-2 border-gray-500 text-gray-500">&times;</span></div>
    <img src={props.image}  className="w-100" />
    <div className="p-2">
        <div className="text-md">{props.name} </div>
        <div className="text-lg">Rs. {props.price}</div>
        <hr className="my-2" />
        {/* <Button variant="text" color="secondary" fullWidth onClick={()=>{props.movetoCart()}}>
          Move to Bag
        </Button> */}
        
        <div onClick={()=>{props.movetoCart()}} className="w-full px-4 py-1 text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
        Move to Bag
        </div>
    </div>
</div>
}
 
export default function Wishlist() {

    
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }

    const [cart,setCart] = React.useState([]);
    const [wishlist,setWishlist] = React.useState([]);
    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            getCart(user.userId)
            getWishlist(user.userId)
        }
    },[])
 

    const getCart = (x) => {
        fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{
            setCart(json.result.filter(e=>e.type === "cart"))
        })
    }
    const getWishlist = (x) => {
        fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{
            setWishlist(json.result.filter(e=>e.type === "wishlist"))
        })
    }

    const deleteWishlistItem = (x) => {
        var data = wishlist.filter(e=>e.productId!=x)
        setWishlist(data)
        fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"DELETE"}).then(d=>d.json()).then(json=>{
            setError('Item Deleted !')
            getWishlist(JSON.parse(localStorage.getItem('user')).userId)
        })
        
    }

    
    const movetoCart = (x) => {  
        var formData = new FormData();
        formData.append("type","cart")
        fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"PATCH",body:formData}).then(d=>d.json()).then(json=>{
            setSuccess('Item Moved to Cart !')
            getWishlist(JSON.parse(localStorage.getItem('user')).userId)
        })
        // var data = cart.filter(e=>e.id==pro.id)
        // var x = [...cart,{
        //     productId:pro.id,qty:1,
        //     vendorId:pro.vendorId,
        //     image:pro.image,
        //     name:pro.name,
        //     price:pro.price
        // }]
        // if(data.length == 0){
        //     setCart(x)
        //     localStorage.setItem('cart',JSON.stringify(x));
        //     deleteWishlistItem(pro.productId)
        //     setSuccess('Item moved cart')
        // }else{
        //     setError('Already exist to cart')
        // }  
      }
      
      if (!isFront) return null;

    return <div>
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <Layout error={error} success={success} close={closeAlert} cart={cart.length} wishlist={wishlist.length}>


                <div className="">
                    <div className="w-4/5 mx-auto my-4">

                        <h3 className="text-xl font-md my-4">My Wishlist ( {wishlist.length} items )</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                            {wishlist?wishlist.map((el,key)=>(
                                <div key={key}>
                                    <Card  name={el.name} price={el.price} image={el.image} 
                                    movetoCart={()=>{movetoCart(el._id)}} deleteWishlistItem={()=>{deleteWishlistItem(el.productId)}} />
                                </div>
                            )):<div></div>} 
                            

                        </div>

                    </div>

                </div>

            </Layout>
        </Suspense>
    </div>
}