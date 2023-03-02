import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Header from "../../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {GET_INVESTORS, GET_PROMOTERS_CAPITAL_BY_NAME, GET_PROMOTERS_CAPITAL_TILL_NOW} from "../../../../queries/investorQueries";
import { Delete } from "@mui/icons-material";
import LoadingScreen from "../../../../components/Backdrop";
import { DELETE_PROMOTERS_CAPITAL, UPDATE_PROMOTERS_CAPITAL } from "../../../../mutations/promotersCapitalMutation";
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
         editable: true,
      },
      {
         field: "name",
         headerName: "Investor",
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
         editable: true,
      },
      {
         field: "accountOrBank",
         headerName: "Account / Bank",
         flex: 4,
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "paidCapital",
         headerName: "Paid Capital",
         flex: 4,
         align: "center",
         headerAlign: "center",
         type: "number",
         editable: true,
      },

      {
         field: "remainingCapital",
         headerName: "Remaining Capital",
         flex: 4,
         align: "center",
         headerAlign: "center",
         type: "number",
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
         field: "totalCapital",
         headerName: "Capital Total",
         flex: 4,
         align: "center",
         headerAlign: "center",
         type: "number",
      },

      {
         field: "edit",
         headerName: "Edit",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <EditAction {...{params}} name={investor}/>
      },
      
      {
         field: "del",
         headerName: "Del",
         disableExport: true,
         width: 20,
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
            action ={deletePromotersCapital}
            open={open}
            handleClose={handleClose}
            dialogTitle="Deleting the following record"
         />
      </>
   );
};

const EditAction = (props) => {

   const { params, name } = props;
   const { id } = params.row;
   const [promotersCapitalTillNow, setPromotersCapitalTillNow] = useState(0);

   const [promotersCapitalTillNowCall] = useLazyQuery(GET_PROMOTERS_CAPITAL_TILL_NOW, {
      variables: {name: name},
      onCompleted: (data) => {
         setPromotersCapitalTillNow(data.getPromotersPaidCapitalTillNowByName);
      },
   },[name]);

   const [updatePromotersCapital] = useMutation(UPDATE_PROMOTERS_CAPITAL, {
      refetchQueries: [ { query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: { name } } ],
   });
   
   const [open, setOpen] = useState(false);
   
   const handleClose = () => {
      setOpen(false);
   };
   
   const handleEdit = () => {
      setOpen(true);
   };

   const updateRecord = () => {
      promotersCapitalTillNowCall();

      const promotersCapitalInput = {
         name: name,
         paidCapital: params.row.paidCapital,
         paymentMethod: params.row.paymentMethod,
         accountOrBank: params.row.accountOrBank,
         date: params.row.date,
         remainingCapital: params.row.totalCapital - (promotersCapitalTillNow + params.row.paidCapital),
         capitalPercentage : (((promotersCapitalTillNow + params.row.paidCapital) / params.row.totalCapital) * 100),
         totalCapital: params.row.totalCapital
      }
      updatePromotersCapital({variables: { promotersCapitalId: id.toString(), promotersCapitalInput: promotersCapitalInput }});
   }

   return (
      <>
         <IconButton onClick={handleEdit}>
            <SaveOutlinedIcon />
         </IconButton>
         <AlertDialogSlide 
            action={updateRecord}
            open={open}
            handleClose={handleClose}
            dialogTitle="Updating the following record"
         />
      </>
   );
};

export default PromotersCapitalReport;
