import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// Accoridion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Link from 'next/link';
import Person from '@material-ui/icons/Person';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Sidebar(props) {
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
      </List> */}
    <img src="/logo.png" className="w-100 my-3" />
    {props.data.filter(e=>e.parentCatId === "0").map((el,key)=>(
    <Accordion  expanded={expanded === ('panel'+key+'')} onChange={handleChange('panel'+key)} key={key}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography component={"span"} className="text-uppercase" variant={'body2'}> {el.catName} </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography component={"span"} variant={'body2'}> 
            <List>
                {props.data.filter(e=>e.parentCatId === el._id).map((text, index) => (
                  <ListItem button key={index} onClick={toggleDrawer('left', false)}>
                      {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                      <Link href={"/"+text._id}><ListItemText className="text-uppercase" primary={text.catName} /></Link>
                  </ListItem>
                ))}
            </List>
        </Typography>
        </AccordionDetails>
    </Accordion>
    ))}
    <Divider />
    <List>
        {props.user ? <>
          <ListItem button>
              <ListItemIcon> <Person /> </ListItemIcon>
              <Link href={"/account/overview"}><ListItemText primary={"Account"} /></Link>
          </ListItem>
          <ListItem button>
              <ListItemIcon> <MeetingRoomIcon /> </ListItemIcon>
              <ListItemText onClick={props.logout} primary={"Logout"} />        
          </ListItem>
        </>:<>
          <ListItem button>
              <ListItemIcon> <Person /> </ListItemIcon>
              <Link href={"/auth/login"}><ListItemText primary={"Login / SignUp"} /></Link>
          </ListItem>
        </>}
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
