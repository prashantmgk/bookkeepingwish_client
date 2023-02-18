import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label } from 'recharts';
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import { useQuery } from "@apollo/client"
import { GET_TOTAL_EXPENSE_EACH_MONTH } from "../../../queries/reportQueries";
import Loading from "../../../components/Backdrop";

const ChartUIBar = ({fiscalYear}) => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   
   const { loading, error, data:expenseData } = useQuery(GET_TOTAL_EXPENSE_EACH_MONTH, {
      variables: {
         fiscalYear: fiscalYear
      }
   });


   if (loading) return <Loading />;
   const newData = expenseData.getTotalExpenseEachMonth

   return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={newData}
            margin={{
               top: 20,
               right: 10,
               left: 10,
               bottom: 20,
            }}
            barSize={35}
         >
         <CartesianGrid stroke={colors.redAccent[100]} strokeOpacity="10%" vertical={false}/>
         <XAxis tick={{fill: colors.grey[100], fontSize:12}} dataKey="month" padding={{ left:5 , right: 5 }} textDecoration={colors.grey[500]}>
         <Label value="Months" offset={-10} position="insideBottom" />
            </XAxis>
         <YAxis tick={{fill: colors.grey[100], fontSize:12}}/>
         <LabelList dataKey="month" position="insideTop" angle="45"  />
         <Bar dataKey="expense" fill={colors.grey[100]} label={{ position: 'top' }}>
         {newData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors.greenAccent[600]}/>
         ))}
         </Bar>
         <Tooltip viewBox={{ x: 0, y: 0, width: 400, height: 100 }} contentStyle={{backgroundColor: colors.grey[700], strokeWidth: 0}} cursor={{ fill: colors.redAccent[200], opacity:0.1, }}/>
        </BarChart>
      </ResponsiveContainer>
   )
}
export default ChartUIBar;