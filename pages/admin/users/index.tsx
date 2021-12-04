import React, { useEffect, lazy, Suspense } from 'react'
const AdminLayout = lazy(()=>import('../../../component/common/AdminLayout'));

import axios from 'axios';
import https from 'https'
import {DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

export default function AdminUserPage(props){

  const rows:GridRowsProp = props.users.map((e,k)=>({...e,id:k+1}))
  
  const columns:GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email Address', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];
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
        
    
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid  rows={rows} columns={columns} />
          </div>
        </div>
      </div>


    </AdminLayout> 
  </Suspense>
  
}
export const getServerSideProps = async (context) => {
  
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const users = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}user`,{httpsAgent:agent})
 

  return {
    props: {
      users:users.data.result, 
    }
  };
}