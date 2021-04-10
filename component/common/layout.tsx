import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/layout.module.scss';
import Button from '@material-ui/core/Button'
import CustomAlert from './customAlert';
import { useRouter } from 'next/router';
import Sidebar from './sidebar';
import Footer from './footer';

declare var $:any;
export default function Layout(props){
    const router = useRouter();
    const [navHeight,setNavHeight] = React.useState(null);

    const [categories,setCategories] = React.useState([]);
    const [subcategories,setSubCategories] = React.useState([]);

    const [cart,setCart] = React.useState(0)
    const [wishlist,setWishlist] = React.useState(0)
    const [user,setUser] = React.useState(null)
     

    useEffect(()=>{
        var x = document.getElementById("header").offsetHeight
        setNavHeight(x-18) 
    })
    
    useEffect(()=>{
        fetch(`https://api.treevesto.com:4000/category/all`).then(d=>d.json()).then(json=>{ 
            setCategories(json.result)
        })
        
        var wishlist = JSON.parse(localStorage.getItem('wishlist'))
        if(wishlist){
            setWishlist(wishlist.length)
        }
        var cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            setCart(cart.length)
        }
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setUser(user)
        }

    },[])
    
    useEffect(()=>{
        if(props.cart){
            setCart(props.cart) 
        }
    },[props.cart])

    useEffect(()=>{ 
        if(props.wishlist){
            setWishlist(props.wishlist)
        }
    },[props.wishlist])


    // const fetchSubCat = (x) => {
    //     fetch(`https://api.treevesto.com:4000/subcategory/`+x).then(d=>d.json()).then(json=>{ 
    //         setSubCategories(json.result) 
    //     })
        
    // }
    
    const logout = () => {
        localStorage.removeItem('user')
        setUser(null);
        router.push("/")
    }
    
    return <div>
      <CustomAlert error={props.error} success={props.success} />
        <div id="header" className="container-fluid navbar navbar-expand-lg navbar-light bg-white py-0 pb-1 shadow-sm fixed top-0 w-full z-40">
            <div className="flex items-center p-1 md:p-3">
                <span className="navbar-brand flex items-center">
                    <div className="md:hidden"><Sidebar data={categories} /></div>
                    <Link href="/">
                        <img src="/logo.png" className="w-20 md:w-32 mx-2" alt="logo"/>
                    </Link>
                </span>
                <ul className="navbar-nav hidden md:flex me-auto mb-2 mb-lg-0"> 
                    {categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
                        <li key={key} className={"nav-item "+styles.dropdown}>
                            <section className="nav-link text-2xl px-3" id="navbarDropdownMen" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {el.catName}
                            </section>
                            <ul className={"dropdown-menu d-none shadow z-0"} style={{position:"fixed",top:navHeight,left:"5%",width:"50%",margin:"0 auto"}} aria-labelledby="navbarDropdownMen">
                                <div className="container p-0">
                                    {categories.filter(e=>e.parentCatId === el._id).map((e,k)=>(
                                        <div key={k}><Link href={"/"+e._id}><li className="dropdown-item border-r-4 border-gray-800 hover:bg-pink-400 hover:text-gray-50 cursor-pointer text-2xl"> {e.catName} </li></Link></div>
                                    ))}
                                </div>   
                            </ul>

                        </li>
                    ))}
                </ul> 
            </div>
            <div className="ml-auto">
                <ul className="flex ml-auto items-center"> 
                    <li className={"hidden md:block "+styles.dropdown}>
                        <section className="nav-link" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/assets/icons/perm_identity-24px.svg" className="mx-2" width="30px" alt="perm_identity-24px"/> 
                        </section>
                        <ul className={"dropdown-menu d-none shadow z-20"} style={{position:"fixed",top:navHeight-2,left:"77%",width:"20%",margin:"0 auto"}} aria-labelledby="navbarDropdownProfile">
                            {!user?<div className="p-3">
                                <h6 className="h6 p-0 m-0">Welcome</h6>
                                <small className="text-sm">To access account and manage orders</small>
                                <div className="my-2"></div>
                                <Link href="/auth/login"><Button variant="outlined" color="secondary">
                                Login / Register
                                </Button></Link>
                            </div>:<></>}
                            
                            <Link href="/account/profile"><div className="p-3 cursor-pointer">
                                <h6 className="h6 p-0 m-0">Hello {user?.name}</h6>
                                <small className="text-sm">{user?.phone}</small>
                                <div className="my-2"></div> 
                            </div></Link>
                            
                            <Link href="/account/orders"><li className="dropdown-item cursor-pointer">Orders</li></Link>
                            <Link href="/wishlist"><li className="dropdown-item cursor-pointer">Whishlist</li></Link>
                            <Link href="/admin"><li className="dropdown-item cursor-pointer">Admin</li></Link>
                            
                            <li className="dropdown-item cursor-pointer">Gift Cards</li>
                            <li className="dropdown-item cursor-pointer">Contact Us</li>
                            <hr/>
                            {user?<li className="dropdown-item cursor-pointer" onClick={logout}>Logout</li>:<div></div>}
                        </ul>
                    </li> 
                    <li className="flex items-center justify-end">
                    <Link href="/wishlist">
                        <div className="flex items-start cursor-pointer">
                            <img src="/assets/icons/favorite_border-24px.svg" className="mx-2" width="30px" alt="favorite_border-24px"/>
                            <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded"> {wishlist} </sup>
                        </div>
                    </Link> 
                    </li>
                    <li className="flex items-center justify-end">
                    <Link href="/checkout/cart">
                        <div className="flex items-start cursor-pointer">
                            <img src="/assets/icons/local_mall-24px.svg" className="mx-2" width="30px" alt="local_mall-24px"/>
                            <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded">{cart}</sup>
                        </div>
                    </Link>
                    </li>   
                    
                </ul>
            </div>

        </div>
         
        <div style={{height:navHeight+5}}></div>
        {props.children}

        <Footer />

    </div>
}