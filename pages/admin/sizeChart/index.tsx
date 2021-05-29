import React, { useEffect } from 'react';
import AdminLayout from "../../../component/common/AdminLayout"; 

import axios from 'axios';
import https from 'https';

export default function SizeChartAdminPage(props){   
    // console.log(props.sizeChart)

    const [data,setData] = React.useState([
        ["Size","Chest"],
        ["M","32"],
    ]) 

    return  <AdminLayout>
        <div className="container"> 
            <table className="table table-hover border">
                <thead>
                    {/* <tr>
                        {data[0].map((e,k)=>(
                            <th> {e} </th>
                        ))}
                    </tr> */}
                </thead>
                <tbody>
                    {data?.map((el,key)=>(<tr key={key}> 
                        {el?.map((e,k)=>(
                            <td> {e} </td>
                        ))} 
                    </tr>))}
                </tbody>
            </table>
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