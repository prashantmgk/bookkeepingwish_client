import React, {useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import {tokens, ColorModeContext} from '../../theme';
import { useTheme } from '@mui/material';

import {calendar, dashboard, menu, report} from '../../components/SidebarUI/Menu';
import MenuItem from '../../components/SidebarUI/MenuItem';
import { Outlet } from 'react-router-dom';
import LogoutButton from '../../components/FormsUI/LogoutButton';

const drawerWidth = 270;

const Layout = ({window, children}) => {
   const [mobileOpen, setMobileOpen] = useState(false);

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const drawer = (
      <Box
      >
         {/* Drawer App bar */}
         <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
            p="20px"
         >
            <Typography variant="h4" color={colors.grey[100]}>
               ADMINS
            </Typography>
         </Box>

         <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
               <img
               alt="profile-user"
               width="100px"
               height="100px"
               src={`../../assets/user.png`}
               style={{ cursor: "pointer", borderRadius: "50%" }}
               />
            </Box>
            <Box textAlign="center">
               <Typography
               variant="h2"
               color={colors.grey[100]}
               fontWeight="bold"
               sx={{ m: "10px 0 5px 0" }}
               >
               WISH
               </Typography>
               <Typography variant="h5" color={colors.greenAccent[500]}>
               Book keeping / Auditing
               </Typography>
            </Box>
         </Box>
         {/* End Drawer App bar */}
          
          {/* Navigation Buttons */}
         <Box 
         >
            <List 
            >
               {
                  dashboard.map((item, key) => <MenuItem key={key} item={item} handleDrawerToggle={handleDrawerToggle}/>)
               }

               <Typography
                  variant="h6"
                  color={colors.grey[400]}
                  sx={{ m: "20px", mt: "0px"}}
               >
                  Data Entry
               </Typography>
              {
                  menu.map((item, key) => <MenuItem key={key} item={item} handleDrawerToggle={handleDrawerToggle}/>)
              }

               <Typography
                  variant="h6"
                  color={colors.grey[400]}
                  sx={{ m: "20px"}}
               >
                  Table Report
               </Typography>
               {
                  report.map((item, key) => <MenuItem key={key} item={item} handleDrawerToggle={handleDrawerToggle}/>)
               }


               <Typography
                  variant="h6"
                  color={colors.grey[400]}
                  sx={{ m: "20px"}}
               >
                  Calendar
               </Typography>
               {
                  calendar.map((item, key) => <MenuItem key={key} item={item} handleDrawerToggle={handleDrawerToggle}/>)
               }
            </List>
         </Box>
      </Box>
   );

   const container = window !== undefined ? () => window().document.body : undefined;

   return (
      <Box 
         sx={{ display: 'flex',
      }}
      >
         <CssBaseline />
         <AppBar
            position="fixed"
            elevation={1}
            sx={{
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               ml: { sm: `${drawerWidth}px` },
            }}
            >
         <Toolbar
            
            sx={{
               background: colors.grey[900],
               display:"flex",
               justifyContent:"space-between"
            }}
         >
            <IconButton
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={ handleDrawerToggle}
               sx={{ mr: 2, display: { sm: 'none'  }}}
            >
               <MenuIcon />
            </IconButton>
            <Typography variant="h5" 
               sx={{
                  color: colors.grey[100],
                  display: { xs: 'none', sm: 'block' },
               }}
            >
               West Indoor Sport Hub Pvt. Ltd.
            </Typography>
            
            <Box display="flex">
               <LogoutButton/>
               <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                     <DarkModeOutlinedIcon />
                  ) : (
                     <LightModeOutlinedIcon />
                  )}
               </IconButton>
            </Box>
         </Toolbar>
         </AppBar>
         <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } , background: colors.primary[400]}}
         >
         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
         <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
               display: { xs: 'block', sm: 'none' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: colors.primary[400] },
            }}
         >
            {drawer}
         </Drawer>
         <Drawer
            variant="permanent"
            sx={{
               display: { xs: 'none', sm: 'block' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: colors.primary[400]},
            }}
            open
         >
            {drawer}
         </Drawer>
         </Box>
         <Box
            component="main"
            sx={{ flexGrow: 1, flexShrink: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
         >
            <Toolbar />
            <Outlet/>
         </Box>
      </Box>
   );
}

export default Layout;
