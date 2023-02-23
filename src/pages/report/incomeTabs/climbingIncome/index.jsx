import { Box, IconButton, TextField } from "@mui/material";
import Header from "../../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import LoadingScreen from "../../../../components/Backdrop";
import {GET_CUSTOMER_ENTRIES} from "../../../../queries/incomeQueries";
import { useMutation, useQuery } from "@apollo/client";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { DELETE_CUSTOMER_ENTRY } from "../../../../mutations/customerEntry";
import { Delete } from "@mui/icons-material";
import AlertDialogSlide from "../../../../components/Alertbox";

function CustomToolbar() {
   return (
      <GridToolbarContainer 
         sx={{
            display: "flex",
            justifyContent: "flex-end",
         }}
      >
         <GridToolbarColumnsButton />
         <GridToolbarDensitySelector />
         <GridToolbarFilterButton />
         <GridToolbarExport />
      </GridToolbarContainer>
   );
}

const ClimbingIncomeReport = () => {
   const defaultFiscalYear = new Date().getFullYear().toString();
   const [fiscalYear, setFiscalYear] = useState(defaultFiscalYear);

   const {loading, data} = useQuery(GET_CUSTOMER_ENTRIES, {
      variables: {
         fiscalYear: fiscalYear,
      }

   }, [fiscalYear]);

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const columns = [
      {
         field: "date",
         headerName: "Date",
         flex: 2,
         type: "date",
         align: "center",
         headerAlign: "center",
      },
      {
         field: "name",
         headerName: "Name",
         flex: 3,
      },
      {
         field: "wallCharge",
         headerName: "Wall Charge",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "shoesRent",
         headerName: "Shoes Rent",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "belay",
         headerName: "Belay",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "harnessRent",
         headerName: "Harness Rent",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "chalk",
         headerName: "Chalk",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "total",
         headerName: "Total",
         flex: 2,
         align: "center",
         headerAlign: "center",
      },

      {
         field: "action",
         headerName: "",
         disableExport: true,
         width: 80,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id} fiscalYear={fiscalYear} />
      }  
   ]

   if(loading) return <LoadingScreen />

   return (
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Daily Entry Report" subtitle="Record of all the data of customers that do not have passes." />
         <Box
            display="grid"
            rowGap="10px"
            columnGap="10px"
            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
         >  
            <Box
               sx={{
                  gridColumn: {xs:"span 3" , lg: "span 2"},
                  display: "flex"
               }}
            >
               <LocalizationProvider dateAdapter={AdapterDayjs}
                  sx={{
                     width: "100%",
                  }}
               >
                  <DatePicker
                     views={['year']}
                     label="Fiscal Year"
                     value={fiscalYear}
                     onChange={(newDate) => {
                        setFiscalYear((newDate.$y).toString());
                     }}

                     InputLabelProps={{
                        style: { color: colors.grey[100] },
                     }}
                     
                     renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
               </LocalizationProvider>

            </Box>

         
            <Box
               m="10px 0 0 0"
               gridColumn="span 12"
               height="57vh"
               sx={{
                  "& .MuiDataGrid-root": {
                     border: "none",
                     fontSize: {xs: "8px", lg: "14px"},
                  },
                  "& .MuiDataGrid-cell": {
                     borderBottom: "none",
                  },
                  "& .name-column--cell": {
                     color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                     backgroundColor: colors.blueAccent[700],
                     borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                     backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                     borderTop: "none",
                     backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                     color: `${colors.greenAccent[200]} !important`,
                  },
                  '& .MuiDataGrid-columnSeparator': {
                     color: colors.grey[200],
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                     background: '#e0e0e0',
                     borderRadius: "2px 2px 0 0",
                  },
               }}
               >
               {
                  data ?

                  <DataGrid 
                     rows={data.customerEntries} 
                     getRowId={row => row.id} 
                     columns={columns}
                     density="compact"
                     components={{
                        Toolbar: CustomToolbar,
                     }}
                  />
                  :
                  null
               }
            </Box>
         </Box>
      </Box>
   )
}

const DeleteAction = (props) => {
   const { id, fiscalYear } = props;

   const [deleteCustomerEntry] = useMutation(DELETE_CUSTOMER_ENTRY, {
      refetchQueries : [{ query: GET_CUSTOMER_ENTRIES, variables: { fiscalYear } }],
      variables: { customerEntryId: id.toString() },
   });

   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleDelete = () => {
      setOpen(true);
   }; 

   return (
      <>
         <IconButton onClick={handleDelete}>
            <Delete />
         </IconButton>
         <AlertDialogSlide 
            deleteRecord ={deleteCustomerEntry}
            open={open}
            handleClose={handleClose}
         />
      </>
   );
};


export default ClimbingIncomeReport;
