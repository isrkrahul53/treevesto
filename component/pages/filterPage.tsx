import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel, Card, FormControl, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import RangeSlider from '../material/range';
import {  } from '@material-ui/core';

export default function FilterPage(props) {
    
    const sizeList = props.sizeList
    const colourList = props.colourList
    

    return <div className="pl-4">
        <div className="flex items-center justify-between">
            {/* <h5 className="text-3xl">Filters</h5> */}
            {/* <Button variant="text" color="primary">
            Clear All
            </Button> */}
        </div>
        <div className="py-3">
            <h5 className="text-lg font-medium mb-2">Sort By</h5>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup aria-label="wallet" name="wallet" defaultValue={props.values.sort} onChange={props.change.handleSortChange} >
                    <FormControlLabel className="lg:-mt-3" value={"latest"} control={<Radio />} label={"Latest"} />        
                    <FormControlLabel className="lg:-mt-3" value={"popularity"} control={<Radio />} label={"Popularity"} />        
                    <FormControlLabel className="lg:-mt-3" value={"high"} control={<Radio />} label={"Price High to low"} />        
                    <FormControlLabel className="lg:-mt-3" value={"low"} control={<Radio />} label={"Price Low to high"} />        
                    {/* {paymentMethods && Object.keys(paymentMethods.wallet).map((e,k)=>(
                    ))} */}
                </RadioGroup>
            </FormControl>

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
        </div>
    </div>
}