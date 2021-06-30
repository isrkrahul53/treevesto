import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'; 
import MobileFilterPage from '../pages/mobileFilterPage';
import SortByPage from '../pages/sortByPage';
import FilterListIcon from '@material-ui/icons/FilterList';
import SwapVertIcon from '@material-ui/icons/SwapVert';
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
    <div className="">
      <MobileFilterPage values={props.values} change={props.change} min={props.min} max={props.max} reset={props.clearAll}
      chips={props.chips}
      colourList={props.colourList}
      sizeList={props.sizeList}
       />
 
    </div>
    

    </div>
  );

  const sortByList = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    > 
    <div className="p-4">
      <SortByPage values={props.values} change={props.change}/>

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
            <div className="md:hidden fixed left-0 bottom-0 m-0 w-full z-50 btn-group border-t-2 shadow-sm">
              <button onClick={toggleDrawer('top', true)} className="w-full p-2 px-4 text-xl rounded shadow-sm bg-white font-medium border ml-auto"> <SwapVertIcon /> Sort</button>
              <button onClick={toggleDrawer('bottom', true)} className="w-full p-2 px-4 text-xl rounded shadow-sm bg-white font-medium border ml-auto"> <FilterListIcon /> Filter</button>
            </div>

            <SwipeableDrawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >
              {list('bottom')}
            </SwipeableDrawer>

            <SwipeableDrawer
                anchor={'top'}
                open={state['top']}
                onClose={toggleDrawer('top', false)}
                onOpen={toggleDrawer('top', true)}
            >
              {sortByList('top')}
            </SwipeableDrawer>

        </React.Fragment>
    </div>
  );
}
