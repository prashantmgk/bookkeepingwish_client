import { Box, useTheme,TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "../../../components/FormsUI/Button";

import LoadingScreen from "../../../components/Backdrop";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import { useMutation} from "@apollo/client"
import { ADD_BILL } from "../../../mutations/billMutation";
import {GET_CUSTOMER_ENTRIES} from "../../../queries/incomeQueries";

const numberRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;
const panNUmberRegExp = /^[0-9]{9}$/;

const currentDate = new Date();
const defaultDate = currentDate.toISOString().split('T')[0];

const INITIAL_FORM_STATE = {
   panNumber: "",
   vendor: "",
   particular: "",
   quantity: 1,
   rate: "",
   amount: "",
   category: "",
   billsType:"",
   remarks: "",
   date: defaultDate,
}

const FORM_VALIDATION = Yup.object().shape({
   panNumber: Yup.string().matches(panNUmberRegExp, "Invalid VAT / PAN Number"),
   vendor: Yup.string().required("Required"),
   particular: Yup.string().required("Required"),
   rate: Yup.number().test("check-decimal", "Invalid number, only upto two decimal points", value => numberRegExp.test(value)),
   quantity: Yup.number().positive("Must be more than 0").integer("Cannot be a decimal").required("Required"),
   amount: Yup.number("Must be a number"),
   category: Yup.string().required("Required"),
   billsType: Yup.string().required("Required"),
   remarks: Yup.string().required("Required"),
   date: Yup.string().required("Required"),
})

const VatBill = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const handleFormSubmit = (value, {resetForm}) => {

      value.amount = value.quantity * value.rate;
      alert(JSON.stringify(value, null, 2));

      const billInput = {
         date: value.date,
         panNumber: value.panNumber,
         vendor: value.vendor,
         particular: value.particular,
         quantity: parseInt(value.quantity),
         rate: parseFloat(value.rate),
         total: parseFloat(value.amount),
         category: value.category,
         billsType: value.billsType.toString(),
         remarks: value.remarks,
      }

      addBill({ variables: {billInput}});
      resetForm({values: INITIAL_FORM_STATE});
   };

   const updateCache = (cache, { data: { addBill } }) => {
      const data = cache.readQuery({ query: GET_CUSTOMER_ENTRIES });
      data.investors.push(addBill);
      cache.writeQuery({
        query: GET_CUSTOMER_ENTRIES,
        data
      });
    };

   // ADDING BILL TO SERVER DATABASE 
   const [addBill, {loading, data}] = useMutation(ADD_BILL, {
      update: updateCache,    
   });


   if (loading) return <LoadingScreen/>

   return(

      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="VAT and PAN Bills" subtitle="Here you can enter the general information of transaction such as date, amount, account, description, etc." />
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
                  gridColumn: "span 8" 
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
               <InputLabel>Bill Type</InputLabel>
               <Select
                  value={values.billsType}
                  label="Bill Type"
                  name="billsType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.billsType && !!errors.billsType}
                  
               >
                  <MenuItem value={"vat"}>VAT</MenuItem>
                  <MenuItem value={"pan"}>PAN</MenuItem>
               </Select>
               <FormHelperText>{touched.billsType && errors.billsType}</FormHelperText>
            </FormControl>
                  
            <TextField
               fullWidth
               variant="outlined"
               type="text"
               label="Vendor"
               onBlur={handleBlur}
               onChange={handleChange}
               value={values.vendor}
               name="vendor"
               error={!!touched.vendor && !!errors.vendor}
               helperText={touched.vendor && errors.vendor}
               InputLabelProps={{
                  style: { color: colors.grey[100] },
               }}
               
               sx={{
               "& .MuiOutlinedInput-root": { 
                     "&.Mui-focused fieldset": {
                        borderColor: colors.grey[100]
                     }
                  },
                  gridColumn: "span 6",
               }}
            />

            {<TextField
               fullWidth
               variant="outlined"
               type="text"
               label={values.billsType === "pan" ? "PAN Number" : (values.billsType === "vat" ? "VAT Number" : "-") }
               onBlur={handleBlur}
               onChange={handleChange}
               value={values.panNumber}
               name="panNumber"
               error={!!touched.panNumber && !!errors.panNumber}
               helperText={touched.panNumber && errors.panNumber}
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
            />}

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
               value={(values.quantity * values.rate)}   
               label="Amount"
               disabled
               InputLabelProps={{
                  style: { color: colors.grey[100] },
               }}

               InputProps={{
                  startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                  endAdornment: <InputAdornment position="end">
                     {(values.billsType === "vat" ? "13% VAT will be auto included" : "")}
                  </InputAdornment>,
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
               <Button type="submit" color="secondary" variant="contained"
               >
                  Add Bill
               </Button>
            </Box>
         </Form>
         )}
      </Formik>
   </Box>
   )
}

export default VatBill;