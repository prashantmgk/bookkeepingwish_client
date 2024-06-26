import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_SALARY_BY_EMPLOYEE_NAME} from "../../../queries/salaryQueries";
import LoadingScreen from "../../../components/Backdrop";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DELETE_SALARY, UPDATE_SALARY } from "../../../mutations/salaryMutation";
import { Delete } from "@mui/icons-material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AlertDialogSlide from "../../../components/Alertbox";

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

const SalaryReport = () => {

   const [name, setName] = useState("");
   const [fiscalYear, setFiscalYear] = useState("");
   const [loadSalaryData, { loading, data }] = useLazyQuery(GET_SALARY_BY_EMPLOYEE_NAME, {
   });
   
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
         field: "employeeName",
         headerName: "Employee Name",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
         editable: true,
      },
      {
         field: "position",
         headerName: "Position",
         flex: 4,
         cellClassName: "name-column--cell",
         align: "center",
         headerAlign: "center",
         renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
               {
                  params.row.position === "managingDirector" ? "Managing Director" :
                  params.row.position === "instructor" ? "Instructor" :
                  params.row.position === "cleaner" ? "Cleaner" : params.row.position
               }
            </Typography>
         ),
      },
      {
         field: "baseSalary",
         headerName: "Base Salary",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "hourlyRate",
         headerName: "Hourly Rate",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "hoursWorked",
         headerName: "Hours Worked",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "perBelay",
         headerName: "Per Belay",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "totalBelay",
         headerName: "Total Belay",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },

      {
         field: "grandTotal",
         headerName: "Grand Total",
         flex: 2,
         type: "number",
         align: "center",
         headerAlign: "center",
      },
      {
         field: "tds",
         headerName: "TDS ( Rs )",
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
         renderCell: (params) => <EditAction {...{params}} employeeName={name} fiscalYear={fiscalYear}/>
      },

      {
         field: "del",
         headerName: "Del",
         disableExport: true,
         width: 20,
         sortable: false,
         align: "center",
         headerAlign: "center",
         renderCell: (params) => <DeleteAction id={params.row.id} employeeName={name} fiscalYear={(fiscalYear.$y).toString()} />
      }
   ];

   if(loading) return <LoadingScreen />
   const rows = data?.getSalaryByEmployeeName || [];

   return(
      <Box 
         sx={{
            margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Salary Report" subtitle="Records of all the data based on their name and fiscal year" />
         <Box
            display="grid"
            rowGap="10px"
            columnGap="10px"
            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
         >
         <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Employee Name"
            onChange={(newValue) => setName(newValue.target.value)}
            value={name}
            name="vendor"
            InputLabelProps={{
               style: { color: colors.grey[100] },
            }}
            
            sx={{
            "& .MuiOutlinedInput-root": { 
                  "&.Mui-focused fieldset": {
                     borderColor: colors.grey[100]
                  }
               },
               gridColumn: {xs:"span 5" , lg: "span 4"},
            }}
         />
         
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
                     setFiscalYear(newDate);
                  }}

                  InputLabelProps={{
                     style: { color: colors.grey[100] },
                  }}
                  
                  renderInput={(params) => <TextField {...params} helperText={null} />}
               />
            </LocalizationProvider>

         </Box>
         <Button type="submit" color="secondary" variant="contained"
            sx={{
               gridColumn: "span 1",
               marginRight: "30px",
            }}
            onClick={() =>
               loadSalaryData({
                  variables: {employeeName: name, fiscalYear: ((fiscalYear.$y).toString())}
            })}
         >
            <SearchOutlinedIcon/>
         </Button>

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
               <DataGrid 
                  rows={rows} 
                  getRowId={row => row.id} 
                  columns={columns}
                  density="compact"
                  components={{
                     Toolbar: CustomToolbar,
                  }}
               />
            }
            
         </Box>
      </Box> 
   </Box>   
   )
}

const DeleteAction = (props) => {
   const { id, employeeName, fiscalYear } = props;
   const [deleteSalary] = useMutation(DELETE_SALARY, {
      variables: {salaryId: id },
      refetchQueries: [{ query: GET_SALARY_BY_EMPLOYEE_NAME, variables: {employeeName, fiscalYear} }],
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
            action ={deleteSalary}
            open={open}
            handleClose={handleClose}
            dialogTitle="Deleting the following record"
         />
      </>
   );
}

const EditAction = (props) => {

   const { params, employeeName, fiscalYear } = props;
   const { id } = params.row;

   const salaryInput = {
      date: params.row.date,
      employeeName: params.row.employeeName,
      position: params.row.position,
      particular: params.row.particular,
      baseSalary: params.row.baseSalary || 0,
      hourlyRate: params.row.hourlyRate || 0,
      hoursWorked: params.row.hoursWorked || 0,
      perBelay: params.row.perBelay || 0,
      totalBelay: params.row.totalBelay || 0,
      charges: params.row.charges || 0,
   }

   const [updateSalary] = useMutation(UPDATE_SALARY, {
      refetchQueries: [{ query: GET_SALARY_BY_EMPLOYEE_NAME, variables: {employeeName, fiscalYear} }],
      variables: { salaryId: id.toString(), salaryInput: salaryInput },
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
            action={updateSalary}
            open={open}
            handleClose={handleClose}
            dialogTitle="Updating the following record"
         />
      </>
   );
};


export default SalaryReport;
