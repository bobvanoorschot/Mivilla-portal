import { gql}  from "@apollo/client";

export const BOOKING_PRICE_TOTAL_QUERY= gql`
  query BookingPriceTotalQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
    $persons: Int
    $costs: Json
    $cancel_insurance: Int
    $discount: Int
    $discount_code: String
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        booking_price(
          starts_at: $starts_at
          ends_at: $ends_at
          persons: $persons
          costs: $costs
          cancel_insurance: $cancel_insurance
          discount: $discount
          discount_code: $discount_code
        )
      }
    }
  }
`