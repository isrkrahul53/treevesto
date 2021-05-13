import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'; 

export default function MaterialChipArray(props) {
  
  const [chipData, setChipData] = React.useState([]);
 
  useEffect(()=>{
    setChipData(props.data?.size)
  },[props.data])


  return (
    <div className="flex flex-wrap">
      {props.data?.size.map((data,key) =>  (
        <div key={key} className="my-1">
          <Chip 
            label={data}
            color="default"
            onDelete={e=>props.delSize(key)} 
            className="mx-1"
          />
        </div>
      ))}
      {props.data?.colour.map((data,key) =>  (
          <div key={key} className="my-1">
            <Chip 
              label={data}
              color="default"
              onDelete={e=>props.delColour(key)} 
              className="mx-1"
            />
          </div>
        ))}
    </div>
  );
}
