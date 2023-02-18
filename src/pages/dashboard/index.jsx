import { Box, Card, TextField } from "@mui/material";
import Header from "../../components/Header";
import ChartUIBar from "../../components/ChartsUI/BarChart";
import ChartUIPie from "../../components/ChartsUI/PieChart";
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import { Typography } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { tokens } from "../../theme";
import { GET_TOTAL_EXPENSE } from "../../queries/reportQueries";
import { GET_TOTAL_INCOME } from "../../queries/reportQueries";
import { useQuery } from "@apollo/client";
import LoadingScreen from "../../components/Backdrop";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";

const Dashboard = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const defaultFiscalYear = new Date().getFullYear().toString();
   const [fiscalYear, setFiscalYear] = useState(defaultFiscalYear);

   const {loading: expenseLoading, data: expenseData} = useQuery(GET_TOTAL_EXPENSE, {
      variables: {
         fiscalYear: fiscalYear
      }
   }, [fiscalYear]);

   const {loading: incomeLoading, data: incomeData} = useQuery(GET_TOTAL_INCOME, {
      variables: {
         fiscalYear: fiscalYear
      }
   }, [fiscalYear]);

   if(expenseLoading || incomeLoading) return <LoadingScreen />

   return(
      <Box
         sx={{
         margin: { lg: "10px", xs: "0"}
         }}
      >
         <Header title="Dashboard" subtitle="Get the general overview of your project" />
         <Box
            display="grid"
            rowGap="16px"
            columnGap="16px"
            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
         >
            <Box
               sx={{
                  gridColumn: "span 12",
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
                        setFiscalYear((newDate.$y).toString());
                     }}

                     InputLabelProps={{
                        style: { color: colors.grey[100] },
                     }}
                     
                     renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
               </LocalizationProvider>

            </Box>
            
            <Box
               sx={{
                  gridColumn: {xs: "span 12", lg: "span 8"}
               }}
               display="grid"
               rowGap="16px"
               columnGap="16px"
               gridTemplateColumns="repeat(12, minmax(0, 1fr))"
            >
               <Box
                  height="120px"
                  borderRadius="5px"

                  sx={{
                     gridColumn: {xs: "span 12", lg: "span 6"}
                  }}
               >
                  <Card
                     sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "left",
                        background: `${colors.primary[400]}`,
                        background: `linear-gradient(180deg, ${colors.redAccent[600]} 0%, ${colors.redAccent[700]} 100%)`,
                        paddingX: "15px",
                        paddingY: "10px"
                        
                     }}

                     elevation={4}
                  >
                     <CreditCardOffOutlinedIcon
                        fontSize="medium"
                     />
                     <Typography
                        variant="h2"
                        
                     >
                        {`Rs. ${Math.round(expenseData.getTotalExpense).toLocaleString("en")}`}
                     </Typography>
                     <Typography
                        variant="paragraph"
                     >
                        Total Expense
                     </Typography>
                  </Card>

               </Box>

               <Box
                  height="120px"
                  borderRadius="5px"

                  sx={{
                     gridColumn: {xs: "span 12", lg: "span 6"}
                  }}
               >
                  <Card
                     sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "left",
                        background: `${colors.primary[400]}`,
                        background: `linear-gradient(180deg, ${colors.greenAccent[600]} 0%, ${colors.greenAccent[700]} 100%)`,
                        paddingX: "15px",
                        paddingY: "10px"
                        
                     }}

                     elevation={4}
                  >
                     <AddCardOutlinedIcon
                        fontSize="medium"
                     />
                     <Typography
                        variant="h2"
                        
                     >
                        {`Rs. ${Math.round(incomeData.getTotalIncome).toLocaleString("en")}`}
                     </Typography>
                     <Typography
                        variant="paragraph"
                     >
                        Total Income
                     </Typography>
                  </Card>

               </Box>

               <Box
                  borderRadius="5px"
                  backgroundColor={colors.primary[400]}

                  sx={{
                     // gridColumn: {xs: "span 12", lg: "span 12"}
                     gridColumn: "span 12"
                  }}
               >
                  <Card
                     sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        background: `${colors.primary[400]}`,
                        padding: "0",
                     }}

                     elevation={4}
                  >
                     <Typography
                        variant="h5"
                        sx={{ paddingTop: "15px" }}
                     >
                     Total Expense Each Month
                     </Typography>
                     <Box
                        sx={{
                           height: {lg: "350px", xs: "200px"},
                        }}
                        width="100%"
                        padding="0"
                     >
                        <ChartUIBar fiscalYear={fiscalYear} />
                     </Box>
                  </Card>
               </Box>
            </Box>

            <Box
               height="520px"
               borderRadius="5px"
               sx={{
                  gridColumn: {xs: "span 12", lg: "span 4"}
               }}
            >
               <Card
                  sx={{
                     height: "100%",
                     width: "100%",
                     display: "flex",
                     width: "100%",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     background: `${colors.primary[400]}`,
                     padding: "20px"
                  }}
                  
                  elevation={4}
               >
                  <Typography
                     variant="h5"
                  >
                     Category Based Expenses
                  </Typography>
                  <ChartUIPie fiscalYear={fiscalYear}/>
               </Card>

            </Box>


         </Box>
      </Box>
   )
}

export default Dashboard