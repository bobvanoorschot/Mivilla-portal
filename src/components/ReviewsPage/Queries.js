import { gql } from "@apollo/client";

export const REVIEWS_QUERY = gql`
         query ReviewPortalSiteQuery(
           $id: ID!
           $house_id: String!
         ) {
           PortalSite(id: $id) {
             houses(house_code: $house_id) {
               id
               name
               rating
               scoreAmount
               reviews {
                 id
                 name
                 review
                 score
                 createdAt
                 reviewCriteria {
                   id
                   name
                   score
                 }
               }
             }
           }
         }
       `;