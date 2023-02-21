import { Box, useTheme,TextField} from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";
import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER_ENTRY } from "../../../mutations/customerEntry";

import {Formik, Form} from "formik";
import * as Yup from "yup";
import { GET_CUSTOMER_ENTRIES } from "../../../queries/incomeQueries";
import { useState } from "react";

const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   name: '',
   wallCharge: 500,
   belay: 100,
   shoesRent: 100,
   harnessRent: 100,
   chalk: 100,
   rope: 100,
   remarks: '',
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   name: Yup.string().required("Required"),
   wallCharge: Yup.number().test("check-decimal", "Invalid number, only upto two decimal points", value => numberRegExp.test(value)),
   belay: Yup.number(),
   shoesRent: Yup.number(),
   harnessRent: Yup.number(),
   chalk: Yup.number(),
   rope: Yup.number(),
   remarks: Yup.string().required("Required"),
   date: Yup.string().required("Required"),
})

const CustomerEntry = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [values, setValues] = useState("");

   const handleFormSubmit = (value, {resetForm}) => {

      alert(JSON.stringify(value, null, 2));
      const total =(value.wallCharge + value.belay + value.shoesRent + value.harnessRent + value.chalk + value.rope);

      const customerEntryInput = {
         name: value.name,
         wallCharge: value.wallCharge,
         belay: value.belay,
         shoesRent: value.shoesRent,
         harnessRent: value.harnessRent,
         chalk: value.chalk,
         rope: value.rope,
         remarks: value.remarks,
         date: value.date,
         total: parseFloat(total),
      }

      addCustomerEntry({variables: {customerEntryInput}})
      resetForm({values: INITIAL_FORM_STATE})
   };


   function getFiscalYear(dateString) {
      const date = new Date(dateString);
      const currentYear = new Date().getFullYear();
      const fiscalYearStart = new Date(`${currentYear}-07-16`);
      
      if (date > fiscalYearStart) {
        return currentYear.toString();
      } else {
        return (currentYear - 1).toString();
      }
   }

   const [addCustomerEntry, {loading}] = useMutation(ADD_CUSTOMER_ENTRY, {
      refetchQueries: [{query: GET_CUSTOMER_ENTRIES, variables: {fiscalYear: getFiscalYear(values.date)}}],
   });

   if (loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
        
         <Header title="Customer Entries" subtitle="Keeping Track of one time customers" />
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
                  {setValues(values)}
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
                        label="Customer Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
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
                        type="number"
                        label="Wall Charge"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.wallCharge}
                        name="wallCharge"
                        error={!!touched.wallCharge && !!errors.wallCharge}
                        helperText={touched.wallCharge && errors.wallCharge}
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
                           gridColumn: "span 12" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Belay"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.belay}
                        name="belay"
                        error={!!touched.belay && !!errors.belay}
                        helperText={touched.belay && errors.belay}
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
                        variant="outlined"
                        type="number"
                        label="Shoes Rent"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shoesRent}
                        name="shoesRent"
                        error={!!touched.shoesRent && !!errors.shoesRent}
                        helperText={touched.shoesRent && errors.shoesRent}
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
                        variant="outlined"
                        type="number"
                        label="Harness Rent"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.harnessRent}
                        name="harnessRent"
                        error={!!touched.harnessRent && !!errors.harnessRent}
                        helperText={touched.harnessRent && errors.harnessRent}
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
                        variant="outlined"
                        type="number"
                        label="Chalk"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.chalk}
                        name="chalk"
                        error={!!touched.chalk && !!errors.chalk}
                        helperText={touched.chalk && errors.chalk}
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
                        variant="outlined"
                        type="number"
                        label="Rope"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rope}
                        name="rope"
                        error={!!touched.rope && !!errors.rope}
                        helperText={touched.rope && errors.rope}
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
                        label="Total"
                        value={(values.wallCharge + values.belay + values.shoesRent + values.harnessRent + values.chalk + values.rope)}
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
                                 borderColor: colors.grey[0]
                              }
                           },
                           gridColumn: "span 4" 
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
                           gridColumn: "span 12" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        multiline
                        rows={4}
                        label="Add Remarks"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.remarks}
                        name="remarks"
                        error={!!touched.remarks && !!errors.remarks}
                        helperText={touched.remarks && errors.remarks}
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

                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                     <Button type="submit" color="secondary" variant="contained">
                        Add Entry
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default CustomerEntry;
