import AdminLayout from "../../../component/common/AdminLayout";

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

export default function AdminUserPage(props){
    return <AdminLayout>
      
    <TableContainer component={Paper}>
      <Table>
          <TableHead>
          <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell> 
          </TableRow>
          </TableHead>
          <TableBody>
          {props.users.map((el,key)=>(
              <TableRow key={key}>
              <TableCell>{key+1}</TableCell>
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.email}</TableCell>
              <TableCell>{el.phone}</TableCell> 
              </TableRow> 
          ))}
          </TableBody>
      </Table>
    </TableContainer>
    


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