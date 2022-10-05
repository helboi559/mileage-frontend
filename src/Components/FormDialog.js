// import {} as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableCell from '@mui/material/TableCell';
import { useDrives } from '../Hooks/Drives';
export default function FormDialog({fetchDriveAndShow,originEdit,setOriginEdit}) {
  const [open, setOpen] = useState(false);
  
  const {singleDrive} =useDrives()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("singleDrive",singleDrive)
  return (
    <>
    <TableCell>
      <Button variant="contained" onClick={()=> {
        handleClickOpen()
        fetchDriveAndShow()
      }}>
        Edit
      </Button>
      <Button variant="contained" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          {/* <div>{singleDrive.date}</div> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            value={originEdit}
            onChange={(e)=> {
              setOriginEdit(e.target.value)
              // console.log(originEdit)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </TableCell>
    </>
  );
}