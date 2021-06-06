import React, { useEffect, lazy, Suspense } from 'react'
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router';


export default function CreateSizeChartAdminPage(){
    const {register,handleSubmit,errors} = useForm();
    const router = useRouter()
    const [data,setData] = React.useState([
        ["Size","Chest"],
        ["M","32"],
    ]) 

    const [isFront, setIsFront] = React.useState(false);

    useEffect(()=>{
        process.nextTick(() => {
          if (globalThis.window ?? false) {
              setIsFront(true);
          }
        });
    },[])

    
    const onSubmit = (x) => {
        var formData = new FormData();
        formData.append("image",x.image[0])
        formData.append("name",x.name)
        formData.append("data",JSON.stringify(data))
        fetch(`https://api.treevesto.com:4000/sizechart/`,{
            method:"POST",
            body:formData
        }).then(d=>d.json()).then(json=>{
            router.push("/admin/sizeChart")
        })
    }

    const addColumn = (e) => {
        var x = data
        x.map((e,k)=>x[k].push(""))
        setData([...data])
        
    }
    
    const removeColumn = (x) => {
        var ar = data
        ar.map(e=>{
            delete e[x]
        })
        setData([...data])
    }

    const addRow = (e) => {
        var x = data
        x.push(x[0].map(e=>""))
        setData([...data])
        
    }
    
    const removeRow = (x) => {
        var ar = data;
        ar = ar.filter((e,k)=>k != x)
        // delete ar[x]
        setData([...ar])
        console.log(ar)
    }
    
    const updateChart = (event,key,k) => {
        var x = data
        x[key][k] = event.target.value
        setData(x)
        
        // data[key][k] = event.target.value
    } 
    
    if (!isFront) return null;


    return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
        <AdminLayout>
            <div className="container"> 

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    <input type="file" name="image" id="image" ref={register()} className="form-control my-2" />
                    <input type="text" name="name" id="name" ref={register({required:true})} className="form-control my-2" placeholder="Enter chart name" />

                </form>
                <div className="flex items-center">
                    {data[0].map((e,k)=>(
                        <div key={k} className="w-full border p-2 text-center">
                            <span className="cursor-pointer text-2xl" onClick={e=>removeColumn(k)}>&times;</span>
                        </div>
                    ))}
                    <div className="p-2 w-4">
                        <span className="cursor-pointer invisible">&times;</span>
                    </div>
                </div>
                <div className="flex ">
                    <div className="w-full">
                        {data?.map((el,key)=>(<div key={key}>
                            <div className="flex items-center">
                                {el?.map((e,k)=>(
                                    <div key={k} className="w-full border flex items-center"> 
                                        <input type="text" className="form-control transition focus:text-blue-400" defaultValue={e} onChange={(event)=>updateChart(event,key,k)} />
                                    </div>

                                ))}
                            </div>
                        </div>))} 

                    </div>
                    <div className="w-4">
                        {data?.map((e,k)=>(
                            <div key={k} className="p-1">
                                {k === 0 ? <>
                                    <span className="cursor-pointer text-2xl invisible">&times;</span>
                                </>:<>
                                    <span className="cursor-pointer text-2xl" onClick={e=>removeRow(k)}>&times;</span>
                                </>}
                            </div>
                        ))}

                    </div>
                </div>


                <div className="text-right my-2">
                    <div className="btn-group">
                        <button type="button" className="btn btn-light" onClick={addColumn}>Add Column</button>
                        <button type="button" className="btn btn-light" onClick={addRow}>Add Row</button>
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    </Suspense>
}