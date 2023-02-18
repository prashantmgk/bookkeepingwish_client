import { gql } from "@apollo/client";

const GET_SALARY_BY_EMPLOYEE_NAME = gql`
query Query($employeeName: String!, $fiscalYear: String!) {
  getSalaryByEmployeeName(employeeName: $employeeName, fiscalYear: $fiscalYear) {
      id
      employeeName
      date
      particular
      position
      baseSalary
      hourlyRate
      hoursWorked
      perBelay
      totalBelay
      charges
      total
      tds
      grandTotal
   }
}
`

const GET_SALARY_BY_POSITION = gql`
query Query($position: String!) {
  getSalaryByPosition(position: $position) {
    id
    employeeName
    date
    particular
    baseSalary
    hoursWorked
    hourlyRate
    perBelay
    totalBelay
    total
    charges
    tds
    grandTotal
    position
  }
}
`

export { GET_SALARY_BY_EMPLOYEE_NAME, GET_SALARY_BY_POSITION };