import { Box, useTheme,TextField } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../components/FormsUI/Button";

import LoadingScreen from "../../components/Backdrop";
import { useMutation } from "@apollo/client";
import { ADD_NEW_INVESTOR } from "../../mutations/newInvestor";
import { GET_INVESTORS } from "../../queries/investorQueries";

import {Formik, Form} from "formik";
import * as Yup from "yup";
const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

const INITIAL_FORM_STATE = {
   name: '',
   totalCapital: '',
   remarks: '',
}

const FORM_VALIDATION = Yup.object().shape({
   name: Yup.string().required('Required'),
   totalCapital: Yup.string().matches(numberRegExp, 'Only numbers allowed').required('Required'),
   remarks: Yup.string(),
})


const NewInvestment = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [addNewInvestor, {loading}] = useMutation(ADD_NEW_INVESTOR, {
      refetchQueries: [{query: GET_INVESTORS}]
   });

   const handleFormSubmit = (value, {resetForm}) => {
      const newInvestorInput = {
         name: value.name,
         totalCapital: value.totalCapital,
      }
      
      alert(JSON.stringify(newInvestorInput, null, 2));
      
      addNewInvestor({ variables: {newInvestorInput }});
      resetForm({values: INITIAL_FORM_STATE});
   }

   if (loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
        
         <Header title="New Investment" subtitle="Recording the Capital amount investor raise throught the fiscal year." />
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
                        label="Investor Name"
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
                        label="Total Capital"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.totalCapital}
                        name="totalCapital"
                        error={!!touched.totalCapital && !!errors.totalCapital}
                        helperText={touched.totalCapital && errors.totalCapital}
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
                        Add New Investment
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   )
}

export default NewInvestment;
