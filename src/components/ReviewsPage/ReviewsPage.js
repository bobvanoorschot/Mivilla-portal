import { useQuery } from '@apollo/client';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { REVIEWS_QUERY } from './Queries';
import Score from './Score';
import SingleReview from './SingleReview';

function ReviewsPage({ PortalSite, objectCode }) {
  const { data, error, loading } = useQuery(REVIEWS_QUERY, { variables: { id: PortalSite.portal_code, house_id: objectCode } });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const house = data.PortalSite.houses[0]
  const reviews = house.reviews

  return <div className='bu_reviews'>
      <div className='bu_reviews__overview'>
        <Score rating={house.rating} /><div className='bu_reviews__overview__number'>{house.scoreAmount} <FormattedMessage id='reviews' /></div>
      </div>
      {reviews.map(review => {
        return (
            <SingleReview review={review} key={review.id} />
        )
      })}
  </div>;
}

export default ReviewsPage;
