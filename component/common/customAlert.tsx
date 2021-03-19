import React, { useEffect } from 'react'
import Alert from '@material-ui/lab/Alert';

export default function CustomAlert(props){

    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeErrorAlert = () => { 
        setError("") 
    }
    const closeSuccessAlert = () => {  
        setSuccess("")  
    }

    useEffect(()=>{
        setError(props.error)
        setSuccess("")
        setTimeout(closeErrorAlert, 4000);
    },[props.error])

    useEffect(()=>{
        setSuccess(props.success)
        setError("")
        setTimeout(closeSuccessAlert, 4000);
    },[props.success])

    return <div className="position-fixed bottom-0 start-0 m-2 z-20 shadow" style={{zIndex: 10}}>
     {error != ""?<Alert onClose={()=>{closeErrorAlert()}} severity="error"> {error} </Alert>:<div></div>} 
     {success != ""?<Alert onClose={()=>{closeSuccessAlert()}} severity="success"> {success} </Alert>:<div></div>} 
    </div>
}