import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import AdminSidebar from './adminSidebar';

export default function AdminLayout(props) {
    
    const router = useRouter();
    const path = router.asPath.split("/");
    const navs = ["dashboard","homepage","vendors","users","orders","category","coupons"] 

    const [admin,setAdmin] = React.useState(null);
    const [height,setHeight] = React.useState(null)
    const [expand,setExpand] = React.useState(navs.filter(e=>path.filter(a=>a===e).length > 0)[0] || "");
 
    useEffect(()=>{  
        setHeight(window.innerHeight)
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

    return <div className="container-fluid">  
        <div className="row">
            <div className="col-xl-3 hidden xl:block p-0 border-r-2 fixed bg-white top-0 left-0 h-full">
                <div className="flex items-center justify-between">
                    <img src="/logoHead.png" alt="logo" width="80px" />
                    <img src="/assets/icons/logout.jpg" alt="logout" onClick={logout} className="mx-4 cursor-pointer" width="30px" />
                </div>

                <div className="flex items-center m-3 px-3 bg-gray-100 rounded" style={{borderRadius:"40px"}}>
                    {/* <img src="/assets/icons/user.png" alt="user" width="30px" /> */}
                    <div className="p-3">
                        <div className="text-xl font-medium">{admin?.email || "JOhn Doe"}</div>
                        <div className="text-sm text-secondary">admin</div>
                    </div>
                </div>

                <List>
                    <Link href="/admin/"><ListItem button className={expand === "" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <DashboardIcon />  </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem></Link>
                    <Link href="/admin/homepage"><ListItem button className={expand === "homepage" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <DesktopWindowsIcon />  </ListItemIcon>
                        <ListItemText primary={"Homepage"} />
                    </ListItem></Link>
                    <Link href="/admin/vendors"><ListItem button className={expand === "vendors" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
                        <ListItemText primary={"Vendors"} />
                    </ListItem></Link>
                    <Link href="/admin/users"><ListItem button className={expand === "users" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <PersonIcon />  </ListItemIcon>
                        <ListItemText primary={"Users"} />
                    </ListItem></Link>
                    <Link href="/admin/orders"><ListItem button className={expand === "orders" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
                        <ListItemText primary={"Orders"} />
                    </ListItem></Link>
                    <Link href="/admin/category"><ListItem button className={expand === "category" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <CategoryIcon />  </ListItemIcon>
                        <ListItemText primary={"Category"} />
                    </ListItem></Link>
                    <Link href="/admin/coupons"><ListItem button className={expand === "coupons" && "bg-light border-2 border-end border-success"}>
                        <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
                        <ListItemText primary={"Coupons"} />
                    </ListItem></Link>
                </List>
            </div>
            <div className="col-xl-9 py-3 offset-xl-3">
                <span className="xl:hidden flex items-center">
                    <AdminSidebar />
                    <img src="/logoHead.png" alt="logo" width="50px" className="mx-2" />
                    <img src="/assets/icons/logout.jpg" className="ml-auto mr-2" width="20px" alt="logout"/>
                    
                </span>
                {/* <div className="flex items-center p-3">
                    <div className="ml-auto flex items-center">
                        <div className="flex items-center mx-2"><span>{admin?.email}</span> </div>
                        <img src="/assets/icons/logout.jpg" alt="logout" width="30px" />
                    </div>
                </div> */}

                {props.children}

            </div>
        </div>
    </div>
}