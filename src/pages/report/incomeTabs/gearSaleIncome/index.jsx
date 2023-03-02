import { Box, IconButton, TextField} from "@mui/material";
import { DataGrid,  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {GET_GEAR_SALES} from "../../../../queries/incomeQueries";
import LoadingScreen from "../../../../components/Backdrop";
import Header from "../../../../components/Header";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { DELETE_GEAR_SALES_ENTRY, UPDATE_GEAR_SALES_ENTRY } from "../../../../mutations/gearSalesMutation";
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

const GearSalesIncomeReport = () => {
   const defaultFiscalYear = new Date().getFullYear().toString();
   const [fiscalYear, setFiscalYear] = useState(defaultFiscalYear);

   const {loading, data} = useQuery(GET_GEAR_SALES, {
      variables: {
         fiscalYear: fiscalYear,
      }

   }, [fiscalYear]);

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   //columns
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
         field: "item",
         headerName: "Items",
         flex: 4,
         editable: true,
         // cellClassName: "name-column--cell",
      },
      {
         field: "quantity",
         headerName: "Quantity",
         flex: 2,
         editable: true,
         // cellClassName: "name-column--cell",
         align: "center",
         type: "number",
         headerAlign: "center",
      },
      {
         field: "rate",
         headerName: "Rate",
         flex: 2,
         align: "center",
         headerAlign: "center",
         type: "number",
         editable: true,
      },
      {
         field: "amount",
         headerName: "Total Amount",
         flex: 2,
         type: "number",
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
         renderCell: (params) => <DeleteAction id={params.row.id} fiscalYear={fiscalYear} />
      }    
   ];

   
   if(loading) return <LoadingScreen />

   return (
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Gear Sales Report" subtitle="Records of all the gear sold" />
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
                     rows={data.gearSales} 
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
   const { id,  fiscalYear } = props;

   const [deleteGearSales] = useMutation(DELETE_GEAR_SALES_ENTRY, {
      refetchQueries: [{query: GET_GEAR_SALES, variables: { fiscalYear: fiscalYear }}],
      variables: { gearSalesId: id.toString() },
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
            action={deleteGearSales}
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
   const gearSalesInput = {
      item: params.row.item,
      quantity: params.row.quantity  || 0,
      rate: params.row.rate || 0,
      amount: (params.row.quantity * params.row.rate),
      remarks: params.row.remarks,
      date: params.row.date,
   }


   const [updateGearSales] = useMutation(UPDATE_GEAR_SALES_ENTRY, {
      refetchQueries: [{query: GET_GEAR_SALES, variables: { fiscalYear: fiscalYear }}],
      variables: { gearSalesId: id.toString(), gearSalesInput: gearSalesInput },
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
            action={updateGearSales}
            open={open}
            handleClose={handleClose}
            dialogTitle="Updating the following record"
         />
      </>
   );
};

export default GearSalesIncomeReport;
