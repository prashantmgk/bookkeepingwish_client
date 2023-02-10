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
export {ADD_PROMOTERS_CAPITAL};