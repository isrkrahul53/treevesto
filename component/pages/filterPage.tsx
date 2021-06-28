import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel, Card, FormControl, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import RangeSlider from '../material/range';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function FilterPage(props) {
    const router = useRouter();
    const sizeList = props.sizeList
    const colourList = props.colourList
     
    return <div className=""> 
        <div className="py-3"> 

            {colourList.length > 0 || sizeList.length > 0 ? <>
                <h5 className="text-lg font-medium mt-2">Price Range </h5>
                <RangeSlider min={props.min} max={props.max} change={props.change.handleRangeChange} value={props.values.priceRange} />

                <h5 className="text-lg font-medium">Colour</h5>
                <ul className="p-0 my-1">
                    {colourList.map((e,k)=>(
                        <li key={k}>
                            {/* <span className="rounded-circle" style={{padding:"6px",margin:"5px",backgroundColor:""+e}}></span> */}
                            <FormControlLabel label={<div><span className="rounded-circle" style={{padding:"1px 9px",margin:"5px",backgroundColor:""+e}}></span> {e} </div>} className="-my-4" control={
                                <Checkbox size="small" checked={props.values.colour.find(d=>d===e)?true:false}  
                                name={e} color="primary" onChange={props.change.handleColourChange} /> } 
                            />
                        </li>
                    ))}
                </ul>

                <h5 className="text-lg font-medium">Size</h5>
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