import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import RangeSlider from '../material/range';

export default function FilterPage(props) {
    
    const sizeList = props.sizeList
    const colourList = props.colourList
    

    return <div>
        <div className="flex items-center justify-between">
            <h5 className="text-2xl">Filter</h5>
            <Button variant="text" color="primary">
            Clear All
            </Button>
        </div>
        <div className="py-3">
            <h5 className="text-lg font-medium">Price Range </h5>
            <RangeSlider min={props.min} max={props.max} change={props.change.handleRangeChange} value={props.values.priceRange} />

            <h5 className="text-lg font-medium">Colour</h5>
            <ul className="p-0 my-1">
                {colourList.map((e,k)=>(
                    <li key={k}>
                        <FormControlLabel label={e} className="-my-4" control={
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