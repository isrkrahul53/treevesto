import React, { useEffect, lazy, Suspense } from 'react'
import TextField from '@material-ui/core/TextField'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
const AccountPage = lazy(()=>import("../../../component/pages/account"))


export default function EditProfilePage() {
    const router = useRouter();
    const [user,setUser] = React.useState(null)
    const [gender,setGender] = React.useState(user?.gender || "Male")
    const { register, handleSubmit, errors, setValue } = useForm();
    const [isFront, setIsFront] = React.useState(false);
    
    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            fetch(`https://api.treevesto.com:4000/user/`+user.userId).then(d=>d.json()).then(json=>{
                var data = json.result[0]
                setUser(data)
                Object.keys(data).forEach((element) => {
                    setValue(element,data[element]) 
                });
            })
        }
    },[])

    const onSubmit = (data) => {
        var formData = new FormData();
        Object.keys(data).forEach(element => {
            formData.append(element,data[element])
        });
        formData.append("gender",gender)
        
        fetch(`https://api.treevesto.com:4000/user/`+user._id,{
            method:"PATCH",
            body:formData
        }).then(d=>d.json()).then(json=>{
            router.replace("/account/profile")
        })
    }

    if (!isFront) return null;

    return <div>
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <AccountPage>
                <div className="border bg-white shadow-sm p-3">
                    <div className="w-full md:w-5/6 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="text-2xl font-medium">Edit Details</h3>
                            <hr className="my-3"/>
                            
                            {/* <TextField className="my-2" type="number" name="phone" 
                            label="Phone Number" variant="outlined" color="primary" fullWidth size="small"
                            inputRef={register({required:true})} /> */}
                            <TextField className="my-2" name="name" label="Full Name" variant="outlined" color="primary" fullWidth size="small"
                            inputRef={register({required:true})}  />
                            <TextField className="my-2" name="email" label="Email Address" variant="outlined" color="primary" fullWidth size="small"
                            inputRef={register({required:true})}  />

                            <div className="flex items-center">
                                <div onClick={()=>setGender("Male")} className={gender == "Male"?"p-2 w-100 m-1 cursor-pointer text-md border-2 border-gray-500":"w-100 m-1 p-2 cursor-pointer text-md border"}>Male</div>
                                <div onClick={()=>setGender("Female")} className={gender == "Female"?"p-2 w-100 m-1 cursor-pointer text-md border-2 border-gray-500":"w-100 m-1 p-2 cursor-pointer text-md border"}>Female</div>
                            </div>

                            <TextField type="date" className="my-2" name="dob" label="Birthday" variant="outlined" color="primary" fullWidth size="small"
                            inputRef={register()} />
                            <TextField className="my-2" name="location" label="Location" variant="outlined" color="primary" fullWidth size="small"
                            inputRef={register()}  />

                            {/* <Button variant="contained" color="primary" fullWidth className="my-4">
                            Save Details
                            </Button> */}
                            
                            <button type="submit" className="px-4 py-2 my-4 w-full text-center text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                                Edit Profile
                            </button>

                        </form>
                    </div>


                </div>
            </AccountPage> 
        </Suspense>
    </div>
}