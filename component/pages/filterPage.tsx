import React from 'react'
import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function FilterPage() {
    
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
      });

    return <div>
        <div className="flex items-center ml-6 mb-2 justify-between">
            <h5 className="text-2xl">Filter</h5>
            <Button variant="text" color="secondary">
            Clear All
            </Button>
        </div>
        <div className="bg-white border shadow-sm py-3 pl-6">
            <h5 className="text-xl">Categories</h5>
            <ul className="p-0 my-1">
            <li>
                <FormControlLabel label="Kurtas" className="-my-4" control={
                <Checkbox checked={state.checkedA} size="small" name="checkedA" color="secondary" 
                onChange={e=>setState({ ...state, [e.target.name]: e.target.checked })} /> } 
                />
            </li>
            <li>
                <FormControlLabel label="Plazzos" className="-my-4" control={
                <Checkbox checked={state.checkedB} size="small" name="checkedB" color="secondary" 
                onChange={e=>setState({ ...state, [e.target.name]: e.target.checked })} /> } 
                /> 
            </li>
            <li>
                <FormControlLabel label="Leggings" className="-my-4" control={
                <Checkbox checked={state.checkedC} size="small" name="checkedC" color="secondary" 
                onChange={e=>setState({ ...state, [e.target.name]: e.target.checked })} /> } 
                /> 
            </li>
            <li>
                <FormControlLabel label="Trousers" className="-my-4" control={
                <Checkbox checked={state.checkedD} size="small" name="checkedD" color="secondary" 
                onChange={e=>setState({ ...state, [e.target.name]: e.target.checked })} /> } 
                /> 
            </li>
            </ul>

        </div>
    </div>
}