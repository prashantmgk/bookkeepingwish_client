import { IconButton} from "@mui/material";
import {Box} from "@mui/material";
import Header from "../../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
// import { useLazyQuery} from "@apollo/client";
import {useQuery, useMutation} from "@apollo/client";
import {GET_INVESTORS, GET_PROMOTERS_CAPITAL_BY_NAME } from "../../../../queries/investorQueries";
// import { GET_PROMOTERS_CAPITAL_BY_NAME, GET_INVESTOR_BY_ID } from "../../../../queries/investorQueries";
import { Delete } from "@mui/icons-material";
import LoadingScreen from "../../../../components/Backdrop";
// import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AlertDialogSlide from "../../../../components/Alertbox";
import { DELETE_INVESTOR, DELETE_ALL_PROMOTERS_CAPITAL_BY_NAME } from "../../../../mutations/newInvestor";
// import { UPDATE_INVESTOR } from "../../../../mutations/newInvestor";
// import { UPDATE_PROMOTERS_CAPITAL_BY_NAME } from "../../../../mutations/promotersCapitalMutation";

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

   const {loading: investorDataLoading, data: investorData} = useQuery(GET_INVESTORS, []);
   
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const columns = [
      {
         field: "name",
         headerName: "Investor",
         flex: 4,
         align: "left",
         headerAlign: "left",
         editable: false,
      },
      {
         field: "totalCapital",
         headerName: "Capital Total",
         flex: 4,
         align: "left",
         headerAlign: "left",
         type: "number",
         editable: false,
      },

      // {
      //    field: "edit",
      //    headerName: "Edit",
      //    disableExport: true,
      //    width: 20,
      //    sortable: false,
      //    align: "center",
      //    headerAlign: "center",
      //    renderCell: (params) => <EditAction {...{params}} id={params.row.id}/>
      // },
      
      {
         field: "del",
         headerName: "Del",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id} name={params.row.name}/>
      }    
   ]

   if (investorDataLoading) return <LoadingScreen/>;


   return (
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Investors Capital" subtitle="Record of Investors and Their Payments" />
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
                     color: colors.grey[100],
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                     background: '#e0e0e0',
                     borderRadius: "2px 2px 0 0",
                  },
               }}
               >
               {
                  investorData ?

                  <DataGrid 
                     rows={investorData.newInvestors} 
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

   const [deleteNewInvestor] = useMutation(DELETE_INVESTOR, {
      refetchQueries: [ { query: GET_INVESTORS } ],
      variables: { newInvestorId: id.toString() },
   });

   const [deleteAllPromotersCapitalByName] = useMutation(DELETE_ALL_PROMOTERS_CAPITAL_BY_NAME, {
      refetchqueries: [ { query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: { name: name }} ],
      variables: { name: name },
   });
   
   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleDelete = () => {
      setOpen(true);
   }; 

   const handleAction = () =>
   {
      deleteNewInvestor();
      deleteAllPromotersCapitalByName();
   }

   return (
      <>
         <IconButton onClick={handleDelete}>
            <Delete />
         </IconButton>
         <AlertDialogSlide 
            action ={handleAction}
            open={open}
            handleClose={handleClose}
            dialogTitle="Deleting the following record"
         />
      </>
   );
};

// const EditAction = (props) => {

//    const { params } = props;
//    const { id } = params.row;

//    const [investorName, setInvestorName] = useState(params.row.name);

//    const newInvestorInput = {
//       name: params.row.name,
//       totalCapital: params.row.totalCapital,
//    }

//    // const {loading, data} = useLazyQuery(GET_INVESTOR_BY_ID, {
//    //    variables: { newInvestorId: id.toString() },
//    // });

//    const [investorNameCall, { loading, data}] = useLazyQuery(GET_INVESTOR_BY_ID, {
//       variables: {investorId: id.toString()},
//       onCompleted: (data) => {
//          setInvestorName(data.newInvestor.name);
//       }
//    },[investorName]);

//    const skipI = data ? true : false;

//    const [updateNewInvestor] = useMutation(UPDATE_INVESTOR, {
//       refetchQueries: [ { query: GET_INVESTORS } ],
//       variables: { newInvestorId: id.toString(), newInvestorInput: newInvestorInput },
//    });
   
//    const [updatePromotersCapitalByName] = useMutation(UPDATE_PROMOTERS_CAPITAL_BY_NAME, {
//       refetchQueries: [ { query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: { name: params.row.name } } ],
//       variables: { name: investorName, promotersCapitalInput: newInvestorInput},
//       skip: !skipI
//    });
   
//    const [open, setOpen] = useState(false);
   
//    const handleClose = () => {
//       setOpen(false);
//    };
   
//    const handleEdit = () => {
//       setOpen(true);
//    };

//    const handleUpdate = () => {
//       investorNameCall();  
//       updatePromotersCapitalByName();
//       updateNewInvestor();
//    }

//    if (loading) return <LoadingScreen/>;

//    return (
//       <>
//          <IconButton onClick={handleEdit}>
//             <SaveOutlinedIcon />
//          </IconButton>
//          <AlertDialogSlide 
//             action={handleUpdate}
//             open={open}
//             handleClose={handleClose}
//             dialogTitle="Updating the following record"
//          />
//       </>
//    );
// };

export default PromotersCapitalReport;
