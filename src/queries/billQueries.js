import {gql} from '@apollo/client';

const GET_BILLS_BY_CATEGORY = gql`
   query Query($category: String!, $fiscalYear: String!) {
      getBillsByCategory(category: $category, fiscalYear: $fiscalYear) {
         id
         date
         particular
         vendor
         quantity
         rate
         remarks
         total
      }
   }
`

const GET_BILLS_BY_TYPE = gql`
query Query($billsType: String!, $fiscalYear: String!) {
  getBillsByType(billsType: $billsType, fiscalYear: $fiscalYear) {
    vendor
    remarks
    total
    rate
    quantity
    particular
    panNumber
    id
    date
    category
    billsType
  }
}
`

export {GET_BILLS_BY_CATEGORY, GET_BILLS_BY_TYPE}
