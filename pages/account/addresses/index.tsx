import React, { useEffect, lazy, Suspense } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
const AccountPage = lazy(()=>import("../../../component/pages/account"))

export default function Addresses(){
    const router = useRouter();
    const [addresses,setAddress] = React.useState(null)
    const [isFront, setIsFront] = React.useState(false);
    
    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
        fetchAddress();
    },[])
    
    const fetchAddress = () => {
        var user = JSON.parse(localStorage.getItem('user'))
        if(user){
            fetch(`https://api.treevesto.com:4000/user/`+user.userId).then(d=>d.json()).then(json=>{
                fetch(`https://api.treevesto.com:4000/address/user/`+json.result[0]._id).then(d=>d.json()).then(json=>{
                    setAddress(json.result)
                    console.log(json)
                })
            })
        }
    }

    const removeAddress = (id) => {
        fetch(`https://api.treevesto.com:4000/address/`+id,{
            method:"DELETE"
        }).then(d=>d.json()).then(json=>{
            console.log(json)
            fetchAddress();
            
        })
    }

    if (!isFront) return null;

    return <div>
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <AccountPage>
                <div>
                    <div>
                        {addresses?<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {addresses.map((e,key)=>(
                            <div key={key} className="border shadow-sm bg-white p-2">
                                <div className="text-right -mt-8 p-0">
                                    <span onClick={()=>removeAddress(e._id)} className="shadow-sm bg-white border m-0 py-1 text-3xl font-medium cursor-pointer text-red-500">&times;</span>
                                </div>
                                <div><span className="text-2xl">{key+1}.</span> {e.name} {e.phone} </div>
                                <div>{e.address} </div>
                                <div>{e.locality} {e.locality && ","} {e.state} - {e.pincode}</div>
                            </div>
                        ))}
                        </div>:<div className="text-center my-10">
                            <div className="spinner-border text-dark"></div>    
                        </div>}
                    </div>

                    <div className="items-right">
                        <Link href="/account/addresses/add"><div className="px-4 py-2 ml-auto w-full md:w-1/3 text-center text-xl rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                            Add new address +
                        </div></Link>
                    </div>
                </div>

            </AccountPage>
        </Suspense>
    </div>
}