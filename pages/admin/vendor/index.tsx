import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout' 
import { useRouter } from 'next/router'; 
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'; 
import StoreIcon from '@material-ui/icons/Store';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function VendorPage() {
    const router = useRouter();
     
  const [navigation, setNavigation] = React.useState('vendors');

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
    
    return <AdminLayout>
        <div className="p-3 text-xl border shadow-sm">Vendor</div>
        <div className="my-2"></div> 


        <BottomNavigation value={navigation} onChange={handleNavigationChange}>
            <BottomNavigationAction label="Vendors" value="vendors" icon={<StoreIcon />} />
            <BottomNavigationAction label="Products" value="products" icon={<AppsIcon />} />
            <BottomNavigationAction label="Verification" value="verification" icon={<AssignmentTurnedInIcon />} />
        </BottomNavigation>
        
        {navigation == 'vendors'?<div>
            
        </div>:<></>}


    </AdminLayout> 
}