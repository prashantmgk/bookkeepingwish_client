import { Box, useTheme, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import {useMutation} from "@apollo/client"
import { ADD_SALARY } from "../../../mutations/salaryMutation";

const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   employeeName: '',
   position: "",
   particular: '',
   baseSalary: '',
   hourlyRate: '',
   hoursWorked: '',
   perBelay: '',
   totalBelay: '',
   charges: '',
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   particular: Yup.string().required("Required"),
   employeeName: Yup.string().required("Required"),
   position: Yup.string().required("Required"),
   baseSalary: Yup.number(),
   hourlyRate: Yup.number(),
   hoursWorked: Yup.number(),
   perBelay: Yup.number(),
   totalBelay: Yup.number(),
   charges: Yup.number(),
   date: Yup.date().required("Required"),
})

const Salary = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleFormSubmit = (value, {resetForm}) => {

      alert(JSON.stringify(value, null, 2));

      const salaryInput = {
         date: value.date,
         employeeName: value.employeeName,
         position: value.position,
         particular: value.particular,
         baseSalary: value.baseSalary || 0,
         hourlyRate: value.hourlyRate || 0,
         hoursWorked: value.hoursWorked || 0,
         perBelay: value.perBelay || 0,
         totalBelay: value.totalBelay || 0,
         charges: value.charges || 0,
      }
      
      addSalary({variables: {salaryInput}});
      resetForm({values: INITIAL_FORM_STATE});
   };

   const [addSalary, {loading}] = useMutation(ADD_SALARY, {

   });


   if (loading) return <LoadingScreen/>

   return(
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
        
         <Header title="Salaries" subtitle="Form for Salaries" />
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
         >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            }) => (
               <Form onSubmit={handleSubmit}>
                  <Box
                     display="grid"
                     rowGap="16px"
                     columnGap="16px"
                     gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                  >
                     <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Employee Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.employeeName}
                        name="employeeName"
                        error={!!touched.employeeName && !!errors.employeeName}
                        helperText={touched.employeeName && errors.employeeName}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 12" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Particular"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.particular}
                        name="particular"
                        error={!!touched.particular && !!errors.particular}
                        helperText={touched.particular && errors.particular}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 12" 
                        }}
                     />

                     <FormControl 
                        sx={{
                           "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 4" 
                        }}

                        
                        >
                        <InputLabel>Position</InputLabel>
                        <Select
                           value={values.position}
                           label="Position"
                           name="position"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={!!touched.position && !!errors.position}
                           
                           
                        >
                           <MenuItem value={"instructor"}>Instructor</MenuItem>
                           <MenuItem value={"managingDirector"}>Managing Director</MenuItem>
                           <MenuItem value={"cleaner"}>Cleaner</MenuItem>

                        </Select>
                        <FormHelperText>{touched.position && errors.position}</FormHelperText>
                     </FormControl>
                     
                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Base Salary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.baseSalary}
                        name="baseSalary"
                        error={!!touched.baseSalary && !!errors.baseSalary}
                        helperText={touched.baseSalary && errors.baseSalary}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 8" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Hourly Rate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hourlyRate}
                        name="hourlyRate"
                        error={!!touched.hourlyRate && !!errors.hourlyRate}
                        helperText={touched.hourlyRate && errors.hourlyRate}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Hours Worked"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hoursWorked}
                        name="hoursWorked"
                        error={!!touched.hoursWorked && !!errors.hoursWorked}
                        helperText={touched.hoursWorked && errors.hoursWorked}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Per Belay"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.perBelay}
                        name="perBelay"
                        error={!!touched.perBelay && !!errors.perBelay}
                        helperText={touched.perBelay && errors.perBelay}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Total Belay"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.totalBelay}
                        name="totalBelay"
                        error={!!touched.totalBelay && !!errors.totalBelay}
                        helperText={touched.totalBelay && errors.totalBelay}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Charges"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.charges}
                        name="charges"
                        error={!!touched.charges && !!errors.charges}
                        helperText={touched.charges && errors.charges}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        label="Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.date}
                        name="date"
                        error={!!touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}
               
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}
                     />


                     <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Total"
                        value={values.baseSalary + (values.hourlyRate * values.hoursWorked) + (values.perBelay * values.totalBelay)}
                        disabled
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 4" 
                        }}
                     />
                     

                     <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="1% of TDS (Tax Deducted at Source)"
                        value={(values.baseSalary + (values.hoursWorked * values.hourlyRate) + (values.totalBelay * values.perBelay)) / 100}
                        disabled
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 4" 
                        }}
                     />


                     <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Grand Total"
                        value={(values.baseSalary + (values.hoursWorked * values.hourlyRate) + (values.totalBelay * values.perBelay)) - (1/100 * (values.baseSalary + (values.hoursWorked * values.hourlyRate) + (values.totalBelay * values.perBelay))) - values.charges}
                        disabled
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
                        }}

                        InputProps={{
                           startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                        }}
                        
                        sx={{
                        "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 4" 
                        }}
                     />

                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                     <Button type="submit" color="secondary" variant="contained"
                     >
                        Add Salary
                     </Button>
                  </Box>
               </Form>
            )}

         </Formik>
      </Box>
   )
}

export default Salary
