import React from "react";
import { FormattedMessage } from "react-intl";
import format from "../../../_lib/format";

const dateFormat = "dddd DD MMMM YYYY";

const AssistanceMessage = ({ arrivalDate, departureDate, house }) => {

  if (departureDate.date) {
    return (
      <div className="assistance">
        <FormattedMessage id={`${house.house_type}.you_picked_arrival_date`} />:{" "}
        {format(arrivalDate.date, dateFormat)}
        <br />
        <FormattedMessage
          id={`${house.house_type}.you_picked_departure_date`}
        />
        : {format(departureDate.date, dateFormat)}
      </div>
    );
  }

  if (arrivalDate.date) {
    return (
      <div className="assistance">
        <FormattedMessage id={`${house.house_type}.you_picked_arrival_date`} />:{" "}
        {format(arrivalDate.date, dateFormat)}
        <br />
        <FormattedMessage
          id={`${house.house_type}.pick_your_departure_in_the_calendar`}
        />
      </div>
    );
  }

  return (
    <div className="assistance">
      <FormattedMessage
        id={`${house.house_type}.pick_your_arrivaldate_in_the_calendar`}
      />
    </div>
  );
};

export default AssistanceMessage;
