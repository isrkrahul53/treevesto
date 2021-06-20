import React, { useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'; 
import Divider from '@material-ui/core/Divider'; 
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Layout from '../../component/common/layout' 
 

const useStyles = makeStyles({
  list: {
    maxHeight: 520,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SearchProducts(props) {

  
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState("");
    const closeAlert = () => { 
        setError("")
        setSuccess("") 
    }
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [expanded, setExpanded] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [search,setSearch] = React.useState('')
  const [products,setProducts] = React.useState([])
  const [isLoading,setLoading] = React.useState(false)
  
  useEffect(()=>{
    if(search.trim().length > 0){
      setLoading(true)
      fetch(`https://api.treevesto.com:4000/product`).then(d=>d.json()).then(json=>{
        var pro = json.result.filter((e,k)=>e.productName.toLowerCase().search(search.toLocaleLowerCase()) > 0)
        setProducts(pro)
        setLoading(false)
      }) 
    }
  },[search])

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    > 
    <div className="container">
      <div className="position-sticky top-0 bg-white w-full z-50 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-secondary text-md md:text-2xl py-2">WHAT ARE YOU LOOKING FOR?</h3>
          <div className="cursor-pointer text-4xl" onClick={toggleDrawer('top', false)}>&times;</div>
        </div>
        <div className="flex items-center justify-between">
          <input type="text" name="search" id="search" autoFocus onChange={e=>setSearch(e.target.value)}
          className="w-full py-3 border-b-2 outline-none text-md md:text-2xl" placeholder="Search Products" />
          <img src="/assets/icons/search.png" className="mx-1" width="20px" alt="search"/>
        </div>
      </div>

      {/* <Divider /> */}

      {isLoading?<>
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
        </div>
      </>:<>
        {products?.length > 0 ?<>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-content-center my-2 gap-4">
            {products?.map((el,key)=>(
              <Link key={key} href={"/product/"+el._id}><div className="cursor-pointer">
                <img src={"https://api.treevesto.com:4000/"+el.productImages[0]}  alt={el.productName} />
                <div className="p-2">
                  <div>
                    <div className="text-sm text-secondary"> {el?.productType} </div>
                    <div className="text-sm font-normal hidden md:block">
                        {el?.productName.length > 18 ? el?.productName.substring(0,18):el?.productName}
                        {el?.productName.length > 18 ? " ...":""}
                    </div>
                    <div className="text-sm font-normal md:hidden">
                        {el?.productName.length > 42 ? el?.productName.substring(0,42):el?.productName}
                        {el?.productName.length > 42 ? " ...":""}
                    </div>
                    <div className="text-lg font-normal"> <s className="text-sm text-secondary">Rs. {el?.regularPrice} </s> Rs. {el?.sellingPrice}</div>
                </div>
                </div>
              </div></Link>
            ))}
          </div>
        </>:<> 
          {/* <div className="p-2">
            <div className="text-xl"> No Products found for '  ' </div>
          </div>    */}
        </>}
      </>}

    </div>
    
    </div>
  );

  return (
    <div>
        <Layout error={error} success={success}>
            <React.Fragment>
                {/* <img src="/assets/icons/search.png" onClick={toggleDrawer('top', true)} className="mx-1 md:hidden" width="20px" alt="search"/> */}
                {/* <input type="text" className="form-control mr-2 hidden md:block" onChange={toggleDrawer('top', true)} placeholder={"Search products ...."} /> */}
    
                {/* <Button onClick={toggleDrawer('top', true)}>
                </Button> */}
                {list('top')}
                {/* <SwipeableDrawer
                    anchor={'top'}
                    open={state['top']}
                    onClose={toggleDrawer('top', false)}
                    onOpen={toggleDrawer('top', true)}
                >
            </SwipeableDrawer> */}
            </React.Fragment>
        </Layout>
    </div>
  );
}

 