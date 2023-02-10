import { gql } from "@apollo/client";

const GET_INVESTORS = gql`
query Query {
  newInvestors {
    name
    totalCapital
    id
  }
}
`

const GET_PROMOTERS_CAPITAL_BY_NAME = gql`
query Query($name: String!) {
  getPromotersCapitalByName(name: $name) {
    id
    name
    date
    paidCapital
    paymentMethod
    accountOrBank
    remainingCapital
    capitalPercentage
  }
}
`

const GET_INVESTOR_BY_NAME = gql`
query Query($name: String!) {
  getNewInvestorByName(name: $name) {
    id
    name
    totalCapital
  }
}
`

const GET_PROMOTERS_CAPITAL_TILL_NOW = gql`
query Query($name: String!) {
  getPromotersPaidCapitalTillNowByName(name: $name)
}
`
export { GET_INVESTORS, GET_PROMOTERS_CAPITAL_BY_NAME, GET_PROMOTERS_CAPITAL_TILL_NOW, GET_INVESTOR_BY_NAME}
