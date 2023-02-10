import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen() {

   return (
      <Box 
         sx={{
            width: '100%',
            height: '100%',
         }}
      >
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </Box>
   );
}