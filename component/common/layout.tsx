import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/layout.module.scss';
import Button from '@material-ui/core/Button'
import CustomAlert from './customAlert';
import { useRouter } from 'next/router';
import Sidebar from './sidebar';
import Footer from './footer';
import MenuListComposition from '../material/menu'
import { useSelector, useDispatch } from "react-redux";
import MenuListComposition2 from '../material/menu2';


declare var $:any;
export default function Layout(props){
    const cartPromise = useSelector((state:any)=>state.cart)
    const router = useRouter(); 
    const dispatch = useDispatch()
    
    const [categories,setCategories] = React.useState([]);
    const [subcategories,setSubCategories] = React.useState([]);
    
    const [cart,setCart] = React.useState(0);
    
    const [wishlist,setWishlist] = React.useState(0)
    const [user,setUser] = React.useState(null)
    
    const [search,setSearch] = React.useState("")
    const [products,setProducts] = React.useState(null)
    const [isLoading,setLoading] = React.useState(false)
    
    
    useEffect(()=>{
        fetch(`https://apis.treevesto.com:4000/category/all`).then(d=>d.json()).then(json=>{ 
            setCategories(json.result)
        })
        setUser(JSON.parse(localStorage.getItem('user')))
        dispatch({type:"getCart"})

    },[])
    
    useEffect(()=>{
         cartPromise.then(d=>setCart(d.length))

    },[cartPromise])
    
    useEffect(()=>{
        searchProducts()
    },[search])

    const searchProducts = async () => {

        if(search.trim().length > 0){
            setLoading(true)
            const res = await fetch(`https://apis.treevesto.com:4000/product`).then(d=>d.json()) 
            var json = await res.result;
            json = json.filter((e,k)=>e.productName.toLowerCase().search(search.toLocaleLowerCase()) >= 0)
            setProducts(json)
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null);
        dispatch({type:"getCart"})
        router.push("/")
    } 
    
    return <div>
      <CustomAlert />
        <div className="bg-white shadow-sm border position-sticky top-0 w-full xl:static" style={{zIndex:1250,}}>
            <div className="container navbar navbar-expand-lg navbar-light p-0 px-md-0 px-3 w-full z-40">
                <div className="flex items-center p-0">
                    <span className="navbar-brand flex items-center">
                        <div className="xl:hidden"><Sidebar data={categories} user={user} logout={logout} /></div>
                        <Link href="/">
                            <img src="/logo.png" className="w-24 hidden xl:block mx-2 cursor-pointer" alt="logo"/>
                        </Link>
                        <Link href="/">
                            <img src="/logoHead.png" className="w-10 xl:hidden mx-2 cursor-pointer" alt="logo"/>
                        </Link>

                    </span>
                </div>
                
                <ul className="navbar-nav hidden xl:flex"> 
                    {categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
                        <li key={key} className={"nav-item dropdown p-2 mx-2"}>
                            <MenuListComposition cat={el.catName.toUpperCase()} subCat={categories.filter(e=>e.parentCatId === el._id)} /> 
                        </li>
                    ))}
                </ul> 
                 
                <div className="ml-auto">
                    <ul className="flex ml-auto items-center"> 
                        <li className="cursor-pointer mx-0">
                            {/* <SearchProducts /> */}
                            <div className="md:hidden flex items-center" style={{height:'55px'}}>
                                <Link href="/search"><img src="/assets/icons/search.png" className="mx-3" width="20px" alt="search"/></Link>
                            </div>

                            <div className="hidden md:flex items-center w-full shadow-sm bg-gray-100 p-1 px-2" style={{height:'35px'}}>
                                <img src="/assets/icons/search.png" className="mx-2" width="15px" alt="search"/>
                                <input type="text" onChange={e=>setSearch(e.target.value)} name="search" className="w-full outline-none p-1 bg-gray-100" placeholder="Search" />
                            </div>
                        </li>
                        <li className={"dropdown mx-1 mx-md-3"}>
                            <img onClick={e=>router.push("/account/overview")} src="/assets/icons/user.png" className="md:hidden cursor-pointer" width="20px" alt="user"/>
                            <div className="hidden md:block">
                                <MenuListComposition2
                                cat={<img src="/assets/icons/user.png" className="cursor-pointer" width="20px" alt="user"/>} 
                                subCat={[{_id:"account/profile",catName:<div className="p-1">
                                    
                                    <h2 className="text-xl px-1"> {user ? user?.name || user?.email : "Welcome"}</h2>
                                    <h4 className="px-1">{user ? user?.phone : "To access account and manage orders"}</h4>
                                    {!user && <Link href="/auth/login">
                                    <Button variant="text" color="primary">
                                    Login / Register
                                    </Button>
                                    </Link>}
                                </div>},
                                {_id:"account/overview",catName:"Account"},
                                {_id:"account/profile/edit",catName:"Edit Profile"},
                                {_id:"wishlist",catName:"Wishlist"},
                                {_id:"account/orders",catName:"Orders"},
                                ]} /> 

                            </div>
                            
                        </li> 
                        <li className="flex items-center justify-end" style={{height:'55px'}}>
                        <Link href="/wishlist">
                            <div className="flex items-center cursor-pointer">
                                <img src="/assets/icons/heart.png" className="mx-2" width="20px" alt="heart"/>
                            </div>
                        </Link> 
                        </li>
                        <li className="flex items-center justify-end" style={{height:'55px'}}>
                        <Link href="/checkout/cart">
                            <div className="flex items-center cursor-pointer mx-2 mx-md-3">
                                <img src="/assets/icons/shopping-bag.png" width="20px" alt="shopping-bag"/>
                                <div style={{fontSize:"14px",fontWeight:500,color:"#282c3f",letterSpacing:"0.3px",fontFamily:"Whitney,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif"}}>
                                    <sup className="font-bold -ml-2 bg-danger text-white rounded-circle" style={{padding:"2px 5px"}} >{user ? cart : 0}</sup>
                                </div>
                                {/* <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded">{cart}</sup> */}
                            </div>
                        </Link>
                        </li> 
                        {user && <li className="flex items-center justify-end" onClick={logout} style={{height:'55px'}}>
                            <div className="flex items-center cursor-pointer">
                                <img src="/assets/icons/logout.jpg" className="mx-2" width="20px" alt="logout"/>
                            </div>
                        </li>}
                        
                        
                    </ul>
                </div>

            </div>
        </div> 
          
        {search?.trim() != "" ? <div className="container bg-white my-6">
            {isLoading?<>
            <div className="text-center my-3">
            <div className="spinner-border text-primary"></div>
            </div>
            </>:<>
            {products?.length > 0 ?<div className="bg-white">
                <h3 className="text-secondary text-md md:text-3xl py-2">You have searched for ' {search} ' </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 justify-content-center my-2 gap-4">
                {products?.map((el,key)=>(
                    <Link key={key} href={"/product/"+el._id}><div className="cursor-pointer">
                    <img src={process.env.NEXT_PUBLIC_apiUrl+el.productImages[0]}  alt={el.productName} />
                    <div className="p-2">
                        <div>
                        {/* <div className="text-sm text-secondary"> {el?.productType} </div> */}
                        <div className="text-sm font-normal hidden md:block">
                            {el?.productName?.length > 18 ? el?.productName.substring(0,18):el?.productName}
                            {el?.productName?.length > 18 ? " ...":""}
                        </div>
                        <div className="text-sm font-normal md:hidden">
                            {el?.productName?.length > 42 ? el?.productName.substring(0,42):el?.productName}
                            {el?.productName?.length > 42 ? " ...":""}
                        </div>
                        <div className="text-lg font-normal"> <s className="text-sm text-secondary">Rs. {el?.regularPrice} </s> Rs. {el?.sellingPrice}</div>
                    </div>
                    </div>
                    </div></Link>
                ))}
                </div>
            </div>:<> 
                <div className="p-2">
                    <div className="text-2xl text-secondary"> No Products found ! </div>
                    <div className="text-sm"> Try something else </div>
                </div>   
            </>}
            </>}
        </div>:<div className='mb-5'>
            {props.children}
            <Footer />
        </div>}


    </div>
}