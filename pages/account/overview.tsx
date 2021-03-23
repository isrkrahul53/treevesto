import Link from 'next/link';
import AccountPage from "../../component/pages/account";
import Button from '@material-ui/core/Button'

function Card(props){
    return <div className="text-center p-2 py-4 border bg-white shadow-sm">
    <img src={props.image} className="w-10 mx-auto" />
    <div className="text-xl font-medium">{props.name}</div>
    <div className="text-sm text-secondary">{props.description}</div>
</div>
}

export default function OverviewPage() {
    return <div>
        <AccountPage>

            <div className="">

                <div className="p-2">

                    <div className="flex items-start border p-3">
                        {/* <img src="/assets/images/user.jpg" className="w-1/5" alt="User"/> */}
                        <div className="w-20 h-20 mr-2 bg-white shadow-sm border rounded"></div>
                        <div className="my-auto me-auto">
                            <div>Full Name</div>
                            <div>email@gmail.com</div>
                            <div>6209460626</div>
                        </div>
                        <Link href="/account/profile/edit"><Button variant="contained" color="secondary" className="m-2">
                          Edit Profile
                        </Button></Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-4">
    

                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-orders.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Orders</div>
                            <div className="text-sm text-secondary">Check your order status</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-collections.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Collection & Wishlist</div>
                            <div className="text-sm text-secondary">All your curated product collection</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-myntra-credit.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Myntra Credits</div>
                            <div className="text-sm text-secondary">Manage all your refunds and gift cards</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-myntrapoints.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">MynCash</div>
                            <div className="text-sm text-secondary">Earn MynCash as you shop and use them in checkout</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-cards.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Saved Cards</div>
                            <div className="text-sm text-secondary">Save your cards for faster checkout</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-address.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Addresses</div>
                            <div className="text-sm text-secondary">Save addresses for hassle-free checkout</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-coupons.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Coupouns</div>
                            <div className="text-sm text-secondary">Manage coupouns for addition discount</div>
                        </div>
                        <div className="text-center p-2 py-4 border bg-white shadow-sm">
                            <img src="/assets/images/profile/profile-edit.png" className="w-10 mx-auto" />
                            <div className="text-xl font-medium">Profile Details</div>
                            <div className="text-sm text-secondary">Change your profile Details and password</div>
                        </div>
                    </div>

                </div>


            </div>
            
        </AccountPage>        
    </div>
}