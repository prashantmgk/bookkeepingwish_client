import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid,  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {useQuery} from "@apollo/client";
import {GET_BILLS_BY_TYPE} from "../../../../queries/billQueries";
import LoadingScreen from "../../../../components/Backdrop";

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

const BillTypeReport = () => {

   const [billType, setBillType] = useState("vat");
   const {loading, data} = useQuery(GET_BILLS_BY_TYPE, {
      variables: {billsType: billType}

   }, [billType]);
   
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
         field: "category",
         headerName: "Category",
         flex: 2,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
              {(params.row.category).toUpperCase()}
            </Typography>
          ),
      },

      {
         field: "remarks",
         headerName: "Remarks",
         flex: 5  ,
         align: "center",
         headerAlign: "center",
      },
      
   ];

   
   const handleChange = (event) => {
      setBillType(event.target.value);
   };

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
               VAT & PAN Bills
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
            <InputLabel>Bill Type</InputLabel>
            <Select
               value={billType}
               label="Bill Type"
               onChange={handleChange}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
               
            >
               <MenuItem value={"vat"}>VAT Bills</MenuItem>
               <MenuItem value={"pan"}>PAN Bills</MenuItem>
               <MenuItem value={"pettycash"}>Petty Cash</MenuItem>
            </Select>
         </FormControl>

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
               rows={data.getBillsByType} 
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

export default BillTypeReport;