import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import format from '../../../_lib/format';

export const Object = ({ house, values }) => {
  const { arrivalDate, departureDate } = values
  console.log({ values });
  return (
  <React.Fragment>
    <h2>
      <FormattedMessage id="booking_details" />
    </h2>
    <div className="house-details">
      <div>{house.name}</div>
      <img src={house.image_url} alt="" />
      <table>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id={`${house.house_type}.arrival`} />
            </th>
            <td className="price">
              {format(arrivalDate.date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{arrivalDate.arrival_time_from} - {arrivalDate.arrival_time_to}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id={`${house.house_type}.departure`} />
            </th>
            <td className="price">
              {format(departureDate.date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{departureDate.departure_time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </React.Fragment>
)};

Object.propTypes = {
  house: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};
