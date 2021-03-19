import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'; 

export default function MaterialChipArray(props) {
  
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div className="flex">
      {chipData.map((data) =>  (
          <div key={data.key}>
            <Chip 
              label={data.label}
              color="default"
              onDelete={handleDelete(data)} 
              className="mx-1"
            />
          </div>
        ))}
    </div>
  );
}
