import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';

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
    height:'480px',
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

export default function MaterialModalBackup(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [title,setTitle] = React.useState("")
  const [grid,setGrid] = React.useState(0)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = ( 
    <div className={classes.paper}> 
        <h3 className="h3"> Add a new Grid Section </h3>
        <hr/>
        <div className="container my-8">
            <TextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            onChange={e=>setTitle(e.target.value)}
            /> 

        </div>

        <h6 className="h6 my-2">Select Grid View </h6> 
        <div className="grid grid-cols-4 gap-4">
            
            <div onClick={()=>setGrid(0)} className={grid == 0?"grid grid-cols-2 gap-2 border p-3 cursor-pointer border-primary border-2":"grid grid-cols-2 gap-2 border p-3 cursor-pointer"}>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
            </div> 
            <div onClick={()=>setGrid(1)} className={grid == 1?"grid grid-cols-4 gap-1 border p-3 cursor-pointer border-primary border-2":"grid grid-cols-4 gap-1 border p-3 cursor-pointer"}>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
            </div> 
            <div onClick={()=>setGrid(2)} className={grid == 2?"grid grid-cols-6 gap-1 border p-3 cursor-pointer border-primary border-2":"grid grid-cols-6 gap-1 border p-3 cursor-pointer"}>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
                <div className="border bg-light shadow-sm w-full h-10"></div>
            </div> 

        </div>



        <div className="absolute bottom-0 right-0 p-2">
            <Button variant="contained" onClick={()=>{handleClose();props.save({title:title,grid:grid})}} color="primary">
              Save
            </Button>
        </div>

      
    {/* <MaterialModal /> */}
    </div> 
  );

  return (
    <div> 
      <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Grid
      </Button>
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
