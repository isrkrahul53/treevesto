import React, { useEffect, lazy, Suspense } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const AccountPage = lazy(()=>import("../../component/pages/account"))

function Card(props){
    return <div className="text-center p-2 py-4 border bg-white shadow-sm">
    <img src={props.image} className="w-10 mx-auto" />
    <div className="text-xl font-medium">{props.name}</div>
    <div className="text-sm text-secondary">{props.description}</div>
</div>
}

export default function OverviewPage() {
    const router = useRouter();
    const [user,setUser] = React.useState(null)
    const [isFront, setIsFront] = React.useState(false);
    
    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setUser(user)
        }
    },[])
    if (!isFront) return null;

    return <div>
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <AccountPage>
                {user === null ? <>
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary"></div>
                    </div>
                </>:<>
                    <div className="">

                        <div className="md:p-2">

                            <div className="flex-row md:flex items-start border p-3">
                                {/* <img src="/assets/images/user.jpg" className="w-1/5" alt="User"/> */}
                                <div className="flex items-center me-auto">
                                    <div className="w-20 h-20 mr-2 bg-gray-300 shadow-sm border rounded-circle"></div>
                                    <div className="my-auto">
                                        <div>{user?.name || ""}</div>
                                        <div>{user?.email}</div>
                                        <div>{user?.phone}</div>
                                    </div>
                                </div>
                                <Link href="/account/profile/edit">
                                {/* <Button variant="contained" color="secondary" className="m-2">
                                Edit Profile
                                </Button> */}
                                <div className="px-4 py-2 m-2 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                                Edit Profile
                                </div>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
            

                                <Link href="/account/orders"><div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-orders.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Orders</div>
                                    <div className="text-sm text-secondary">Check your order status</div>
                                </div></Link>
                                <Link href="/wishlist"><div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-collections.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Collection & Wishlist</div>
                                    <div className="text-sm text-secondary">All your curated product collection</div>
                                </div></Link>
                                <div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-myntra-credit.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Treevesto Credits</div>
                                    <div className="text-sm text-secondary">Manage all your refunds and gift cards</div>
                                </div>
                                <div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-myntrapoints.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">TreevestoCash</div>
                                    <div className="text-sm text-secondary">Earn TreevestoCash as you shop and use them in checkout</div>
                                </div>
                                <div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-cards.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Saved Cards</div>
                                    <div className="text-sm text-secondary">Save your cards for faster checkout</div>
                                </div>
                                <Link href="/account/addresses"><div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-address.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Addresses</div>
                                    <div className="text-sm text-secondary">Save addresses for hassle-free checkout</div>
                                </div></Link>
                                <div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-coupons.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Coupouns</div>
                                    <div className="text-sm text-secondary">Manage coupouns for addition discount</div>
                                </div>
                                <Link href="/account/profile"><div className="cursor-pointer text-center p-2 py-4 border bg-white shadow-sm">
                                    <img src="/assets/images/profile/profile-edit.png" className="w-10 mx-auto" />
                                    <div className="text-xl font-medium">Profile Details</div>
                                    <div className="text-sm text-secondary">Change your profile Details and password</div>
                                </div></Link>
                            </div>

                        </div>


                    </div>
                
                </>}
                
            </AccountPage>
        </Suspense>
    </div>
}