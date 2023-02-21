import { gql } from "@apollo/client";

const ADD_GEAR_SALES_ENTRY = gql`
   mutation Mutation($gearSalesInput: GearSalesInput) {
      addGearSales(gearSalesInput: $gearSalesInput) {
         date
         item
         quantity
         rate
         amount
         remarks
      }
   }
`

const DELETE_GEAR_SALES_ENTRY = gql`
mutation Mutation($gearSalesId: ID!) {
  deleteGearSales(gearSalesId: $gearSalesId) {
    id
  }
}
`

export { ADD_GEAR_SALES_ENTRY, DELETE_GEAR_SALES_ENTRY};

