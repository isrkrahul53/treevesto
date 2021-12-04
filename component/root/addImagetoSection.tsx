import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button'

import axios from 'axios';
import https from 'https'
import RangeSlider from '../material/range';

function Container(props){
    return <div>
    <div className="container-fluid">
        {props.children}
    </div>
</div>
}

function BootstrapInputField(props){
    return <div className="row">            
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-12">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <input type={props.type} onChange={props.change} defaultValue={props.value} className="form-control" id={props.id} required /> 
        </div>
    </div>
}
function BootstrapTextArea(props){
    return <div className="row">            
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <textarea className="form-control" onChange={props.change} defaultValue={props.value} id={props.id} cols={30} rows={3}></textarea>
        </div>
    </div>
}

function SelectInput(props){
    return <div className="row">            
    <div className="col-md-2"></div>
    <div className="col-md-8">
        <label htmlFor={props.id} className="form-label">{props.label}</label>
        <select className="form-select" id={props.id} required >
            {props.options.map((data,key)=>(
                <option key={key} value={data.key}> {data.value} </option>
            ))}
        </select> 
    </div>
</div>
}

export default function AddImagetoSectionModal(props){

    const [isLoading,setLoading] = React.useState(false)
    const [products,setProducts] = React.useState([])
    const [category,setCategory] = React.useState([])
    const min = products?.length > 0?products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.min(a,b))-1:0;
    const max = products?.length > 0?products?.map(e=>e.sellingPrice).reduce((a,b)=>Math.max(a,b))+1:0;
    const [link,setLink] = React.useState(null)
    const [filters,setFilters] = React.useState({
        subcat:'',
        color:[],
        size:[],
        from:''+min,
        to:''+max
    })

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}product`).then(d=>d.json()).then(json=>{
            setProducts(json.result)
        })
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}category/all`).then(d=>d.json()).then(json=>{
            setCategory(json.result.filter(e=>e.parentCatId != "0"))
        })
    },[])

    useEffect(()=>{
        var link = '/';
        link += filters.subcat && filters.subcat
        link += filters.color.length > 0 ? '?color='+filters.color.join(","):''
        link += filters.size.length > 0 ? '&size='+filters.size.join(","):''
        link += filters.from && '&from='+filters.from
        link += filters.to && '&to='+filters.to
        setLink(link)
        var x = {target:{value:link}}
        props.link(x)
        // console.log(link.split("?")[1].split("&"))
    },[filters])

    const addColourFilter = (e) => {
        filters.color.find(a=>a==e) ? setFilters({...filters,color:[...filters.color.filter(a=>a!=e)]}):setFilters({...filters,color:[...filters.color,e]})
    }
    const addSizeFilter = (e) => {
        filters.size.find(a=>a==e) ? setFilters({...filters,size:[...filters.size.filter(a=>a!=e)]}):setFilters({...filters,size:[...filters.size,e]})
    }
 
    return <Container>
    {/*  
    <SelectInput id="language" label="Language *" options={[
        {key:0,value:"English"},
        {key:1,value:"Hindi"},
    ]} />
     */}
    <BootstrapInputField id="image" label="Image *" type="file" change={props.image} />
    <input type="text" name="Meta_Keywords" defaultValue={props.Meta_Keywords} onChange={props.Meta_Keywords} className="form-control my-2" placeholder="Meta_Keywords" />
    <input type="text" name="Meta_Data" defaultValue={props.Meta_Data} onChange={props.Meta_Data} className="form-control my-2" placeholder="Meta_Data" />
    <textarea name="Meta_Description" defaultValue={props.Meta_Description} onChange={props.Meta_Description} className="form-control my-2" placeholder="Meta_Description" cols={30} rows={4}></textarea>
    <input type="text" name="Meta_image_URL" defaultValue={props.Meta_image_URL} onChange={props.Meta_image_URL} className="form-control my-2" placeholder="Meta_image_URL" />

    <BootstrapInputField id="link" label="Image Link *" type="text" value={link} change={props.link} />
    

    {/* <BootstrapTextArea id="desc" label="Product Description *" value={props.values.desc} change={props.desc} /> */}
    <div className="row">            
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-12">
            <select name="subCatId" id="subCatId" className="form-select my-2" onChange={e=>setFilters({...filters,subcat:e.target.value})}>
                <option value="">Select Category</option>
                {category.map((e,k)=>(
                    <option key={k} value={e._id}> {e.catName} </option>
                ))}
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="my-2">
                    <div className="text-lg font-medium px-1">Colour</div>
                    <div className="flex items-center flex-wrap">
                        {products?.map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) == k).map((e,k)=>(
                            <div key={k} 
                            className={filters.color.find(a=>a==e)?"text-sm cursor-pointer my-1 mr-1 p-2 border-2 border-dark":"text-sm cursor-pointer mr-1 p-2 border-2"} 
                            onClick={()=>addColourFilter(e)}> 
                                {e} 
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-2">
                    <div className="text-lg font-medium px-1">Size</div>
                    <div className="flex items-center flex-wrap">
                        {products?.map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) == k).map((e,k)=>(
                            <div key={k} 
                            className={filters.size.find(a=>a==e)?"text-sm cursor-pointer my-1 mr-1 p-2 border-2 border-dark":"text-sm cursor-pointer mr-1 p-2 border-2"} 
                            onClick={()=>addSizeFilter(e)}> 
                                {e} 
                            </div>
                        ))}
                    </div>
                </div> 
                <div className="my-2">
                    <div className="text-lg font-medium px-1">Price Range</div>
                </div>
            </div>

        </div>
        <RangeSlider min={min} max={max} change={(e,data)=>setFilters({...filters,from:data[0],to:data[1]})} value={[filters.from,filters.to]} />
        
        <div className="p-2">
            <div className="d-flex justify-content-end">
                <div className="btn-group float-right"> 
                    <button className="btn btn-primary" onClick={()=>{props.submit();setLoading(true)}} disabled={isLoading}>
                        {!isLoading?"Save":"Loading..."}
                    </button>
                </div>
            </div>
        </div>
    </div>
    </Container>
}
 