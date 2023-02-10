import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar({errorOccured}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    errorOccured = false;
  };

  return (
      <Snackbar open={errorOccured} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to get the data!
        </Alert>
      </Snackbar>
  );
}