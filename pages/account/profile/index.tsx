import React, { useEffect } from 'react';
import Link from 'next/link';
import AccountPage from "../../../component/pages/account";
import Button from '@material-ui/core/Button'

export default function ProfilePage() {
    const [user,setUser] = React.useState(null)
    
    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            fetch(`https://api.treevesto.com:4000/user/`+user.userId).then(d=>d.json()).then(json=>{
                setUser(json.result[0])
                console.log(json.result)
            })
        }
    },[])

    
    return <div>
        <AccountPage>
            <div className="border bg-white shadow-sm p-3">
                <div className="w-full md:w-5/6 mx-auto">
                    <h3 className="text-2xl font-medium">Profile Details</h3>
                    <hr className="my-3"/>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Full Name</div>
                        <div>{user?.name || "N/A"}</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Mobile Number</div>
                        <div>{user?.phone || "N/A"}</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Email ID</div>
                        <div>{user?.email || "N/A"}</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Gender</div>
                        <div>{user?.gender || "N/A"}</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Date of Birth</div>
                        <div>{user?.dob || "N/A"}</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Location</div>
                        <div>{user?.location || "N/A"}</div>
                    </div>

                    <Link href="/account/profile/edit">
                    {/* <Button variant="contained" color="secondary" fullWidth className="my-4">
                      Edit Profile
                    </Button> */}
                    <div className="px-4 py-2 my-4 w-full text-center text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                    Edit Profile
                    </div>
                    </Link>


                </div>


            </div>
        </AccountPage>        
    </div>
}