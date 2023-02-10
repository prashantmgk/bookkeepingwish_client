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
export {ADD_CUSTOMER_ENTRY};