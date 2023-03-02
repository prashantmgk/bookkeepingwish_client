import { Box, IconButton, TextField, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import LoadingScreen from "../../../../components/Backdrop";
import {GET_VISIT_PASSES} from "../../../../queries/incomeQueries";
import { useMutation, useQuery } from "@apollo/client";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { DELETE_VISIT_PASS, UPDATE_VISIT_PASS } from "../../../../mutations/visitPassMutation";
import { Delete } from "@mui/icons-material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
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

const VisitPassReport = () => {

   const defaultFiscalYear = new Date().getFullYear().toString();
   const [fiscalYear, setFiscalYear] = useState(defaultFiscalYear);

   const {loading, data} = useQuery(GET_VISIT_PASSES, {
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
         editable: true,
      },
      {
         field: "name",
         headerName: "Name",
         flex: 3,
         editable: true,
      },
      {
         field: "category",
         headerName: "Category",
         flex: 2,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
              {/* {(`${(params.row.category).toUpperCase()} `)} */}
              {
                  params.row.category === "threedays" ? "Three Days" :
                  params.row.category === "sevendays" ? "Seven Days" :
                  params.row.category === "fifteendays" ? "Fifteen Days" : params.row.category
              }
            </Typography>
         ),
      },
      {
         field: "charge",
         headerName: "Package Charge",
         type: "number",
         flex: 2,
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "expiryDate",
         headerName: "Expire Date",
         flex: 2,
         type: "date",
         align: "center",
         headerAlign: "center",
      },
      
      {
         field: "edit",
         headerName: "Edit",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <EditAction {...{params}} fiscalYear={fiscalYear}/>
      },
      {
         field: "del",
         headerName: "Del",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id}  fiscalYear={fiscalYear} />
      } 
   ]

   if(loading) return <LoadingScreen />

   return (
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Visit Pass Report" subtitle="Records for all the members with visit passes." />
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
                     rows={data.visitPasses} 
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

   const [deleteVisitPass] = useMutation(DELETE_VISIT_PASS, {
      refetchQueries: [ { query: GET_VISIT_PASSES, variables: { fiscalYear: fiscalYear } } ],
      variables: { visitPassId: id.toString() },
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
            action ={deleteVisitPass}
            open={open}
            handleClose={handleClose}
            dialogTitle="Deleting the following record"
         />
      </>
   );
};

const EditAction = (props) => {

   const { params, fiscalYear } = props;
   const { id } = params.row;

   const visitPassInput = {
      name: params.row.name,
      category: params.row.category,
      remarks: params.row.remarks,
      date: params.row.date,
      charge: params.row.charge || 0,
      expiryDate: params.row.expiryDate,
   }

   const [updateVisitPass] = useMutation(UPDATE_VISIT_PASS, {
      refetchQueries: [ { query: GET_VISIT_PASSES, variables: { fiscalYear: fiscalYear } } ],
      variables: { visitPassId: id.toString(), visitPassInput: visitPassInput },
   });
    
   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleEdit = () => {
      setOpen(true);
   };

   return (
      <>
         <IconButton onClick={handleEdit}>
            <SaveOutlinedIcon />
         </IconButton>
         <AlertDialogSlide 
            action={updateVisitPass}
            open={open}
            handleClose={handleClose}
            dialogTitle="Updating the following record"
         />
      </>
   );
};

export default VisitPassReport;
