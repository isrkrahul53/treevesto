import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminLayout(props) {

    const router = useRouter();
    const [admin,setAdmin] = React.useState(null);
 
    useEffect(()=>{
        var path = router.asPath;

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light border shadow-sm">
            <div className="container-fluid">
                <span className="navbar-brand">Admin</span>
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

        <div className="container my-3">
            <div className="row">
                <div className="col-md-3">

                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <Link href="/admin/"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Dashboard
                            </button></Link>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                
                            </div>
                        </div>
                        <div className="accordion-item">
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
                        <div className="accordion-item">
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
                        <div className="accordion-item">
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
                        <div className="accordion-item">
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
                        </div> 
                    </div>

                <div className="col-md-9">
                    {props.children}
                </div>
            </div>
        
        </div>            

    </div>
}