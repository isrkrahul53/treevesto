import React from 'react'
import AccountPage from "../../../component/pages/account";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function EditProfilePage() {
    const [gender,setGender] = React.useState(1)
    return <div>
        <AccountPage>
            <div className="border bg-white shadow-sm p-3">
                <div className="w-full md:w-5/6 mx-auto">
                    <h3 className="text-2xl font-medium">Edit Details</h3>
                    <hr className="my-3"/>
                    
                    <TextField className="my-2" type="number" id="phone" label="Phone Number" variant="outlined" color="primary" fullWidth size="small" />
                    <TextField className="my-2" id="name" label="Full Name" variant="outlined" color="primary" fullWidth size="small" />
                    <TextField className="my-2" id="email" label="Email Address" variant="outlined" color="primary" fullWidth size="small" />

                    <div className="flex items-center">
                        <div onClick={()=>setGender(1)} className={gender == 1?"p-2 w-100 m-1 cursor-pointer text-md border-2 border-gray-500":"w-100 m-1 p-2 cursor-pointer text-md border"}>Male</div>
                        <div onClick={()=>setGender(2)} className={gender == 2?"p-2 w-100 m-1 cursor-pointer text-md border-2 border-gray-500":"w-100 m-1 p-2 cursor-pointer text-md border"}>Female</div>
                    </div>

                    <TextField className="my-2" id="birthday" label="Birthday" variant="outlined" color="primary" fullWidth size="small" />
                    <TextField className="my-2" id="location" label="Location" variant="outlined" color="primary" fullWidth size="small" />

                    {/* <Button variant="contained" color="primary" fullWidth className="my-4">
                      Save Details
                    </Button> */}
                    
                    <div className="px-4 py-2 my-4 w-full text-center text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                    Edit Profile
                    </div>


                </div>


            </div>
        </AccountPage>        
    </div>
}