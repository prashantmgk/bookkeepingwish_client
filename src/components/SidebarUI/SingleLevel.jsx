import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useTheme } from '@mui/material';
import { tokens } from '../../theme';

import {useLocation, useNavigate } from 'react-router-dom';

const SingleLevel = ({ item, handleDrawerToggle }) => {
   
   const theme = useTheme();
   const navigate = useNavigate()
   const location = useLocation()
   const colors = tokens(theme.palette.mode);

   const classes = {
      active: {
         background: colors.blueAccent[800],
         color: colors.primary[400],
      },
   };
   
   return (
      <>
         <ListItem
         >
            <ListItemButton 
               onClick={() => {
                  handleDrawerToggle();
                  navigate(item.to); 
               }}
               style={{
                  color: colors.grey[100],
                  margin: "40px 20px 0px 50px !important",
               }}
               sx={location.pathname === item.to ? classes.active : null}
            >
               <ListItemIcon>{item.icon}</ListItemIcon>
               <ListItemText primary={item.title} sx={{marginLeft:"-5px"}} />
            </ListItemButton>
         </ListItem>
      </>
   );
};

export default SingleLevel;
