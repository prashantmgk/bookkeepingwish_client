import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentsIcon from '@mui/icons-material/Payments';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import CreditScoreSharpIcon from '@mui/icons-material/CreditScoreSharp';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';


import React from "react";

export const dashboard = [

   {
      icon: <HomeOutlinedIcon />,
      title: "Dashboard",
      to: "/dashboard"
   },
];

export const menu = [
   {
      title: "Expenses",
      icon: <ReceiptLongIcon />,
      items: [
         {
            title: "VAT & PAN Bills",
            items: [],
            icon: <ReceiptLongIcon />,
            to: "/vatbill"
         },
         {
            title: "Petty Cash",
            items: [],
            icon: <PaymentsIcon />,
            to: "/pettycash"
         },
         {
            title: "Salaries",
            icon: <MoneyOffCsredOutlinedIcon />,
            items: [],
            to: "/salary"
         },

      ]
   },

   {
      title: "Funds & Investments",
      icon: <CreditScoreSharpIcon />,
      items: [
         {
            title: "Promoter's Capital",
            items: [],
            icon: <CreditScoreSharpIcon />,
            to: "/promotersCapital"
         },
         {
            title: "New Investment",
            items: [],
            icon: <PersonAddAltOutlinedIcon />,
            to: "/newInvestment"
         }
      ]
   },

   {
      title: "Income",
      icon: <RequestQuoteIcon />,
      items: [
         {
            title: "Customer's Entry",
            items: [],
            icon: <PeopleAltOutlinedIcon />,
            to: "/customerEntry"
         },
         {
            title: "Visit Pass",
            items: [],
            icon: <LocalActivityOutlinedIcon />,
            to: "/visitpass"
         },
         {
            title: "Membership",
            items: [],
            icon: <CardMembershipOutlinedIcon />,
            to: "/membership"
         },
         {
            title: "Gear Sales",
            items: [],
            icon: <RequestQuoteIcon />,
            to: "/gearSales"
         }
      ]
   },

];

export const report = [
   {
      title: "Reports",
      icon: <SummarizeOutlinedIcon />,
      items: [
         {
            icon: <AssessmentOutlinedIcon />,
            title: "Bill Report",
            to: "/billReport"
         },

         {
            icon: <MonetizationOnOutlinedIcon />,
            title: "Salary Report",
            to: "/salaryReport"
         },
         {
            icon: <SavingsOutlinedIcon />,
            title: "Investors",
            to: "/investorReport"
         },
         {
            icon: <PaymentsOutlinedIcon />,
            title: "Income",
            to: "/incomeReportTab"
         }, 
         {
            icon: <TableRowsOutlinedIcon />,
            title: "Gear Sales",
            to: "/gearSalesReport"

         }
      ]
   },
];


export const calendar = [
   {
      icon: <CalendarTodayOutlinedIcon />,
      title: "Tasks & Calendar",
      to: "/calendar"
   }
];
