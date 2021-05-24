import React from 'react'
import AdminLayout from "../../../component/common/AdminLayout";
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';
import https from 'https'
import MaterialModal from '../../../component/material/materialModal';
import Button from '@material-ui/core/Button'

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function AdminOrdersPage(props){

  const [selected,setSelected] = React.useState(null);

  console.log(props.orders)

  return <AdminLayout>
    
    <TableContainer component={Paper}>
      <Table className="">
          <TableHead>
          <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>TotalAmt</TableCell>
              <TableCell>Data</TableCell> 
              <TableCell>Action</TableCell> 
          </TableRow>
          </TableHead>
          <TableBody>
          {props.orders.map((el,key)=>(
              <TableRow key={key}>
                <TableCell>
                  <div className="flex items-center">
                    {JSON.parse(el.cart).map((e,k)=>(
                      <img key={k} src={e.image} width={35-(k*2)+"px"} className="border-2 border-dark rounded shadow-sm -mr-2" alt="" />
                    ))}
                    <div className="ml-3"> {el._id} </div>
                  </div>
                </TableCell> 
                <TableCell>{el.orderType}</TableCell> 
                <TableCell>Rs. {el.totalAmount}</TableCell> 
                <TableCell>{el.date.substring(0,10)}</TableCell> 
                <TableCell>
                  <MaterialModal name={"Order Id : "+el._id} label={<VisibilityIcon className="cursor-pointer" />} content={<>
                    {JSON.parse(el.cart).map((e,k)=>(
                      <div key={k} className="d-flex align-items-center my-2">
                        <img src={e.image} className="rounded" width="50px" alt=""  />
                        <div className="p-2">
                          <div> {e.name} </div>
                          <div> Rs. <span className="text-xl">{e.price}</span> Qty : {e.qty} </div>
                        </div>
                      </div>
                    ))}
                    <hr className="my-3" />
                    <div className="text-right">
                      <div>Total Amount : Rs. <span className="text-xl">{el.totalAmount}</span> </div>
                    </div>

                  </>} />
                  
                </TableCell> 
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
  const orders = await axios.get(`https://api.treevesto.com:4000/order`,{httpsAgent:agent})
  
  return {
    props: { 
      orders:orders.data.result
    }
  };
}