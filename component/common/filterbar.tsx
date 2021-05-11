import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'; 
import FilterPage from '../pages/filterPage';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Filterbar(props) {
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
    <div className="py-4">
      <FilterPage values={props.values} change={props.change} />

    </div>
    

    </div>
  );

  return (
    <div>
        <React.Fragment>
              {/* <MenuIcon onClick={toggleDrawer('bottom', true)} /> */}
            {/* <Button onClick={toggleDrawer('bottom', true)}>
              Filter
            </Button> */}
            <button onClick={toggleDrawer('bottom', true)} className="md:hidden p-2 mx-1 px-4 text-xl rounded shadow-sm bg-gray-800 text-white ml-auto">Filter</button>
            <SwipeableDrawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >
            {list('bottom')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
