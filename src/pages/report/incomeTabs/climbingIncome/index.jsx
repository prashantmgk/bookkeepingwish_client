import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import LoadingScreen from "../../../../components/Backdrop";
import {GET_CUSTOMER_ENTRIES} from "../../../../queries/incomeQueries";
import { useQuery } from "@apollo/client";

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

   const {loading, data} = useQuery(GET_CUSTOMER_ENTRIES);

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

export default ClimbingIncomeReport;