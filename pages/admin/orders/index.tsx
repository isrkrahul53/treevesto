import React from 'react'
import AdminLayout from "../../../component/common/AdminLayout";
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';
import https from 'https'
import MaterialModal from '../../../component/material/materialModal';
import Button from '@material-ui/core/Button'

export default function AdminOrdersPage(props){

  const [selected,setSelected] = React.useState(null);

  console.log(props.orders)

  return <AdminLayout>
  <div className="p-3 text-xl border shadow-sm bg-white" style={{borderRadius:"10px"}}>Orders</div>
  
  <table className="table table-hover border p-2 shadow-md my-2 bg-white" style={{borderRadius:"10px",overflow:"hidden"}}>
      <thead>
      <tr>
          <th>Order Id</th>
          <th>Mode</th>
          <th>TotalAmt</th>
          <th>Data</th> 
          <th>Action</th> 
      </tr>
      </thead>
      <tbody>
      {props.orders.map((el,key)=>(
          <tr key={key}>
            <td>{el._id}</td> 
            <td>{el.orderType}</td> 
            <td>Rs. {el.totalAmount}</td> 
            <td>{el.date.substring(0,19)}</td> 
            <td>
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
              
            </td> 
          </tr> 
      ))}
      </tbody>
  </table>
   
 


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