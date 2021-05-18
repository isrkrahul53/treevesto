import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/layout.module.scss';
import Button from '@material-ui/core/Button'
import CustomAlert from './customAlert';
import { useRouter } from 'next/router';
import Sidebar from './sidebar';
import Footer from './footer';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

declare var $:any;
export default function Layout(props){
    const router = useRouter();
    const [navHeight,setNavHeight] = React.useState(null);

    const [categories,setCategories] = React.useState([]);
    const [subcategories,setSubCategories] = React.useState([]);

    const [cart,setCart] = React.useState(0)
    const [wishlist,setWishlist] = React.useState(0)
    const [user,setUser] = React.useState(null)
     
    const [search,setSearch] = React.useState(null)

    useEffect(()=>{
        var x = document.getElementById("header").scrollTop
        setNavHeight(x) 
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
      <div className="bg-white border sticky top-0 w-full md:static">
        <div className="container px-2 navbar navbar-expand-lg navbar-light p-0 w-full z-40">
            <div className="flex items-center p-0">
                <span className="navbar-brand flex items-center">
                    <div className="md:hidden"><Sidebar data={categories} /></div>
                    <Link href="/">
                        <img src="/logo.png" className="w-20 hidden md:block mx-2 cursor-pointer" alt="logo"/>
                    </Link>
                    <Link href="/">
                        <img src="/logoHead.png" className="w-10 md:hidden mx-2 cursor-pointer" alt="logo"/>
                    </Link>

                </span>
            </div>
            <div className="ml-auto">
                <ul className="flex ml-auto items-center"> 
                    <li className={"hidden md:block dropdown"}>
                        <img onClick={e=>router.push("/account/overview")} src="/assets/icons/user.png" className="mx-1 cursor-pointer" width="20px" alt="user"/>
                        {/* <section className="" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        </section>
                        <ul className={"dropdown-menu shadow z-40"} aria-labelledby="navbarDropdownProfile">
                            {!user?<div className="p-3">
                                <h6 className="h6 p-0 m-0">Welcome</h6>
                                <small className="text-sm">To access account and manage orders</small>
                                <div className="my-2"></div>
                                <Link href="/auth/login"><Button variant="outlined" color="secondary">
                                Login / Register
                                </Button></Link>
                            </div>:<></>}
                            
                            <Link href="/account/profile"><div className="p-3 cursor-pointer hover:bg-gray-100">
                                <h6 className="h6 p-0 m-0">{user?.name || user?.email}</h6>
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
                        </ul> */}
                    </li> 
                    <li className="flex items-center justify-end">
                    <Link href="/wishlist">
                        <div className="flex items-center cursor-pointer">
                            <img src="/assets/icons/heart.png" className="mx-1" width="20px" alt="heart"/>
                            {/* <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded"> {wishlist} </sup> */}
                        </div>
                    </Link> 
                    </li>
                    <li className="flex items-center justify-end">
                    <Link href="/checkout/cart">
                        <div className="flex items-center cursor-pointer">
                            <img src="/assets/icons/shopping-bag.png" className="mx-1" width="20px" alt="shopping-bag"/>
                            Bag ({cart})
                            {/* <sup className="font-bold -ml-2 bg-danger text-white p-1 py-2 rounded">{cart}</sup> */}
                        </div>
                    </Link>
                    </li>   
                    
                </ul>
            </div>

        </div>
      </div>
      <div className="bg-white border sticky-top z-10">
        <div id="header" className="container navbar navbar-expand-lg navbar-light py-0 pb-1 w-full">
            
            {/* <ul className="navbar-nav hidden md:flex me-auto mb-2 mb-lg-0"> 
                {categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
                    <li key={key} className={"nav-item "+styles.dropdown}>
                        <section className="nav-link px-3" id="navbarDropdownMen" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {el.catName}
                        </section>
                        <ul className={"dropdown-menu d-none shadow z-0"} style={{position:"fixed",top:navHeight,left:"2%",width:"50%",margin:"0 auto"}} aria-labelledby="navbarDropdownMen">
                            <div className="container p-0">
                                {categories.filter(e=>e.parentCatId === el._id).map((e,k)=>(
                                    <div key={k}><Link href={"/"+e._id}><li className="dropdown-item border-r-4 border-gray-800 hover:bg-pink-400 hover:text-gray-50 cursor-pointer"> {e.catName} </li></Link></div>
                                ))}
                            </div>   
                        </ul>

                    </li>
                ))}
            </ul>  */}
            <ul className="navbar-nav hidden md:flex me-auto mb-2 mb-lg-0"> 
                {categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
                    <li key={key} className={"nav-item dropdown"}>
                        <section className="nav-link text-sm font-medium px-3" id="navbarDropdownMen" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {el.catName.toUpperCase()}
                            <span className="dropdown-toggle mx-1"></span>
                        </section>
                        <ul className={"dropdown-menu shadow z-0"} aria-labelledby="navbarDropdownMen">
                            <div className="container p-0">
                                {categories.filter(e=>e.parentCatId === el._id).map((e,k)=>(
                                    <div key={k}><Link href={"/"+e._id}><li className="dropdown-item border-r-4 border-gray-800 hover:bg-gray-400 hover:text-gray-50 cursor-pointer"> {e.catName} </li></Link></div>
                                ))}
                            </div>   
                        </ul>

                    </li>
                ))}
            </ul> 
            <ul className="navbar-nav ml-auto hidden md:flex">
                {search === null?<>
                    <div className="flex items-center text-sm font-normal cursor-pointer" onClick={()=>{setSearch("")}}>
                        <div>SEARCH</div>
                        <img src="/assets/icons/search.png" className="mx-1" width="15px" alt="search"/> </div>
                </>:<></>}
                {search !== null?<div className="flex items-center">
                    <input type="text" name="search" id="search" placeholder="Search ...." className="border-2 border-dark w-64 rounded text-sm p-1 m-1"
                    onChange={e=>setSearch(e.target.value)} />
                    <CloseIcon className="cursor-pointer" onClick={e=>setSearch(null)} />
                </div>:<></>}

            </ul> 
            
        </div>
      </div>
         
        <div></div>
        {props.children}

        <Footer />

    </div>
}