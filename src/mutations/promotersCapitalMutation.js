import {gql} from '@apollo/client';

const ADD_PROMOTERS_CAPITAL = gql`
mutation Mutation($promotersCapitalInput: PromotersCapitalInput) {
  addPromotersCapital(promotersCapitalInput: $promotersCapitalInput) {
    date
    name
    paidCapital
    paymentMethod
    accountOrBank
    remainingCapital
    capitalPercentage
    totalCapital
  }
}
`

const DELETE_PROMOTERS_CAPITAL = gql`
mutation DeletePromotersCapital($promotersCapitalId: ID!) {
  deletePromotersCapital(promotersCapitalId: $promotersCapitalId) {
    id
  }
}
`

const UPDATE_PROMOTERS_CAPITAL = gql`
mutation Mutation($promotersCapitalId: ID!, $promotersCapitalInput: PromotersCapitalUpdateInput) {
  updatePromotersCapital(promotersCapitalId: $promotersCapitalId, promotersCapitalInput: $promotersCapitalInput) {
    id
  }
}
`

const UPDATE_PROMOTERS_CAPITAL_BY_NAME = gql`
mutation UpdatePromotersCapitalByName($name: String!, $promotersCapitalInput: PromotersCapitalUpdateInput) {
  updatePromotersCapitalByName(name: $name, promotersCapitalInput: $promotersCapitalInput) {
    name
  }
}
`

export {ADD_PROMOTERS_CAPITAL, DELETE_PROMOTERS_CAPITAL, UPDATE_PROMOTERS_CAPITAL, UPDATE_PROMOTERS_CAPITAL_BY_NAME};