import React from "react";

import BookingOrOption from "../formParts/BookingOrOption";
import CostSummary from "./CostSummary";
import { Object } from "./Object";


function Summary({ values, house, locale }) {
  return (
    <div>
      <Object house={house} values={values} />
      <BookingOrOption house={house} />
      <CostSummary values={values} house={house} locale={locale} />
    </div>
  )
}

export default Summary;