import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Layout from "./pages/global/Layout";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard/index"
import Calendar from "./pages/calendar/index"
import VatBill from "./pages/expense/bills/index"
import PettyCash from "./pages/expense/pettycash/index"
import Salary from "./pages/expense/salaries/index"
import CustomerEntry from "./pages/income/customerEntry";
import GearSales from "./pages/income/gearSales";
import VisitPass from "./pages/income/visitPass";
import Membership from "./pages/income/membership";
import PromotersCapital from "./pages/promotersCapital";
import NewInvestment from "./pages/newInvestment";
// import CategoryReport from "./pages/report/billTabs/categoryTable";
// import BillTypeReport from "./pages/report/billTabs/billTypeTable";
import SalaryReport from "./pages/report/salaryTable";
import PromotersCapitalReport from "./pages/report/promotersCapitalTable";
// import ClimbingIncomeReport from "./pages/report/incomeTabs/climbingIncome";
// import VisitPassReport from "./pages/report/incomeTabs/visitPassIncome";
// import MembershipReport from "./pages/report/incomeTabs/membershipIncome";
import ClimbingIncomeReportTab from "./pages/report/incomeTabs/climbingIncomeReportTab";
import BillExpenseReportTab from "./pages/report/billTabs/billExpenseReportTab";
import GearSalesIncomeReportTab from "./pages/report/incomeTabs/gearSaleIncome";
// import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route element={<PrivateRoutes />} >
            <Route exact path="/" element={<Layout />} >
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/vatbill" element={<VatBill/>} />
              <Route path="/pettycash" element={<PettyCash/>} />
              <Route path="/salary" element={<Salary/>} />
              <Route path="/customerEntry" element={<CustomerEntry/>} />
              <Route path="/gearSales" element={<GearSales/>} />
              <Route path="/visitPass" element={<VisitPass/>} />
              <Route path="/membership" element={<Membership/>} />
              <Route path="/promotersCapital" element={<PromotersCapital/>} />
              <Route path="/newInvestment" element={<NewInvestment/>} />
               <Route path="/billReport" element={<BillExpenseReportTab/>} />
              {/*<Route path="/billCategory" element={<CategoryReport/>} /> */}
              {/* <Route path="/billType" element={<BillTypeReport/>} /> */}
              <Route path="/salaryReport" element={<SalaryReport/>} />
              <Route path="/investorReport" element={<PromotersCapitalReport/>} />
              {/* <Route path="/climbingReport" element={<ClimbingIncomeReport/>} />
              <Route path="/visitPassReport" element={<VisitPassReport/>} />
            <Route path="/membershipReport" element={<MembershipReport/>} /> */}
              <Route path="/incomeReportTab" element={<ClimbingIncomeReportTab/>} />
              <Route path="/gearSalesReport" element={<GearSalesIncomeReportTab/>} />
              <Route path="/calendar" element={<Calendar/>} /> 
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
