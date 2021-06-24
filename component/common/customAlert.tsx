import React, { useEffect } from 'react'
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';


export default function CustomAlert(){

    const alert = useSelector((state:any)=>state.alert)
    const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     if(alert){
    //         setTimeout(()=>dispatch({type:"resetAlert"}), 4000);
    //     }
    // })

    // return <div className="position-fixed bottom-0 start-0 m-2 z-20 shadow" style={{zIndex: 10}}>
    //  {alert != ""?<Alert variant="filled" onClose={()=>{dispatch({type:"resetAlert"})}} severity="info"> {alert} </Alert>:<div></div>} 
    //  {/* {success != ""?<Alert onClose={()=>{closeSuccessAlert()}} severity="success"> {success} </Alert>:<div></div>}  */}
    // </div>
    return <Snackbar 
    open={alert != "" ? true:false} 
    autoHideDuration={4000} 
    // anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    onClose={()=>{dispatch({type:"resetAlert"})}}>
        <Alert onClose={()=>{dispatch({type:"resetAlert"})}} severity="info" variant="filled">
        {alert}
        </Alert>
    </Snackbar>
}
 