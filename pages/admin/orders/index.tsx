import React, { useEffect, lazy, Suspense } from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button'

import axios from 'axios';
import https from 'https'

const MaterialModal = lazy(()=>import('../../../component/material/materialModal'));
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));

// Table
import TableContainer from '@material-ui/core/TableContainer';
const Table = lazy(()=>import('@material-ui/core/Table'));
const TableBody = lazy(()=>import('@material-ui/core/TableBody'));
const TableCell = lazy(()=>import('@material-ui/core/TableCell'));
const TableHead = lazy(()=>import('@material-ui/core/TableHead'));
const TableRow = lazy(()=>import('@material-ui/core/TableRow'));
const Paper = lazy(()=>import('@material-ui/core/Paper'));


export default function AdminOrdersPage(props){

  const [selected,setSelected] = React.useState(null);
  const [isFront, setIsFront] = React.useState(false);

  useEffect(()=>{
    process.nextTick(() => {
      if (globalThis.window ?? false) {
          setIsFront(true);
      }
    });
  },[])

  if (!isFront) return null;

  return <Suspense fallback={<div className="text-center py-10">
      <div className="spinner-border text-primary"></div>
    </div>}>
      <AdminLayout>
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
  </Suspense>
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