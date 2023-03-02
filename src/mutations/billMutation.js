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

const DELETE_BILL = gql`
   mutation Mutation($billId: ID!) {
      deleteBill(billId: $billId) {
         id
      }
   }
`;

const UPDATE_BILL = gql`
   mutation Mutation($billId: ID!, $billInput: BillUpdateInput) {
      updateBill(billId: $billId, billInput: $billInput) {
         id
      }
   }
`;


export {ADD_BILL, DELETE_BILL, UPDATE_BILL};