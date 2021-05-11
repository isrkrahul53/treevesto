import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default function AdminLayout(props) {

    const router = useRouter();
    const path = router.asPath.split("/");
    const navs = ["dashboard","homepage","vendors","users","orders","category","coupons"] 

    const [admin,setAdmin] = React.useState(null);
    const [expand,setExpand] = React.useState(navs.filter(e=>path.filter(a=>a===e).length > 0)[0] || "");
 
    useEffect(()=>{  
        
        if(!localStorage.getItem('admin')){
            router.replace("/admin/auth") 
        }else{ 
            var admin = JSON.parse(localStorage.getItem('admin'))
            if(admin){
                setAdmin(admin)
            }
        }

    },[])

    const logout = () => {
        localStorage.removeItem('admin')
        router.replace('/admin/auth/')
    }

    return <div> 

        <div className="container my-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-white border shadow-sm mb-3" style={{borderRadius:"10px"}}>
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <img src="/logo.png" alt="logo" className="w-24" />
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <span className="nav-link active" aria-current="page"><Link href="/">Home</Link></span>
                        </li>
                        <li className="nav-item">
                        <span className="nav-link">Link</span>
                        </li>
                        <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </span>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><span className="dropdown-item">Action</span></li>
                            <li><span className="dropdown-item">Another action</span></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><span className="dropdown-item">Something else here</span></li>
                        </ul>
                        </li> 
                    </ul>
                    <form className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button> */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link">{admin?.email}</span>
                            </li> 
                            <li className="nav-item">
                                <span className="nav-link cursor-pointer" onClick={logout}>Logout</span>
                            </li> 
                        </ul>
                    </form>
                    </div>
                </div>
            </nav> 
            <div className="row">
                <div className="col-md-3">

                    <Link href="/admin/"><div className={expand === ""?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                     style={{borderRadius:"10px"}}>
                         Dashboard
                    </div></Link>

                    <div className="mb-2 cursor-pointer text-xl border shadow-sm"
                    style={{borderRadius:"10px",overflow:"hidden"}}>
                        <div className={expand === "homepage"?"p-3 bg-green-100 flex items-center justify-between":"p-3 hover:bg-green-100 bg-gray-50 flex items-center justify-between"} 
                        onClick={e=>setExpand(expand === "homepage" ? "":"homepage")}>
                            <div>Homepage</div>
                            {expand !== "homepage"?<ExpandMoreIcon />:<ExpandLessIcon />} 
                        </div>
                        {expand === "homepage"?<>
                            <List>
                                <Link href="/admin/homepage/"><ListItem button>
                                    <ListItemText>Index</ListItemText>
                                </ListItem></Link>
                                <Link href="/admin/homepage/banner"><ListItem button>
                                    <ListItemText>Banners</ListItemText>
                                </ListItem></Link>
                                <Link href="/admin/homepage/addSection"><ListItem button>
                                    <ListItemText>Add New Section</ListItemText>
                                </ListItem></Link>
                            </List>
                        </>:<></>}
                    </div>

                    <Link href="/admin/vendors"><div className={expand === "vendors"?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                     style={{borderRadius:"10px"}}>
                         Vendors
                    </div></Link> 
 
                    <Link href="/admin/users"><div className={expand === "users"?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                    style={{borderRadius:"10px"}}>
                        Users
                    </div></Link>

                    <Link href="/admin/orders"><div className={expand === "orders"?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                    style={{borderRadius:"10px"}}>
                        Orders
                    </div></Link>

                    <Link href="/admin/category"><div className={expand === "category"?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                    style={{borderRadius:"10px"}}>
                        Category
                    </div></Link>

                    <Link href="/admin/coupons"><div className={expand === "coupons"?"p-3 mb-2 bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm":"p-3 mb-2 hover:bg-green-100 bg-gray-50 cursor-pointer text-xl border shadow-sm"}
                    style={{borderRadius:"10px"}}>
                        Coupons
                    </div></Link>

                    {/* <div className="accordion" id="accordionExample">
                        <div className="accordion-item" style={{borderRadius:"10px"}}>
                            <h2 className="accordion-header" id="headingOne">
                            <Link href="/admin/"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Dashboard
                            </button></Link>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                
                            </div>
                        </div>
                        <div className="accordion-item" style={{borderRadius:"10px"}}>
                            <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Homepage
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body px-4">
                                <Link href="/admin/homepage/"><div className="text-sm cursor-pointer ">Index</div></Link>
                                <Link href="/admin/homepage/banner"><div className="text-sm cursor-pointer ">Banners</div></Link>
                                <Link href="/admin/homepage/addSection"><div className="text-sm cursor-pointer ">Add New Section</div></Link>
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item" style={{borderRadius:"10px"}}>
                            <h2 className="accordion-header" id="headingThree">
                            <Link href="/admin/vendors/"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Vendors
                            </button></Link>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body p-0"> 
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item" style={{borderRadius:"10px"}}>
                            <h2 className="accordion-header" id="headingFour">
                            <Link href="/admin/users"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Users
                            </button></Link>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item" style={{borderRadius:"10px"}}>
                            <h2 className="accordion-header" id="headingFive">
                            <Link href="/admin/orders"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Orders
                            </button></Link>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                
                            </div>
                            </div>
                        </div>
                    </div>  */}
                </div>

                <div className="col-md-9">
                    {props.children}
                </div>
            </div>
        
        </div>            

    </div>
}