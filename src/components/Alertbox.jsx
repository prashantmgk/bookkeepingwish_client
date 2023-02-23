import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({deleteRecord, open, handleClose}) {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
      <div>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
               '& .MuiDialog-root .MuiDialog-paper': {
                  backgroundColor: colors.grey[900],
                  color: colors.grey[100],
               },
            }}
         >
         <DialogTitle>{"Deleting the following record"}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               Are you sure?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button sx={{
               color: colors.grey[100],
               '&:hover': {
                  color: colors.grey[200],
                  background: colors.greenAccent[500],
               },
               background: colors.greenAccent[600],

            }} onClick={handleClose}>No</Button>
            <Button sx={{
               color: colors.grey[100],
               '&:hover': {
                  color: colors.grey[200],
                  background: colors.redAccent[500],
               },
               background: colors.redAccent[600],
            }}
            onClick={deleteRecord}>Yes</Button>
         </DialogActions>
         </Dialog>
      </div>
   );
}
