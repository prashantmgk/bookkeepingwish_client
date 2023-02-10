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

export { ADD_GEAR_SALES_ENTRY };

