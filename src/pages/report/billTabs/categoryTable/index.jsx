import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_BILLS_BY_CATEGORY} from "../../../../queries/billQueries";
import LoadingScreen from "../../../../components/Backdrop";
import AlertDialogSlide from "../../../../components/Alertbox";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Delete } from "@mui/icons-material";

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { DELETE_BILL, UPDATE_BILL } from "../../../../mutations/billMutation";

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

const BillCategoryReport = () => {

   const defaultFiscalYear = new Date().getFullYear().toString();

   const [category, setCategory] = useState("accomodation");
   const [fiscalYear, setFiscalYear] = useState(defaultFiscalYear);

   const {loading, data} = useQuery(GET_BILLS_BY_CATEGORY, {
      variables: {
         category: category,
         fiscalYear: fiscalYear,
      }
   }, [category, fiscalYear]);
   
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
         field: "particular",
         headerName: "Items",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
         editable: true,
      },

      {
         field: "vendor",
         headerName: "Merchant",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "quantity",
         headerName: "Quantity",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "rate",
         headerName: "Rate ( Rs )",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "total",
         headerName: "Total ( Rs )",
         flex: 3,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "remarks",
         headerName: "Remarks",
         flex: 5,
         align: "center",
         headerAlign: "center",
         editable: true,
      },

      {
         field: "edit",
         headerName: "Edit",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <EditAction {...{params}} category={category} fiscalYear={fiscalYear}/>
      },
      
      {
         field: "del",
         headerName: "Del",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id} category={category} fiscalYear={fiscalYear}/>
      }   
   ];


   if (loading) return <LoadingScreen/>;

   return(
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Box
            display="grid"
            rowGap="10px"
            columnGap="10px"
            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
         >

         <Typography
            variant="h2"
            color={colors.grey[200]}
            fontWeight="bold"
            marginBottom={1}
            sx={{
               gridColumn: "span 12",
               m: "0 0 10px 0" 
            }}
            >
               Bill Categories
         </Typography>
         <FormControl
            sx={{
               "& .MuiOutlinedInput-root": { 
                  "&.Mui-focused fieldset": {
                     borderColor: colors.grey[100]
                  }
               },
               gridColumn:{xs: "span 6", lg: "span 3"} 
            }}
            
            >
            <InputLabel>Category</InputLabel>
            <Select
               value={category}
               label="Category"
               onChange={e => setCategory(e.target.value)}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
               
            >
               <MenuItem value={"accomodation"}>Accomodation</MenuItem>
               <MenuItem value={"construction"}>Construction</MenuItem>
               <MenuItem value={"electricity"}>Electricity</MenuItem>
               <MenuItem value={"medikit"}>Medikit</MenuItem>
               <MenuItem value={"watersupply"}>Water Supply</MenuItem>
               <MenuItem value={"rent"}>Rent</MenuItem>
               <MenuItem value={"stationery"}>Stationery</MenuItem>
               <MenuItem value={"asset"}>Asset</MenuItem>
               <MenuItem value={"communication"}>Communication</MenuItem>
               <MenuItem value={"transport"}>Transport</MenuItem>
               <MenuItem value={"partycash"}>Party's Cash</MenuItem>
            </Select>
         </FormControl>

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
            <DataGrid 

               rows={data.getBillsByCategory} 
               getRowId={row => row.id} 
               columns={columns}
               density="compact"
               components={{
                  Toolbar: CustomToolbar,
               }}
            />
         </Box>
      </Box> 
   </Box>   
   )
}

const DeleteAction = (props) => {
   const { id, category, fiscalYear } = props;

   const [deleteBill] = useMutation(DELETE_BILL, {
      
      refetchQueries: [{ query: GET_BILLS_BY_CATEGORY, variables: { category, fiscalYear} }],
      variables: { billId: id.toString() },
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
            action={deleteBill}
            open={open}
            handleClose={handleClose}
            dialogTitle="Deleting the following record"
         />
      </>
   );
};


const EditAction = (props) => {

   const { params, category, fiscalYear} = props;
   const { id } = params.row;
   const billInput = {
      date: params.row.date,
      panNumber: params.row.panNumber,
      vendor: params.row.vendor,
      particular: params.row.particular,
      quantity: parseFloat(params.row.quantity) || 0,
      rate: parseFloat(params.row.rate) || 0,
      total: parseFloat(params.row.quantity * params.row.rate),
      billsType: params.row.billsType,
      remarks: params.row.remarks,
   }

   const [updateBill] = useMutation(UPDATE_BILL, {
      refetchQueries: [{ query: GET_BILLS_BY_CATEGORY, variables: { category: category, fiscalYear: fiscalYear} }],
      variables: { billId: id.toString(), billInput: billInput },
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
            action={updateBill}
            open={open}
            handleClose={handleClose}
            dialogTitle="Updating the following record"
         />
      </>
   );
};

export default BillCategoryReport;
