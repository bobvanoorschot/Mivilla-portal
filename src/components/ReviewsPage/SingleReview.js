import React, { memo } from 'react';
import Score from './Score';

function SingleReview({ review }) {
  return (
    <div className="bu_single_review">
      <div className='bu_review_summary'>
        <Score rating={review.score} />
        <div className='bu_review_summary__date_name'>
          <div>{review.createdAt},&nbsp;</div>
          <div className='bu_review_summary__name'>{review.name}</div>
        </div>
      </div>
      <blockquote className="bu_review">{review.review}</blockquote>
      <div className="bu_criteria">
        {review.reviewCriteria.map((crit) => (
          <Score rating={crit.score} name={crit.name} key={crit.id} />
        ))}
      </div>
    </div>
  );
}

export default memo(SingleReview);
