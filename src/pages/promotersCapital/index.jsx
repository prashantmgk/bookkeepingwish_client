import { Box, useTheme,TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../components/FormsUI/Button";

import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import  {ADD_PROMOTERS_CAPITAL}  from "../../mutations/promotersCapitalMutation";
import { GET_INVESTORS, GET_PROMOTERS_CAPITAL_TILL_NOW, GET_INVESTOR_BY_NAME, GET_PROMOTERS_CAPITAL_BY_NAME } from "../../queries/investorQueries";
import LoadingScreen from "../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";
import { useState } from "react";

const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;
const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   name: '',
   paidCapital: '',
   paymentMethod: '',
   accountOrBank: '', 
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   // name: Yup.string().required('Required'),
   paidCapital: Yup.string().matches(numberRegExp, 'Only numbers allowed').required('Required'),
   paymentMethod: Yup.string().required('Required'),
   accountOrBank: Yup.string().required('Required'),
   date: Yup.string().required('Required'),

})

const PromotersCapital = () => {
  
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [investorName, setInvestorName] = useState('');
   const [promotersCapitalTillNow, setPromotersCapitalTillNow] = useState(0);
   const [totalCapital, setTotalCapital] = useState(0);

   const {loading: investorDataLoading, data: investorData} = useQuery(GET_INVESTORS);
   const skipI = investorData?.newInvestors;

   const [promotersCapitalTillNowCall, { data:promotersCapitalTillNowData}] = useLazyQuery(GET_PROMOTERS_CAPITAL_TILL_NOW, {
      variables: {name: investorName},
      onCompleted: (data) => {
         setPromotersCapitalTillNow(data.getPromotersPaidCapitalTillNowByName);
      },
      skip: !skipI,
   },[investorName]);

   const [totalCapitalOfInvestorCall, { data:totalCapitalOfInvestorData}] = useLazyQuery(GET_INVESTOR_BY_NAME, {
      variables: {name: investorName},
      onCompleted: (data) => {
         setTotalCapital(data.getNewInvestorByName.totalCapital);
      },
      skip: !skipI,
   },[investorName]);

   const skipJ = promotersCapitalTillNowData?.getPromotersPaidCapitalTillNowByName || totalCapitalOfInvestorData;

   const [addPromotersCapital, {loading}] = useMutation(ADD_PROMOTERS_CAPITAL, {
      skip: !skipJ,
      refetchQueries: [ {query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: {name: investorName}} ],
   });

   const handleInvestorNameChange = (event) => {
      setInvestorName(event.target.value);
      promotersCapitalTillNowCall();
      totalCapitalOfInvestorCall();

   };
   
   const handleFormSubmit = (value, {resetForm}) => {


      const promotersCapitalInput = {
         name: investorName,
         paidCapital: value.paidCapital,
         paymentMethod: value.paymentMethod,
         accountOrBank: value.accountOrBank,
         date: value.date,
         remainingCapital: totalCapital - (promotersCapitalTillNow + value.paidCapital),
         capitalPercentage : (((promotersCapitalTillNow + value.paidCapital) / totalCapital) * 100),
         totalCapital: totalCapital,
      }


      alert(JSON.stringify(promotersCapitalInput, null, 2));

      addPromotersCapital({
         variables: {promotersCapitalInput},
         //USE REFETCH QUERIES LATER
         refetchQueries: [
            {query: GET_PROMOTERS_CAPITAL_TILL_NOW, variables: {name: investorName}},
            {query: GET_PROMOTERS_CAPITAL_BY_NAME, variables: {name: investorName}},
         ],
      });
      resetForm({values: INITIAL_FORM_STATE});
   };
   
   

   if (investorDataLoading || loading) return <LoadingScreen/>

   return (
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
        
         <Header title="Promoter's Capital" subtitle="Recording the Capital amount investor raise throught the fiscal year." />
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
                     <FormControl 
                        sx={{
                           "& .MuiOutlinedInput-root": { 
                              "&.Mui-focused fieldset": {
                                 borderColor: colors.grey[100]
                              }
                           },
                           gridColumn: "span 12" 
                        }}

                        >
                        <InputLabel>Investor Name</InputLabel>
                        <Select
                           value={investorName}
                           label="Category"
                           required
                           name="name"
                           onChange={handleInvestorNameChange}
                           onBlur={handleBlur}
                           error={!!touched.name && !!errors.name}
                        >
                           {
                              investorData ?
                              investorData.newInvestors.map((investor) => {
                                 return (
                                    <MenuItem key={investor.id}  value={investor.name}>{investor.name}</MenuItem>
                                 )
                              })
                              : null
                           }
                        </Select>
                        <FormHelperText>{touched.category && errors.category}</FormHelperText>
                     </FormControl>
                     
                     <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        label="Paid Capital"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.paidCapital}
                        name="paidCapital"
                        error={!!touched.paidCapital && !!errors.paidCapital}
                        helperText={touched.paidCapital && errors.paidCapital}
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
                        variant="standard"
                        type="text"
                        label="Investment Capital"
                        value={totalCapital.toLocaleString('en-US')}
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
                        type="text"
                        label="Payment Method"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.paymentMethod}
                        name="paymentMethod"
                        error={!!touched.paymentMethod && !!errors.paymentMethod}
                        helperText={touched.paymentMethod && errors.paymentMethod}
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
                        label="Account or Bank Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountOrBank}
                        name="accountOrBank"
                        error={!!touched.accountOrBank && !!errors.accountOrBank}
                        helperText={touched.accountOrBank && errors.accountOrBank}
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

                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                     <Button type="submit" color="secondary" variant="contained">
                        Add Capital
                     </Button>
                  </Box>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default PromotersCapital

