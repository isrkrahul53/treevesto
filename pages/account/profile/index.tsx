import Link from 'next/link';
import AccountPage from "../../../component/pages/account";
import Button from '@material-ui/core/Button'

export default function ProfilePage() {
    return <div>
        <AccountPage>
            <div className="border bg-white shadow-sm p-3">
                <div className="w-full md:w-5/6 mx-auto">
                    <h3 className="text-2xl font-medium">Profile Details</h3>
                    <hr className="my-3"/>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Full Name</div>
                        <div>Rahul Kumar</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Mobile Number</div>
                        <div>6209460626</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Email ID</div>
                        <div>rahulkr.53@gmail.com</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Gender</div>
                        <div>Male</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Date of Birth</div>
                        <div>07/03/2000</div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="text-xl">Location</div>
                        <div>Jamshedpur</div>
                    </div>

                    <Link href="/account/profile/edit"><Button variant="contained" color="secondary" fullWidth className="my-4">
                      Edit Profile
                    </Button></Link>


                </div>


            </div>
        </AccountPage>        
    </div>
}