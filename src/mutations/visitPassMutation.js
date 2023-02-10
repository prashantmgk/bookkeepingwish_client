import { gql } from "@apollo/client";

const ADD_VISIT_PASS = gql`
   mutation Mutation($visitorPassInput: VisitPassInput) {
      addVisitPass(visitorPassInput: $visitorPassInput) {
         name
         date
         category
         charge
         expiryDate
         remarks
      }
   }
`

export { ADD_VISIT_PASS };