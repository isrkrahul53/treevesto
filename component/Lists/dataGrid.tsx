import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

export default function FlexLayoutGrid(props) { 
  // const rows: GridRowsProp = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  //   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  // ];
  
  // const columns: GridColDef[] = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid  rows={props.rows} columns={props.columns} />
        </div>
      </div>
    </div>
  );
}
