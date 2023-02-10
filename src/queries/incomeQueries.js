import { gql } from "@apollo/client";

const GET_CUSTOMER_ENTRIES = gql`
query Query {
  customerEntries {
    id
    date
    name
    wallCharge
    shoesRent
    belay
    harnessRent
    chalk
    rope
    total
    remarks
  }
}
`

const GET_VISIT_PASSES = gql`
query Query {
  visitPasses {
    id
    date
    name
    category
    charge
    expiryDate
    remarks
  }
}

`

const GET_MEMBERSHIPS = gql`
query Query {
  memberships {
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
query Query {
  gearSales {
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