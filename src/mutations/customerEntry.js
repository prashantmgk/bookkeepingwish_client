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

const UPDATE_CUSTOMER_ENTRY = gql`
mutation UpdateCustomerEntry($customerEntryId: ID!, $customerEntryInput: CustomerEntryUpdateInput) {
  updateCustomerEntry(customerEntryId: $customerEntryId, customerEntryInput: $customerEntryInput) {
    id
  }
}
`  

export {ADD_CUSTOMER_ENTRY, DELETE_CUSTOMER_ENTRY, UPDATE_CUSTOMER_ENTRY};