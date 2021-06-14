import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import format from '../../../_lib/format';
import { Query } from 'react-apollo';
import { ApiError } from '../../Error';

export const Summary = ({ house, bookingPrice }) => (
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
              {format(bookingPrice.arrival_date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{bookingPrice.arrival_time}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id={`${house.house_type}.departure`} />
            </th>
            <td className="price">
              {format(bookingPrice.departure_date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{bookingPrice.departure_time}</td>
          </tr>
        </tbody>
      </table>
      <Query query={query}>
        {({ loading, error, data}) => {
          if (loading) return <div>Loading...</div>
          if (error) return <ApiError errors={error} />

          return (
            <div>Costs summary</div>
          )
        }}
      </Query>
    </div>
  </React.Fragment>
);

Summary.propTypes = {
  house: PropTypes.object.isRequired,
  bookingPrice: PropTypes.object.isRequired,
};
