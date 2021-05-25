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
        fetch(`https://api.treevesto.com:4000/product`).then(d=>d.json()).then(json=>{
            setProducts(json.result)
        })
        fetch(`https://api.treevesto.com:4000/category/all`).then(d=>d.json()).then(json=>{
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
        
    </div>
    </Container>
}
 