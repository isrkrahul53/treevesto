import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/layout.module.scss';
import Button from '@material-ui/core/Button'
import CustomAlert from './customAlert';

declare var $:any;
export default function Layout(props){
    const [navHeight,setNavHeight] = React.useState(null);

    const [categories,setCategories] = React.useState([]);
    const [subcategories,setSubCategories] = React.useState([]);

    const [cart,setCart] = React.useState(0)
    const [wishlist,setWishlist] = React.useState(0)
     

    useEffect(()=>{
        var x = document.getElementById("header").offsetHeight
        setNavHeight(x-24) 
    })
    
    useEffect(()=>{
        fetch(`http://treevesto55.herokuapp.com/category`).then(d=>d.json()).then(json=>{ 
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


    const fetchSubCat = (x) => {
        fetch(`http://treevesto55.herokuapp.com/subcategory/`+x).then(d=>d.json()).then(json=>{ 
            setSubCategories(json.result) 
        })
        
    }
        
    
    return <div>
      <CustomAlert error={props.error} success={props.success} />

        <nav id="header" className="navbar navbar-expand-lg navbar-light bg-white border shadow-sm p-0 fixed top-0 left-0 w-full z-30">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <Link href="/">
                        <img src="/logo.png" width="50px" alt="logo"/>
                    </Link>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                    <span className="nav-link active" aria-current="page"></span>
                    </li>  */}
                    {categories.map((el,key)=>{
                        return <li key={key} className={"nav-item py-3 "+styles.dropdown} onMouseEnter={()=>{fetchSubCat(el._id)}} onMouseLeave={()=>{setSubCategories(null)}}>
                            <section className="nav-link h5 p-3" id="navbarDropdownMen" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {el.catName}
                            </section>
                            <ul className={"dropdown-menu d-none shadow z-20"} style={{position:"fixed",top:navHeight,left:"5%",width:"40%",margin:"0 auto"}} aria-labelledby="navbarDropdownMen">
                                <div className="container p-0">
                                    {subcategories?subcategories.map((e,k)=>{
                                        return <div key={k}><Link href={"/"+e._id}><li className="dropdown-item cursor-pointer"> {e.catName} </li></Link></div>
                                    }):<div className="p-3 text-xl flex items-center"> <div className="spinner-border text-danger"></div> <div className="px-3">Loading ...</div> </div>}
                                </div>   
                            </ul>
                        </li> 
                    })}
                     
                </ul>
                <div className="navbar-nav pb-2 p-md-0"> 
                    <span className={styles.dropdown}>
                        <section className="nav-link" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/assets/icons/perm_identity-24px.svg" className="mx-2" width="30px" alt="perm_identity-24px"/> 
                        </section>
                        <ul className={"dropdown-menu d-none shadow z-20"} style={{position:"fixed",top:navHeight-2,left:"77%",width:"20%",margin:"0 auto"}} aria-labelledby="navbarDropdownProfile">
                        <div className="p-3">
                                <h6 className="h6 p-0 m-0">Welcome</h6>
                                <small className="text-sm">To access account and manage orders</small>
                                <div className="my-2"></div>
                                <Link href="/auth/login"><Button variant="outlined" color="secondary">
                                Login / Register
                                </Button></Link>
                            </div>
                            <Link href="/account/profile"><div className="p-3 cursor-pointer">
                                <h6 className="h6 p-0 m-0">Hello Rahul</h6>
                                <small className="text-sm">6209460626</small>
                                <div className="my-2"></div> 
                            </div></Link>
                            
                            <Link href="/account/orders"><li className="dropdown-item cursor-pointer">Orders</li></Link>
                            <Link href="/wishlist"><li className="dropdown-item cursor-pointer">Whishlist</li></Link>
                            <Link href="/admin"><li className="dropdown-item cursor-pointer">Admin</li></Link>
                            
                            <li className="dropdown-item cursor-pointer">Gift Cards</li>
                            <li className="dropdown-item cursor-pointer">Contact Us</li>
                            <hr/>
                            <li className="dropdown-item cursor-pointer">Logout</li>
                        </ul>
                    </span>
                    <span>
                        <span className="nav-link">
                            <div className="flex items-start">
                                <Link href="/wishlist"><img src="/assets/icons/favorite_border-24px.svg" className="mx-2" width="30px" alt="favorite_border-24px"/></Link>
                                <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded"> {wishlist} </sup>
                            </div>
                        </span> 
                    </span>
                    <span>
                        <span className="nav-link">
                            <Link href="/checkout/cart">
                                <div className="flex items-start">
                                    <img src="/assets/icons/local_mall-24px.svg" className="mx-2" width="30px" alt="local_mall-24px"/>
                                    <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded">{cart}</sup>
                                </div>
                            </Link>
                        </span> 
                    </span>
                    
                    
                    
                </div>
                </div>
            </div>
        </nav>
        <div style={{height:navHeight+18}}></div>
        {props.children}

    </div>
}