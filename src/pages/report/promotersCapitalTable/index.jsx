import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {GET_INVESTORS, GET_PROMOTERS_CAPITAL_BY_NAME} from "../../../queries/investorQueries";
import LoadingScreen from "../../../components/Backdrop";
import { Delete } from "@mui/icons-material";
import { DELETE_PROMOTERS_CAPITAL } from "../../../mutations/promotersCapitalMutation";

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

const PromotersCapitalReport = () => {

   const [investor, setInvestor] = useState("");
   const {loading: investorDataLoading, data: investorData} = useQuery(GET_INVESTORS, []);
   const skip = investorData === undefined;
   const [getPromotersCapitalDataCall, {loading: promotersCapitalLoading, data: promotersCapitalData}] = useLazyQuery(GET_PROMOTERS_CAPITAL_BY_NAME, {
      variables: {name: investor},
      skip
   }, [investor]);
   
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
         headerName: "Investors",
         flex: 4,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "paymentMethod",
         headerName: "Payment Method",
         flex: 4,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "accountOrBank",
         headerName: "Account / Bank",
         flex: 4,
         align: "center",
         headerAlign: "center",
      },
      {
         field: "paidCapital",
         headerName: "Paid Capital",
         flex: 4,
         align: "center",
         headerAlign: "center",
      },

      {
         field: "remainingCapital",
         headerName: "Remaining Capital",
         flex: 4,
         align: "center",
         headerAlign: "center",
      },

      {
         field: "capitalPercentage",
         headerName: "Capital Percentage",
         flex: 4,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
              {(`${(params.row.capitalPercentage).toFixed(2)} %`).toUpperCase()}
            </Typography>
          ),
      },
      {
         field: "action",
         headerName: "",
         disableExport: true,
         width: 80,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id} name={investor} />
      }    
   ]

   const handleChange = (event) => {
      setInvestor(event.target.value);
      getPromotersCapitalDataCall()
   };

   if (investorDataLoading || promotersCapitalLoading) return <LoadingScreen/>;


   return (
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Investors Capital" subtitle="Records of all the investors and their payments" />
         <Box
            display="grid"
            rowGap="10px"
            columnGap="10px"
            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
         >
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
               <InputLabel>Investors</InputLabel>
               <Select
                  value={investor}
                  label="Investors"
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  
               >{
                  investorData ?
                  investorData.newInvestors.map((investor) => {
                     return (
                        <MenuItem key={investor.id} value={investor.name}>{investor.name}</MenuItem>
                     )
                  })
                  : null
               }
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
                     color: colors.grey[200],
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                     background: '#e0e0e0',
                     borderRadius: "2px 2px 0 0",
                  },
               }}
               >
               {
                  promotersCapitalData ?

                  <DataGrid 
                     rows={promotersCapitalData.getPromotersCapitalByName} 
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
   const { id, name } = props;

   const [deletePromotersCapital] = useMutation(DELETE_PROMOTERS_CAPITAL, {
      refetchQueries: [ { query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: { name } } ],
      variables: { promotersCapitalId: id.toString() },
   });

   const handleDelete = () => {
      deletePromotersCapital();
   }; 

   return (
      <IconButton onClick={handleDelete}>
         <Delete />
      </IconButton>
   );
};

export default PromotersCapitalReport;
