import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";

import ClimbingIncome from "../climbingIncome";
import VisitPassIncome from "../visitPassIncome";
import MembershipIncome from "../membershipIncome";

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
         <Box sx={{ p: 1 }}>
            <Typography  component={'span'} >{children}</Typography>
         </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}
export default function ClimbingIncomeReportTab() {
   const [value, setValue] = React.useState(0);
   
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ width: '100%' }} textcolor={colors.grey[200]}>
         <Box 
            sx={{ 
               borderBottom: 1, 
               borderColor: 'divider' ,
               '& .css-1grhalw-MuiButtonBase-root-MuiTab-root.Mui-selected' : {
                  color: colors.grey[200],
               },
               '& .css-o8jfh7-MuiTabs-indicator': {
                  backgroundColor: "#ffffff"
               }
            }}
         >
         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Daily Entry" {...a11yProps(0)}/>
            <Tab label="Visit Pass" {...a11yProps(1)}/>
            <Tab label="Membership" {...a11yProps(2)}/>
         </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <ClimbingIncome />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <VisitPassIncome />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <MembershipIncome />
         </TabPanel>
      </Box>
   );
}
