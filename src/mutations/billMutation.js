import {gql} from '@apollo/client';

const ADD_BILL = gql`
   mutation Mutation($billInput: BillInput) {
      addBill(billInput: $billInput) {
         date
         billsType
         panNumber
         vendor
         particular
         quantity
         rate
         category
         remarks
         total
      }
   }
`;


export {ADD_BILL};