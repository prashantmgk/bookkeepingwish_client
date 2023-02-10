import { Box, useTheme,TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";
import { useMutation } from "@apollo/client";
import { ADD_VISIT_PASS } from "../../../mutations/visitPassMutation";

import {Formik, Form} from "formik";
import * as Yup from "yup";


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

const VisitPass = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleFormSubmit = (value, {resetForm}) => {

      alert(JSON.stringify(value, null, 2));
      const charge = value.category === "threedays" ? 1200 : (value.category === "sevendays" ? 2500 : (value.category === "fifteendays" ? 5000 : 0)) ;
      const expiryDate = value.category === "threedays" ? addDays(value.date, 3) : value.category === "sevendays" ? addDays(value.date, 7): value.category === "fifteendays" ? addDays(value.date, 15): defaultDate

      const visitorPassInput = {
         name: value.name,
         category: value.category,
         remarks: value.remarks,
         date: value.date,
         charge: charge,
         expiryDate: expiryDate.split('T')[0],
      }

      addVisitPass({ variables: { visitorPassInput } });
      resetForm({values: INITIAL_FORM_STATE})

   };

   // ADDING BILL TO SERVER DATABASE 
   const [addVisitPass, {loading}] = useMutation(ADD_VISIT_PASS, {
      // update: updateCache
   });

   if (loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Visit Pass" subtitle="Record of the Visit Passes sold" />
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
                        <InputLabel>Visit Pass Package</InputLabel>
                        <Select
                           value={values.category}
                           label="Visit Pass Package"
                           name="category"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={!!touched.category && !!errors.category}
                           
                        >
                           <MenuItem value={"threedays"}>3 Days Pass</MenuItem>
                           <MenuItem value={"sevendays"}>7 Days Pass</MenuItem>
                           <MenuItem value={"fifteendays"}>15 Days Pass</MenuItem>
                        </Select>
                        <FormHelperText>{touched.category && errors.category}</FormHelperText>
                     </FormControl>

                     <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Charge"
                        value={values.category === "threedays" ? 1200 : (values.category === "sevendays" ? 2500 : (values.category === "fifteendays" ? 5000 : 0))}
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
                        value={values.category === "threedays" ? addDays(values.date, 3) : values.category === "sevendays" ? addDays(values.date, 7): values.category === "fifteendays" ? addDays(values.date, 15): defaultDate}
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
                        Add Visit Pass
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default VisitPass;
