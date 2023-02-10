import { Box, useTheme,TextField } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_GEAR_SALES_ENTRY } from "../../../mutations/gearSalesMutation";

const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   item: "",
   quantity: 1,
   rate: "",
   amount: 0,
   remarks: "",
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   item: Yup.string().required("Required"),
   rate: Yup.number().test("check-decimal", "Invalid number, only upto two decimal points", value => numberRegExp.test(value)),
   quantity: Yup.number().positive("Must be more than 0").integer("Cannot be a decimal").required("Required"),
   amount: Yup.number("Must be a number"),
   remarks: Yup.string().required("Required"),
   date: Yup.string().required("Required"),
})



const GearSales = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleFormSubmit = (value, {resetForm}) => {

      value.amount = value.quantity * value.rate;
      alert(JSON.stringify(value, null, 2));

      const gearSalesInput = {
         item: value.item,
         quantity: value.quantity,
         rate: value.rate,
         amount: value.amount,
         remarks: value.remarks,
         date: value.date,

      }

      addGearSales({ variables: { gearSalesInput } });
      resetForm({values: INITIAL_FORM_STATE})
   };


   const [addGearSales, {loading}] = useMutation(ADD_GEAR_SALES_ENTRY, {

   });


   if (loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Gear Sales" subtitle="Keep record of the gears sold" />
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
                        label="Item Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.item}
                        name="item"
                        error={!!touched.item && !!errors.item}
                        helperText={touched.item && errors.item}
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
                        value={values.rate * values.quantity}
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
                        Add Gear Sale
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   )
}

export default GearSales;
