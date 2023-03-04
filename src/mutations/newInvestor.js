import { gql } from "@apollo/client";

const ADD_NEW_INVESTOR = gql`
mutation Mutation($newInvestorInput: NewInvestorInput) {
  addNewInvestor(newInvestorInput: $newInvestorInput) {
    name
    totalCapital
  }
}
`

const DELETE_INVESTOR = gql`
mutation Mutation($newInvestorId: ID!) {
  deleteNewInvestor(newInvestorId: $newInvestorId) {
    id
  }
}

`

const UPDATE_INVESTOR = gql`
mutation Mutation($newInvestorId: ID!, $newInvestorInput: NewInvestorUpdateInput) {
  updateNewInvestor(newInvestorId: $newInvestorId, newInvestorInput: $newInvestorInput) {
    id
  }
}
`

const DELETE_ALL_PROMOTERS_CAPITAL_BY_NAME = gql`
mutation DeleteAllPromotersCapitalByName($name: String!) {
  deleteAllPromotersCapitalByName(name: $name) {
    name
  }
}
`
export {ADD_NEW_INVESTOR, DELETE_INVESTOR, UPDATE_INVESTOR,DELETE_ALL_PROMOTERS_CAPITAL_BY_NAME};
