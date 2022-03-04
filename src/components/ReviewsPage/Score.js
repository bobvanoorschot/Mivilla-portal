import React from "react";

function Score({ rating, name }) {
  let color = 'low'
  if (rating > 7) {
    color = 'best'
  } else if (rating > 6) {
    color = 'good'
  } else if (rating > 4) {
    color = 'medium'
  }
  return <div className="bu_score">
    <div className={`bu_score__rating ${color}`}>{rating.toFixed(1)} /10</div>
    <div>{name}</div>
  </div>
}

export default Score