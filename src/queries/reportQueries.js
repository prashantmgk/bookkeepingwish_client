import {gql} from '@apollo/client';

const GET_EXPENSES_BY_CATEGORY = gql`
query Query ($fiscalYear: String!){
  getTotalExpenseBasedOnCategory (fiscalYear: $fiscalYear){
    total
    _id
  }
}
`


const GET_TOTAL_EXPENSE_EACH_MONTH = gql`
query Query($fiscalYear: String!) {
  getTotalExpenseEachMonth(fiscalYear: $fiscalYear) {
    month
    expense
  }
}
`

const GET_TOTAL_EXPENSE = gql`
query Query($fiscalYear: String!) {
  getTotalExpense(fiscalYear: $fiscalYear)
}
`

const GET_TOTAL_INCOME = gql`
query Query($fiscalYear: String!) {
  getTotalIncome(fiscalYear: $fiscalYear)
}
`


export {GET_EXPENSES_BY_CATEGORY, GET_TOTAL_EXPENSE, GET_TOTAL_EXPENSE_EACH_MONTH, GET_TOTAL_INCOME}