import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "./MenuItem";
import {useTheme } from '@mui/material';
import { tokens } from '../../theme';

const MultiLevel = ({ item, handleDrawerToggle }) => {
   const { items: children } = item;
   const [open, setOpen] = useState(false);

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
 
   const handleClick = () => {
     setOpen(!open);
   };
 
   return (
      <Box
         sx={{
            cursor: "pointer",
         }}
      >
         <ListItem
            onClick={()=>handleClick()}
            style={{
               paddingLeft: "32px",
            }}
         >
            <ListItemIcon
               style={{
                  color: open ? colors.primary[400] : colors.grey[100],
               }}
            >
               {item.icon}</ListItemIcon>
            <ListItemText 
               primary={item.title} 
               sx={{
                  color: open ? colors.primary[300] : colors.grey[100],
                  marginLeft:"-5px",
               }} />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}

         </ListItem>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {children.map((child, key) => (
               <MenuItem key={key} item={child} handleDrawerToggle={handleDrawerToggle} />
            ))}
            </List>
         </Collapse>
      </Box>
   );
};
 
export default MultiLevel;
