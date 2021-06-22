import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from "../common/layout";
// import {user} from "../../src/user";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';


export default function AccountPage(props) { 
    const [active,setActive] = React.useState(null)
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
      setError("")
      setSuccess("") 
    }
    const router = useRouter();

    const [user,setUser] = React.useState(null)


    // Menu 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    useEffect(() => {
        setActive(router.asPath)
        
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setUser(user)
        }
    }, [])
    
    return <div>
        <Layout error={error} success={success} close={closeAlert}>
            <div className="w-full md:w-75 mx-auto my-8 container">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium">Account</h3>
                        <h3 className="text-sm">{user?.name || user?.email}</h3>
                    </div>
                    <div className="md:hidden">
                        
                        <MoreVertIcon onClick={handleClick} />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><Link href="/account/overview">Overview</Link></MenuItem> 
                            <MenuItem onClick={handleClose}><Link href="/account/orders">Orders & Returns</Link></MenuItem> 
                            <MenuItem onClick={handleClose}><Link href="/account/profile">Profile</Link></MenuItem> 
                            <MenuItem onClick={handleClose}><Link href="/account/addresses">Addresses</Link></MenuItem> 
                        </Menu>
                    </div>
                </div>
                <hr className="my-2" />
                <div className="flex-row md:flex">
                    <div className="w-full md:w-1/5 md:border-r-2 border-gray-300 hidden md:block">
                        <Link href="/account/overview">
                        <div className={active =="/account/overview"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Overview</div>
                        </Link>
                        <hr className="my-2 w-5/6" />
                        <h3 className="font-medium pt-2">Orders</h3>
                        <Link href="/account/orders">
                        <div className={active =="/account/orders"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Orders & Returns</div>
                        </Link>
                        <hr className="my-2 w-5/6" />
                        <h3 className="font-medium pt-2">Credits</h3>
                        <Link href="/account/coupouns">
                        <div className={active =="/account/coupouns"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Coupouns</div>
                        </Link>
                        <Link href="/account/credits">
                        <div className={active =="/account/credits"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Treevest Credit</div>
                        </Link>
                        <Link href="/account/cash">
                        <div className={active =="/account/cash"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>TreevestoCash</div>
                        </Link>
                        <hr className="my-2 w-5/6" />
                        <h3 className="font-medium pt-2">Account</h3>
                        <Link href="/account/profile">
                        <div className={active =="/account/profile"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Profile</div>
                        </Link>
                        <Link href="/account/cards">
                        <div className={active =="/account/cards"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Saved Cards</div>
                        </Link>
                        <Link href="/account/addresses">
                        <div className={active =="/account/addresses"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Addresses</div>
                        </Link>
                        <Link href="/account/insiders">
                        <div className={active =="/account/insiders"?"text-xl font-light py-1 text-gray-500 text-primary md:border-r-4 border-gray-500 cursor-pointer":"text-xl font-light py-1 cursor-pointer"}>Treevesto Insider</div>
                        </Link>
                        <hr className="my-2 w-5/6" />
                        <h3 className="font-medium pt-2">Legal</h3>
                        <div className="text-xl font-light py-1 cursor-pointer">Terms of Use</div>
                        <div className="text-xl font-light py-1 cursor-pointer">Privacy Policy</div> 

                    </div>
                    <div className="w-full md:w-4/5 md:p-2 my-4">
                        {props.children}
                    </div>
                </div>

            </div>

            
        </Layout>
    </div>
}