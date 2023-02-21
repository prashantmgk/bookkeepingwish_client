import {gql} from "@apollo/client";

const ADD_CUSTOMER_ENTRY = gql`
   mutation Mutation($customerEntryInput: CustomerEntryInput) {
      addCustomerEntry(customerEntryInput: $customerEntryInput) {
         date
         name
         wallCharge
         belay
         shoesRent
         total
         chalk
         harnessRent
         rope
         remarks
      }
   }
`
const DELETE_CUSTOMER_ENTRY = gql`
mutation Mutation($customerEntryId: ID!) {
   deleteCustomerEntry(customerEntryId: $customerEntryId) {
      id
   }
}
   
`

export {ADD_CUSTOMER_ENTRY, DELETE_CUSTOMER_ENTRY};