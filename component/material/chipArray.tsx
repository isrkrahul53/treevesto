import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'; 

export default function MaterialChipArray(props) {
  
  const [chipData, setChipData] = React.useState([]);
 
  useEffect(()=>{
    setChipData(props.data?.category)
  },[props.data])


  return (
    <div className="flex">
      {props.data?.category.map((data,key) =>  (
          <div key={key}>
            <Chip 
              label={data}
              color="default"
              onDelete={e=>props.delCategory(key)} 
              className="mx-1"
            />
          </div>
        ))}
    </div>
  );
}
