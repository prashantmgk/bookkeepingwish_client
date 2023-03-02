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

const DELETE_MEMBERSHIP = gql`
mutation Mutation($membershipId: ID!) {
  deleteMembership(membershipId: $membershipId) {
    id
  }
}
`

const UPDATE_MEMBERSHIP = gql`
mutation Mutation($membershipId: ID!, $membershipInput: MembershipUpdateInput) {
  updateMembership(membershipId: $membershipId, membershipInput: $membershipInput) {
    id
  }
}
`

export {ADD_MEMBERSHIP, DELETE_MEMBERSHIP, UPDATE_MEMBERSHIP};