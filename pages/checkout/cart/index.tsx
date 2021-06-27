import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from "react-redux";


import axios from 'axios';
import https from 'https'

const Checkout = lazy(()=>import('../../../component/pages/checkout'))
const CustomAlert = lazy(()=>import('../../../component/common/customAlert'))
const CartItem = lazy(()=>import('../../../component/Lists/cartItem'))


function SettingSVG(){
    return <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" className="offersV2-base-discountIcon"><g fill="#000" fillRule="evenodd"><path d="M15.292 10.687v.001c-.198.742.076 1.454.296 2.026l.045.12-.137.021c-.602.094-1.352.211-1.892.75-.538.54-.655 1.288-.748 1.89l-.022.138a22.096 22.096 0 0 1-.12-.045c-.443-.171-.946-.364-1.49-.364-.185 0-.366.023-.536.068-.728.194-1.198.78-1.577 1.249-.032.04-.07.088-.111.137l-.112-.138c-.378-.47-.848-1.054-1.575-1.248a2.092 2.092 0 0 0-.537-.068c-.543 0-1.046.193-1.49.364l-.12.045-.022-.138c-.093-.602-.21-1.35-.749-1.89-.539-.539-1.289-.656-1.891-.75l-.137-.022a15 15 0 0 1 .045-.118c.22-.573.494-1.286.296-2.027-.194-.728-.78-1.199-1.25-1.577L1.323 9l.137-.11c.47-.38 1.055-.85 1.249-1.577.198-.742-.076-1.455-.296-2.028l-.045-.118.137-.022c.602-.094 1.352-.211 1.891-.75.54-.539.656-1.289.75-1.891l.022-.137.119.045c.443.171.947.365 1.49.365.186 0 .367-.024.537-.07.727-.193 1.198-.778 1.576-1.248L9 1.322l.111.137c.379.47.85 1.055 1.576 1.249.17.045.352.069.537.069.544 0 1.047-.194 1.491-.365l.119-.045.022.137c.094.602.21 1.353.75 1.891.538.539 1.288.656 1.89.75l.138.022-.046.119c-.22.572-.494 1.285-.295 2.026.194.728.778 1.199 1.248 1.577.04.033.088.07.137.111l-.137.11c-.47.38-1.054.85-1.249 1.577M18 9c0-.744-1.459-1.286-1.642-1.972-.19-.71.797-1.907.437-2.529-.364-.63-1.898-.372-2.41-.884-.511-.511-.253-2.045-.883-2.41a.647.647 0 0 0-.33-.08c-.585 0-1.403.542-1.998.542a.778.778 0 0 1-.201-.025C10.286 1.46 9.743 0 9 0c-.744 0-1.286 1.459-1.972 1.642a.78.78 0 0 1-.2.025c-.596 0-1.414-.542-2-.542a.647.647 0 0 0-.33.08c-.63.365-.37 1.898-.883 2.41-.512.512-2.046.254-2.41.884-.36.62.627 1.819.437 2.529C1.46 7.714 0 8.256 0 9s1.459 1.286 1.642 1.972c.19.71-.797 1.908-.437 2.53.364.63 1.898.371 2.41.883.511.512.253 2.045.884 2.41.097.056.208.08.33.08.585 0 1.403-.542 1.998-.542a.78.78 0 0 1 .201.025C7.714 16.54 8.256 18 9 18s1.286-1.46 1.973-1.642a.774.774 0 0 1 .2-.025c.595 0 1.413.542 1.998.542a.647.647 0 0 0 .33-.08c.631-.365.373-1.898.884-2.41.512-.512 2.046-.254 2.41-.884.36-.62-.627-1.819-.437-2.529C16.54 10.286 18 9.744 18 9" /><path d="M10.897 6.34l-4.553 4.562a.536.536 0 0 0 .76.758l4.552-4.562a.536.536 0 0 0-.76-.758M6.75 7.875a1.126 1.126 0 0 0 0-2.25 1.126 1.126 0 0 0 0 2.25M11.25 10.125a1.126 1.126 0 0 0 0 2.25 1.126 1.126 0 0 0 0-2.25" /></g></svg>

}

export default function CartPage({coupon}) {
    const dispatch = useDispatch();
     
    const [cart,setCart] = React.useState([]);
    const [wishlist,setWishlist] = React.useState([]);
    const [totalAmt,setTotalAmt] = React.useState(0)

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
        }
    },[])
 

    const getCart = (x) => {
        fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{
            setCart(json.result.filter(e=>e.type === "cart"))
        })
    }

    const deleteCartItem = (x) => {
        var data = cart.filter(e=>e.productId!=x)
        setCart(data)
        fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"DELETE"}).then(d=>d.json()).then(json=>{
            dispatch({type:"setAlert",payloads:"Item Deleted !"})
            getCart(JSON.parse(localStorage.getItem('user')).userId)
        })
    }

    
    const movetoWishlist = (x) => { 
        var formData = new FormData();
        formData.append("type","wishlist")
        fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"PATCH",body:formData}).then(d=>d.json()).then(json=>{
            dispatch({type:"setAlert",payloads:"Item moved to Wishlist"})
            getCart(JSON.parse(localStorage.getItem('user')).userId)
        })
      }
      

      const props = {cart,deleteCartItem,movetoWishlist}
      if (!isFront) return null;

      return <div>
      <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
        <Checkout cart={cart} coupon={coupon} getAmount={(amt)=>setTotalAmt(amt)}>
            <CustomAlert />
            <div className="container-fluid">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active text-2xl" aria-current="page">My Bag ( {cart.length} )</li>
                    </ol>
                </nav>

                

                <div className="my-4">
                    <div className="flex items-center">
                        <SettingSVG />
                        <div className="text-xl px-2">Available Offers</div>        
                    </div>
                    <span className="text-sm text-secondary">10% Instant Discount with Standard Chartered Credit and Debit Cards on a min spend of Rs 4000. TCA</span>
                </div>
                
                <div className="flex items-center my-4">
                    <img src="/assets/images/checkout/free-delivery-truck-icon-2049-thumb.png" width="30px" />
                    <div className="text-lg mx-2">Yah ! No Convenience fee on this order.</div>
                </div>


                <Suspense fallback={<div className="text-center py-10">
                        <div className="spinner-border text-primary"></div>
                    </div>}>
                        <CartItem {...props} />

                </Suspense>

            </div>
            
        </Checkout>

      </Suspense>
    </div>
}


export const getStaticProps = async () => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`https://api.treevesto.com:4000/coupon`,{httpsAgent:agent})
    

    return {
      props: {
        coupon:res.data.result.filter(e=>e.couponActive === "1")
      }
    };
  }
