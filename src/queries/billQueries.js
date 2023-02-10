import {gql} from '@apollo/client';

const GET_BILLS_BY_CATEGORY = gql`
   query Query($category: String!) {
      getBillsByCategory(category: $category) {
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
   query Query($billsType: String!) {
      getBillsByType(billsType: $billsType) {
         id
         date
         particular
         quantity
         vendor
         rate
         remarks
         category
         total
      }
   }
`

export {GET_BILLS_BY_CATEGORY, GET_BILLS_BY_TYPE}
