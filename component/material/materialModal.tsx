import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    width: '80%',
    height:'520px',
    top:'10%',
    left:'10%',
    right:'10%',
    overflow:"auto",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MaterialModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(props.close){
      handleClose();
    }
  },[props.close])

  const body = ( 
    <div className={classes.paper}> 
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-2xl"> {props.name} </h3> 
        <div className="cursor-pointer h2" onClick={handleClose}>&times;</div>
      </div>
      <hr/>
      {props.content}
      
      {/* <div className="p-2" style={{position:"absolute",bottom:0,left:0,width:"100%"}}>
          <div className="d-flex justify-content-end">
              <div className="btn-group float-right"> 
                  <button className="btn btn-primary" onClick={()=>{props.submit();handleClose()}}>Save</button>
              </div>
          </div>
      </div> */}
      
    {/* <MaterialModal /> */}
    </div> 
  );

  return (
    <div> 
      <div onClick={handleOpen}>
          {props.label}
      </div>
      {/* <Button variant="text" color="primary">
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        
      >
        {body}
      </Modal>
    </div>
  );
}
