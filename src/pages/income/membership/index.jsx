import { Box, useTheme,TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_MEMBERSHIP } from "../../../mutations/membershipMutation";

function addDays(date, days) {
   const dt = new Date(date);
   dt.setDate(dt.getDate() + days);
   return dt.toISOString().split('T')[0];
} 
const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   name: "",
   category: "",
   remarks: "",
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   name: Yup.string().required("Required"),
   category: Yup.string().required("Required"),
   remarks: Yup.string().required("Required"),
   date: Yup.string().required("Required"),
})

const Membership = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleFormSubmit = (value, {resetForm}) => {

      alert(JSON.stringify(value, null, 2));
      
      const charge = value.category === "onemonth" ? 4000 : (value.category === "sixmonths" ? 12000 : (value.category === "twelvemonths" ? 18000 : 0));
      const expiryDate = value.category === "onemonth" ? addDays(value.date, 30) : (value.category === "sixmonths" ? addDays(value.date, 180) : (value.category === "twelvemonths" ? addDays(value.date, 365) : defaultDate));

      const membershipInput = {
         name: value.name,
         category: value.category,
         remarks: value.remarks,
         date: value.date,
         charge: charge,
         expiryDate: expiryDate.split('T')[0], 
      }

      addMembership({ variables: { membershipInput } });
      resetForm({values: INITIAL_FORM_STATE})
   };

   const [addMembership, {loading}] = useMutation(ADD_MEMBERSHIP, {

   });

   if (loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Membership" subtitle="Record of the Membership" />
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
                        label="Name"
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
                        <InputLabel>Membership Package</InputLabel>
                        <Select
                           value={values.category}
                           label="Membership Package"
                           name="category"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={!!touched.category && !!errors.category}
                           
                        >
                           <MenuItem value={"onemonth"}>1 Month Membership</MenuItem>
                           <MenuItem value={"sixmonths"}>6 Month Membership</MenuItem>
                           <MenuItem value={"twelvemonths"}>12 Month Membership</MenuItem>
                        </Select>
                        <FormHelperText>{touched.category && errors.category}</FormHelperText>
                     </FormControl>

                     <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Charge"
                        value={values.category === "onemonth" ? 4000 : (values.category === "sixmonths" ? 12000 : (values.category === "twelvemonths" ? 18000 : 0))}
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
                           gridColumn: "span 6" 
                        }}
                     />

                     <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        label="Start Date"
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
                        type="date"
                        label="Expiry Date"
                        disabled
                        value={values.category === "onemonth" ? addDays(values.date, 30) : (values.category === "sixmonths" ? addDays(values.date, 6 * 30): (values.category === "twelvemonths" ? addDays(values.date, 12 * 30): defaultDate))}
                        name="expiryDate"
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
                        Add Membership
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default Membership;
