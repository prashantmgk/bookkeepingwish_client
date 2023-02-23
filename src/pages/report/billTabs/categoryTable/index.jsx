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
import { DELETE_BILL } from "../../../../mutations/billMutation";

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
      },
      {
         field: "particular",
         headerName: "Items",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "vendor",
         headerName: "Merchant",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
      },
      {
         field: "quantity",
         headerName: "Quantity",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },
      {
         field: "rate",
         headerName: "Rate ( Rs )",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
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
      },
      
      {
         field: "action",
         headerName: "",
         disableExport: true,
         width: 80,
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
                  color: colors.grey[300],
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
            deleteRecord ={deleteBill}
            open={open}
            handleClose={handleClose}
         />
      </>
   );
};

export default BillCategoryReport;
