import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {useForm} from 'react-hook-form'

export default function MaterialDialog(props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selected,setSelected] = React.useState(null)
  const [userId,setUserId] = React.useState()
  const {register, handleSubmit} = useForm();
  const [verify,setVerify] = React.useState(false);

  useEffect(()=>{
    setSelected(props.selected)
  },[props.selected])

  const handleClickOpen = () => {
    if(localStorage.getItem('user')){
      var user = JSON.parse(localStorage.getItem('user'))
      setUserId(user.userId)
      fetch(`https://api.treevesto.com:4000/orderedproduct/getreview/`+user.userId+`/`+props.id).then(d=>d.json()).then(json=>{
        if(json.result === 1){
          setOpen(true);
          setVerify(true)
        }else if(user?.userId){
          setOpen(true);
        }else{
          router.replace("/auth/login") 
        }
      }).catch(err=>console.log(err))

    }else{
      router.replace("/auth/login") 

    }
    
  };
  
  const handleClose = () => {
    setOpen(false);
  };
 
  const onSubmit = (data) => {
    var formData = new FormData();
    formData.append("user_id",userId)
    formData.append("product_id",props.id)
    formData.append("rating",selected)
    Object.keys(data).map((key,i)=>{
      if(data[key] != null && data[key] != ''){
          formData.append(key,data[key]) 
      }
    })

    fetch(`https://api.treevesto.com:4000/review/`,{
        method:"POST",
        body:formData
    }).then(d=>d.json()).then(json=>{
      handleClose();
      router.replace(router.asPath)
    }).catch(err=>console.log(err))

  }
 
  return (
    <div>
      <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
        {props.button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {verify?<>
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          
          <div className="flex items-center px-6">
            {selected >= 1?<StarIcon className="cursor-pointer text-success" onClick={e=>setSelected(1)} />:<StarBorderIcon className="cursor-pointer" onClick={e=>setSelected(1)} />}
            {selected >= 2?<StarIcon className="cursor-pointer text-success" onClick={e=>setSelected(2)} />:<StarBorderIcon className="cursor-pointer" onClick={e=>setSelected(2)} />}
            {selected >= 3?<StarIcon className="cursor-pointer text-success" onClick={e=>setSelected(3)} />:<StarBorderIcon className="cursor-pointer" onClick={e=>setSelected(3)} />}
            {selected >= 4?<StarIcon className="cursor-pointer text-success" onClick={e=>setSelected(4)} />:<StarBorderIcon className="cursor-pointer" onClick={e=>setSelected(4)} />}
            {selected >= 5?<StarIcon className="cursor-pointer text-success" onClick={e=>setSelected(5)} />:<StarBorderIcon className="cursor-pointer" onClick={e=>setSelected(5)} />}

          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
  
          <form onSubmit={handleSubmit(onSubmit)} className="px-6">

            <input type="file" name="reviewImages[]" multiple ref={register()} className="form-control my-2" />

            <input type="text" name="title" ref={register({required:true})} className="form-control my-2" placeholder="Enter the title" />

            <textarea name="desc" cols={30} rows={4} ref={register()}
            className="form-control my-2" placeholder="Write a short description on this product" />

            <DialogActions>
              <Button type="button" onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained" autoFocus>
                Submit  
              </Button>
            </DialogActions>

          </form>
        </>:<>
          <DialogTitle id="alert-dialog-title"> Haven't purchased this product </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sorry ! You are not allowed to review this product since you haven't bought it on Treevesto.
            </DialogContentText>
          </DialogContent>
        
        </>}

      </Dialog>
    </div>
  );
}
