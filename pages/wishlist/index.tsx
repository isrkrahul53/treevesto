import Layout from "../../component/common/layout";
import Button from '@material-ui/core/Button'
import React, { useEffect } from "react";

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

    useEffect(()=>{
        var cart = JSON.parse(localStorage.getItem('cart'))
        var wishlist = JSON.parse(localStorage.getItem('wishlist'))
        if(cart){ 
            setCart(cart)
        } 
        if(wishlist){ 
            setWishlist(wishlist)
        } 
    },[])
 

    const deleteWishlistItem = (x) => {
        var data = wishlist.filter(e=>e.id!=x)
        setWishlist(data)
        localStorage.setItem('wishlist',JSON.stringify(data))
        setError('Item Deleted !') 
    }

    
    const movetoCart = (pro) => {  
        var data = cart.filter(e=>e.id==pro.id)
        var x = [...cart,{
            id:pro.id,qty:1,
            image:pro.image,
            name:pro.name,
            price:pro.price
        }]
        if(data.length == 0){
            setCart(x)
            localStorage.setItem('cart',JSON.stringify(x));
            deleteWishlistItem(pro.id)
            setSuccess('Item moved cart')
        }else{
            setError('Already exist to cart')
        }  
      }
      

    return <div>
        <Layout error={error} success={success} close={closeAlert} cart={cart.length} wishlist={wishlist.length}>


            <div className="">
                <div className="w-4/5 mx-auto my-4">

                    <h3 className="text-xl font-md my-4">My Wishlist ( {wishlist.length} items )</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                        {wishlist?wishlist.map((el,key)=>(
                            <div key={key}>
                                <Card  name={el.name} price={el.price} image={el.image} 
                                movetoCart={()=>{movetoCart(el)}} deleteWishlistItem={()=>{deleteWishlistItem(el.id)}} />
                            </div>
                        )):<div></div>} 
                        

                    </div>

                </div>

            </div>

        </Layout>
    </div>
}