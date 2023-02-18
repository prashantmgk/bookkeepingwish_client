import { gql } from "@apollo/client";

const GET_CUSTOMER_ENTRIES = gql`
query Query ($fiscalYear: String!) {
  customerEntries(fiscalYear: $fiscalYear) {
    wallCharge
    shoesRent
    rope
    total
    remarks
    name
    id
    harnessRent
    date
    chalk
    belay
  }
}
`

const GET_VISIT_PASSES = gql`
query Query($fiscalYear: String!) {
  visitPasses(fiscalYear: $fiscalYear) {
    remarks
    name
    id
    expiryDate
    date
    charge
    category
  }
}

`

const GET_MEMBERSHIPS = gql`
query Query($fiscalYear: String!) {
  memberships (fiscalYear: $fiscalYear){
    id
    name
    date
    charge
    category
    expiryDate
    remarks
  }
}
`
const GET_GEAR_SALES = gql`
query Query ($fiscalYear: String!) {
  gearSales(fiscalYear: $fiscalYear) {
    id
    date
    item
    quantity
    amount
    rate
    remarks
  }
}
`

export {GET_CUSTOMER_ENTRIES, GET_VISIT_PASSES, GET_MEMBERSHIPS, GET_GEAR_SALES};