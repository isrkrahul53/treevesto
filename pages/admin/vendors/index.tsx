import React, { useEffect } from 'react'
import AdminLayout from '../../../component/common/AdminLayout' 
import { useRouter } from 'next/router'; 
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'; 
import StoreIcon from '@material-ui/icons/Store';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function VendorPage(props) {
  const router = useRouter();
 
  
  const [navigation, setNavigation] = React.useState('products');
  const [selectedVendor, setSelectedVendor] = React.useState("");

  const [products,setProducts] = React.useState([])
  
  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };
  
  
  const getProductsByVendorId = (id) => {
    fetch(`http://treevesto55.herokuapp.com/product/vendor/`+id).then(d=>d.json()).then(json=>{
      setProducts(json.result)
    })

  }


    return <AdminLayout>
        <div className="p-3 text-xl border shadow-sm">Vendor</div>
        <div className="my-2"></div> 


        <BottomNavigation value={navigation} onChange={handleNavigationChange}>
            <BottomNavigationAction label="Vendors" value="vendors" icon={<StoreIcon />} />
            <BottomNavigationAction label="Products" value="products" icon={<AppsIcon />} />
            <BottomNavigationAction label="Verification" value="verification" icon={<AssignmentTurnedInIcon />} />
        </BottomNavigation>
        
        {navigation == 'vendors'?<div>
            <table className="table table-hover border p-2 shadow-sm my-2 bg-white">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                </tr>
              </thead>
              <tbody>
                {props.vendors.map((el,key)=>(
                  <tr key={key}>
                    <td>{key+1}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.pincode}</td>
                  </tr> 
                ))}
              </tbody>
            </table>
        </div>:<></>}


        {navigation == 'products'?<div>
                  {selectedVendor}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <select className="form-select my-3" defaultValue={selectedVendor} onChange={e=>getProductsByVendorId(e.target.value)}>
                  <option value="">Select Vendor</option> 
                  {props.vendors.map((el,key)=>(
                    <option key={key} value={el._id}>{el.name}</option>
                  ))}
                </select>

              </div>
            </div>
          </div>


            <div className="grid grid-cols-6 gap-3">
              {products.map((el,key)=>(
                <div key={key} className="bg-white border shadow-sm">
                  <img src={"http://treevesto55.herokuapp.com/"+el.productImages[0]} alt=""/>
                  <div className="p-1">
                    <div>
                      <span className="text-sm"> {el.productName.length>18?el.productName.substr(0,18):el.productName} </span>
                      <span className="text-sm"> {el.productName.length>18?"...":""} </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            
            {products.length == 0?<div className="px-4">
              <div className="text-2xl"> No Products Available </div>
              <div className="text-secondary"> 
              Go to homepage  
              </div> 
            </div>:<div></div>}

        </div>:<div></div>}


    </AdminLayout> 
}


export const getStaticProps = async (context) => {

  const vendors = await fetch(`http://treevesto55.herokuapp.com/vendor`).then(d=>d.json())
 

  return {
    props: {
      vendors:vendors.result, 
    }
  };
}