import React, { useEffect } from 'react';
import Link from "next/link";
import AdminLayout from "../../../component/common/AdminLayout"; 

import axios from 'axios';
import https from 'https';

export default function SizeChartAdminPage(props){   
    console.log(props.sizeChart)

    const [data,setData] = React.useState([
        ["Size","Chest"],
        ["M","32"],
    ]) 

    return  <AdminLayout>
        <div className="container"> 
        <div className="text-right my-2">
            <Link href="/admin/sizeChart/create"><button className="btn btn-primary">Add</button></Link>
        </div>
        {props.sizeChart.map((e,k)=>(<>
            <h3 className="text-lg my-2"> {k+1}. {e.name} </h3>
            <table key={k} className="table table-hover border">
                <thead>
                    {/* <tr>
                        {data[0].map((e,k)=>(
                            <th> {e} </th>
                        ))}
                    </tr> */}
                </thead>
                <tbody>
                    {JSON.parse(e.data)?.map((el,key)=>(<tr key={key}> 
                        {el?.map((e,k)=>(
                            <td> {e} </td>
                        ))} 
                    </tr>))}
                </tbody>
            </table>

        </>))} 
        </div>
    </AdminLayout>
}
export const getStaticProps = async (context) => {
 
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const sizeChart = await axios.get(`https://api.treevesto.com:4000/sizechart`,{httpsAgent:agent})
  
  return {
    props: { 
      sizeChart:sizeChart.data.result
    }
  };
}