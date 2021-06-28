import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel, Card, FormControl, FormLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import RangeSlider from '../material/range';
import {  } from '@material-ui/core';

export default function SortByPage(props) {
     
    return <div className=""> 
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
  
        </div>
    </div>
}