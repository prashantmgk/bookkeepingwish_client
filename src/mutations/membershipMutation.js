import { gql } from "@apollo/client";

const ADD_MEMBERSHIP = gql`

   mutation Mutation($membershipInput: MembershipInput) {
      addMembership(membershipInput: $membershipInput) {
         date
         name
         category
         charge
         expiryDate
         remarks
      }
   }
`
export {ADD_MEMBERSHIP};