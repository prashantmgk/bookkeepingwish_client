import {gql} from '@apollo/client';

const ADD_SALARY = gql`
   mutation Mutation($salaryInput: SalaryInput) {
   addSalary(salaryInput: $salaryInput) {
      date
      position
      employeeName
      particular
      baseSalary
      hourlyRate
      hoursWorked
      perBelay
      totalBelay
      total
      charges
      grandTotal
      tds
      }
   }
`;

const DELETE_SALARY = gql`
mutation Mutation($salaryId: ID!) {
   deleteSalary(salaryId: $salaryId) {
      id
  }
}
`;

export {ADD_SALARY, DELETE_SALARY};


