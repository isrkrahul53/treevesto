import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';


// Accoridion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function AdminSidebar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [expanded, setExpanded] = React.useState(null);

  const router = useRouter();
  const path = router.asPath.split("/");
  const navs = ["dashboard","homepage","vendors","users","orders","category","coupons"] 

  const [admin,setAdmin] = React.useState(null);
  const [height,setHeight] = React.useState(null)
  const [expand,setExpand] = React.useState(navs.filter(e=>path.filter(a=>a===e).length > 0)[0] || "");

  useEffect(()=>{  
      setHeight(window.innerHeight)
      if(!localStorage.getItem('admin')){
          router.replace("/admin/auth") 
      }else{ 
          var admin = JSON.parse(localStorage.getItem('admin'))
          if(admin){
              setAdmin(admin)
          }
      }

  },[])

  const logout = () => {
      localStorage.removeItem('admin')
      router.replace('/admin/auth/')
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="p-3">
        <img src="/logo.png" className="w-full" alt="logo" />
      </div>
      <List>
          <Link href="/admin/"><ListItem button selected={expand === ""}>
              <ListItemIcon> <DashboardIcon />  </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
          </ListItem></Link>
          <Link href="/admin/homepage"><ListItem button selected={expand === "homepage"}>
              <ListItemIcon> <DesktopWindowsIcon />  </ListItemIcon>
              <ListItemText primary={"Homepage"} />
          </ListItem></Link>
          <Link href="/admin/vendors"><ListItem button selected={expand === "vendors"}>
              <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
              <ListItemText primary={"Vendors"} />
          </ListItem></Link>
          <Link href="/admin/users"><ListItem button selected={expand === "users"}>
              <ListItemIcon> <PersonIcon />  </ListItemIcon>
              <ListItemText primary={"Users"} />
          </ListItem></Link>
          <Link href="/admin/orders"><ListItem button selected={expand === "orders"}>
              <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
              <ListItemText primary={"Orders"} />
          </ListItem></Link>
          <Link href="/admin/category"><ListItem button selected={expand === "category"}>
              <ListItemIcon> <CategoryIcon />  </ListItemIcon>
              <ListItemText primary={"Category"} />
          </ListItem></Link>
          <Link href="/admin/coupons"><ListItem button selected={expand === "coupons"}>
              <ListItemIcon> <StorefrontIcon />  </ListItemIcon>
              <ListItemText primary={"Coupons"} />
          </ListItem></Link>
      </List> 

    </div>
  );

  return (
    <div>
        <React.Fragment>
            <MenuIcon onClick={toggleDrawer('left', true)} />
            {/* <Button onClick={toggleDrawer('left', true)}>
            </Button> */}
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
