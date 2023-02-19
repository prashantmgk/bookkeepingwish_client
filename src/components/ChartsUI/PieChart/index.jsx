import React from "react";
import { useQuery } from "@apollo/client"
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import { GET_EXPENSES_BY_CATEGORY } from "../../../queries/reportQueries";
import Loading from "../../../components/Backdrop";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.75;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text width={5} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};
 
const ChartUIPie = ({fiscalYear}) => {
   
   const { loading, error, data:expenseData } = useQuery(GET_EXPENSES_BY_CATEGORY,{
      variables: {
         fiscalYear: fiscalYear
      }
   });


   if (loading) return <Loading />;
   const newData = expenseData.getTotalExpenseBasedOnCategory

   const data = newData.map((item) => {
      return {
         name: (item._id).toUpperCase(),
         total: item.total
      }
   })
 
   const COLORS = ["#A2DED0", "#A2B6DF", "#D6A2DF", "#E6A2B6", "#DED6A2", "#EAEAEA", "#F4D03F", "#F1948A", "#7DCEA0", "#7FB3D5", "#5499C7", "#BB8FCE", "#D98880", "#AEB6BF", "#F5B7B1", "#D7BDE2", "#F9E79F", "#F8C471", "#85C1E9", "#73C6B6"];
   return (
      <ResponsiveContainer width="100%" height="100%" className="text-center" >
         <PieChart>
            <Legend layout="vertical" verticalAlign="top" align="left"/>
            <Pie
               data={data}
               cx="35%"
               cy="68%"
               labelLine={false}
               label={renderCustomizedLabel}
               outerRadius={110}
               innerRadius={90}
               paddingAngle={2}
               fill="#8884d8"
               dataKey="total"
            >
               {newData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[Math.floor(Math.random() * COLORS.length)]} />
               ))}
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   )
}
export default ChartUIPie;