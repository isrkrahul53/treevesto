import React, { useEffect } from 'react';
import AdminLayout from "../../../component/common/AdminLayout";
import {useForm} from 'react-hook-form'


export default function SizeChartAdminPage(){
    const {register,handleSubmit,errors} = useForm();
 
    const [data,setData] = React.useState({
        size:["M","S","L"],
        chest:["32","30","35"]
    }) 
    useEffect(()=>{
        
        console.log(Object.keys(data).filter(e=>e != 'size'))
        
    }) 

    const addColumn = () => {
        var x = prompt("Enter column name")
        if(x){
            setData({...data,[x]:[]})
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }
 
    return  <AdminLayout>
        <div className="container">
            <div className="flex items-center">
                {Object.keys(data).map((e,k)=>(
                    <div className="p-2 border w-full">{e}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center">
                    {Object.keys(data).map((e,k)=>(
                        <div className="p-2 border w-full">
                            {data[e].map((el,key)=>(<>
                                <div> {el} </div>
                            </>))}
                            <div> <input type="text" name={e} ref={register({required:true})} className="form-control" /> </div>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary">Save</button>

            </form>

            <button className="btn btn-primary" onClick={addColumn}>AddColumn</button>
        </div>
    </AdminLayout>
}