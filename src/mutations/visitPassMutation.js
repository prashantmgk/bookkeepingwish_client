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

const DELETE_VISIT_PASS = gql`
mutation Mutation($visitPassId: ID!) {
  deleteVisitPass(visitPassId: $visitPassId) {
    id
  }
}
`

export { ADD_VISIT_PASS, DELETE_VISIT_PASS };