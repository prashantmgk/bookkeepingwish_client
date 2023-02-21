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

export {ADD_PROMOTERS_CAPITAL, DELETE_PROMOTERS_CAPITAL};