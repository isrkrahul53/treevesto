import AdminLayout from "../../../component/common/AdminLayout";
import PersonIcon from '@material-ui/icons/Person';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import https from 'https'
import FlexLayoutGrid from "../../../component/Lists/dataGrid";
import {DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

export default function AdminUserPage(props){

  const rows:GridRowsProp = props.users.map((e,k)=>({...e,id:k+1}))
  
  const columns:GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email Address', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

    return <AdminLayout>
      
    {/* <TableContainer component={Paper}>
      <Table className="">
          <TableHead>
          <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell> 
              <TableCell>Phone</TableCell> 
          </TableRow>
          </TableHead>
          <TableBody>
          {props.users.map((el,key)=>(
              <TableRow key={key}>
              <TableCell> <PersonIcon /> {el.name}</TableCell>
              <TableCell>{el.email}</TableCell>
              <TableCell> {el.gender} </TableCell>
              <TableCell>{el.phone || 'N/A'}</TableCell> 
              </TableRow> 
          ))}
          </TableBody>
      </Table>
    </TableContainer> */}
    
    
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid  rows={rows} columns={columns} />
        </div>
      </div>
    </div>


</AdminLayout> 
}
export const getStaticProps = async (context) => {

  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const users = await axios.get(`https://api.treevesto.com:4000/user`,{httpsAgent:agent})
 

  return {
    props: {
      users:users.data.result, 
    }
  };
}