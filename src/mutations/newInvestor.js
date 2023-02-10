import { gql } from "@apollo/client";

const ADD_NEW_INVESTOR = gql`
mutation Mutation($newInvestorInput: NewInvestorInput) {
  addNewInvestor(newInvestorInput: $newInvestorInput) {
    name
    totalCapital
  }
}
`
export {ADD_NEW_INVESTOR};
