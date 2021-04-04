import React from 'react'
import AdminLayout from "../../../component/common/AdminLayout";

import axios from 'axios';
import https from 'https'

export default function AdminOrdersPage(props){

  const [selected,setSelected] = React.useState(null);

  console.log(props.orders)

  return <AdminLayout>
  <div className="p-3 text-xl border shadow-sm">Orders</div>
  <br className="my-2" />
  <table className="table table-hover border p-2 shadow-sm my-2 bg-white">
      <thead>
      <tr>
          <th>S.no</th>
          <th>Order Id</th>
          <th>Mode</th>
          <th>Data</th> 
          <th>Status</th> 
          <th>Action</th> 
      </tr>
      </thead>
      <tbody>
      {props.orders.map((el,key)=>(
          <tr key={key}>
            <td>{key+1}</td>
            <td>{el._id}</td> 
            <td>{el.orderType}</td> 
            <td>{el.date.substring(0,19)}</td> 
            <td className={el.orderStatus == "0"?"":"d-none"}>Pending ...</td> 
            <td className={el.orderStatus == "1"?"text-grey-400":"d-none"}>Order Placed</td> 
            <td className={el.orderStatus == "2"?"text-primary":"d-none"}>Out for Delivery</td> 
            <td className={el.orderStatus == "3"?"text-success":"d-none"}>Delivered</td> 
            <td></td> 
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
  const orders = await axios.get(`https://api.treevesto.com:4000/order`)
  
  return {
    props: { 
      orders:orders.data.result
    }
  };
}