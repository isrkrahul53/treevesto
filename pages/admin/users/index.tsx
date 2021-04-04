import AdminLayout from "../../../component/common/AdminLayout";

import axios from 'axios';
import https from 'https'

export default function AdminUserPage(props){
    return <AdminLayout>
    <div className="p-3 text-xl border shadow-sm">Users</div>
    <table className="table table-hover border p-2 shadow-sm my-2 bg-white">
        <thead>
        <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th> 
        </tr>
        </thead>
        <tbody>
        {props.users.map((el,key)=>(
            <tr key={key}>
            <td>{key+1}</td>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.phone}</td> 
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
  const users = await axios.get(`https://api.treevesto.com:4000/user`)
 

  return {
    props: {
      users:users.data.result, 
    }
  };
}