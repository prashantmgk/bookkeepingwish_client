import { Box,TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button"
import LoadingScreen from "../../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import {useMutation} from "@apollo/client"
import { ADD_BILL } from "../../../mutations/billMutation";
import { useState } from "react";
import { GET_BILLS_BY_CATEGORY, GET_BILLS_BY_TYPE } from "../../../queries/billQueries";

const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   particular: "",
   quantity: 1,
   rate: "",
   amount: 0,
   category: "",
   remarks: "",
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   particular: Yup.string().required("Required"),
   rate: Yup.number().test("check-decimal", "Invalid number, only upto two decimal points", value => numberRegExp.test(value)),
   quantity: Yup.number("Must be a number"),
   amount: Yup.number("Must be a number"),
   category: Yup.string().required("Required"),
   remarks: Yup.string().required("Required"),
   date: Yup.string().required("Required"),
})

const PettyCash = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [values, setValues] = useState("");

   const handleFormSubmit = (value, {resetForm}) => {

      alert(JSON.stringify(value, null, 2));
      value.amount = value.quantity * value.rate;

      const billInput = {
         date: value.date,
         panNumber: "",
         vendor: "",
         particular: value.particular,
         quantity: parseFloat(value.quantity),
         rate: parseFloat(value.rate),
         total: parseFloat(value.amount),
         category: value.category,
         billsType: "pettycash",
         remarks: value.remarks,
      }

      addBill({ variables: {billInput}});
      resetForm({values: INITIAL_FORM_STATE});
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

   // ADDING BILL TO SERVER DATABASE 
   const [addBill, {loading}] = useMutation(ADD_BILL, {
      refetchQueries: [
         {query: GET_BILLS_BY_CATEGORY, variables: {category: values.category, fiscalYear: getFiscalYear(values.date)}},
         {query: GET_BILLS_BY_TYPE, variables: {billsType: values.billsType, fiscalYear: getFiscalYear(values.date)}}
      ],
   });

   if (loading) return <LoadingScreen/>

   return(
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Petty Cash" subtitle="Form for Petty Cash" />
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

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.quantity}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        InputLabelProps={{
                           style: { color: colors.grey[100] },
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
                        label="Rate"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rate}
                        name="rate"
                        error={!!touched.rate && !!errors.rate}
                        helperText={touched.rate && errors.rate}
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
                        label="Amount"
                        value={(values.rate * values.quantity).toFixed(2)}
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

                     <FormControl 
                        sx={{
                           "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 6" 
                        }}

                        
                        >
                        <InputLabel>Category</InputLabel>
                        <Select
                           value={values.category}
                           label="Category"
                           name="category"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={!!touched.category && !!errors.category}
                           
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
                        <FormHelperText>{touched.category && errors.category}</FormHelperText>
                     </FormControl>

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
                        Add Bill
                     </Button>
                  </Box>
               </Form>
               )}
         </Formik>
      </Box>
   )
}

export default PettyCash;