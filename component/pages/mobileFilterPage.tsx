import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel, Card, FormControl, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import RangeSlider from '../material/range';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function MobileFilterPage(props) {
    const router = useRouter();
    const [navigation,setNavigation] = React.useState("colour")
    const sizeList = props.sizeList
    const colourList = props.colourList
     
    return <div className=""> 
        <div className=""> 

            {colourList.length > 0 || sizeList.length > 0 ? <>
                <div className="flex justify-between border-b-2 p-2 mb-4">
                    <h5 className="text-2xl font-medium">Filters</h5>
                    <Button variant="text" color="primary" onClick={props.reset}>
                        Clear All
                    </Button>

                </div>
                {props.chips}
                <div className="p-3">
                    <h5 className="text-lg font-medium mt-2">Price Range </h5>
                    <RangeSlider min={props.min} max={props.max} change={props.change.handleRangeChange} value={props.values.priceRange} />
                </div>
 

                <div className="row p-0 m-0">
                    <div className="col-4 my-2 p-0">
                        <div onClick={()=>setNavigation("colour")} className={navigation === "colour"?"p-2 px-3 bg-gray-200 font-medium text-xl":"p-2 px-3 text-xl"}>Colour</div>
                        <div onClick={()=>setNavigation("size")} className={navigation === "size"?"p-2 px-3 bg-gray-200 font-medium text-xl":"p-2 px-3 text-xl"}>Size</div>
                    </div>
                    <div className="col-8 border-2 border-gray-300 p-2">
                        {navigation === "colour" && <div className="p-1">
                            <ul className="p-0 my-1">
                                {colourList.map((e,k)=>(
                                    <li key={k}>
                                        <FormControlLabel label={<div><span className="rounded-circle" style={{padding:"1px 9px",margin:"5px",backgroundColor:""+e}}></span> {e} </div>} className="-my-4" control={
                                            <Checkbox size="small" checked={props.values.colour.find(d=>d===e)?true:false}  
                                            name={e} color="primary" onChange={props.change.handleColourChange} /> } 
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>}
                        {navigation === "size" && <div className="p-1">
                            <ul className="p-0 my-1">
                                {sizeList.map((e,k)=>(
                                    <li key={k}>
                                        <FormControlLabel label={e} className="-my-4" control={
                                        <Checkbox size="small" name={e} checked={props.values.size.find(d=>d===e)?true:false} 
                                        color="primary" onChange={props.change.handleSizeChange} /> } 
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>}
                    </div>
                </div>
            
            </>:<>
                <div className="p-4">
                    <div className="display-6"> No Products Available </div>
                    <div className="text-secondary"> 
                    If products are visible to you kindly refresh it.
                    <span className="cursor-pointer text-primary px-2" onClick={e=>router.reload()}>click here</span>  
                    </div>
                </div>
            </>}



        </div>
    </div>
}