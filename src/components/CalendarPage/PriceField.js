import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../icons/loading.svg';
import format from '../../_lib/format';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { createPeronsArray } from './formParts/BookingHelpers';
import { ApiError } from '../Error';

const dateFormat = 'dddd DD MMMM YYYY';

export const CALENDAR_QUERY = gql`
  query BookingPriceQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
    $persons: Int
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        booking_price(
          starts_at: $starts_at
          ends_at: $ends_at
          persons: $persons
        )
      }
    }
  }
`;

class PriceField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: 2,
    };
  }

  changePersons = (e) => {
    this.setState({ persons: e.target.value });
  };

  render() {
    const {
      portalCode,
      objectCode,
      startsAt,
      endsAt,
      locale,
      house,
      disabled,
    } = this.props;
    const { persons } = this.state;

    let adults = createPeronsArray(house.persons);

    return (
      <div className="calendar--picker">
        <div className="calendar--picker--date">
          <span className="name">
            <FormattedMessage id={`${house.house_type}.arrival`} />
          </span>
          <span className="detail">
            {startsAt ? (
              <span>{format(startsAt, dateFormat)}</span>
            ) : (
              <FormattedMessage
                id={`${house.house_type}.pick_your_arrivaldate_in_the_calendar`}
              />
            )}
          </span>
        </div>
        <div className="calendar--picker--date">
          <span className="name">
            <FormattedMessage id={`${house.house_type}.departure`} />
          </span>
          <span className="detail">
            {endsAt ? (
              <span>{format(endsAt, dateFormat)}</span>
            ) : (
              <FormattedMessage
                id={`${house.house_type}.pick_your_departure_in_the_calendar`}
              />
            )}
          </span>
        </div>
        <div className="calendar--picker--date">
          <span className="detail">
            <select
              className="calendar--picker--persons"
              value={persons}
              onChange={this.changePersons}
            >
              {adults.map((person) => (
                <FormattedMessage
                  id="persons"
                  key={person}
                  children={(text) => (
                    <option value={person} key={person}>
                      {person} {text}
                    </option>
                  )}
                />
              ))}
            </select>
          </span>
        </div>
        <div className="calendar--picker--date">
          {startsAt && endsAt && (
            <Query
              query={CALENDAR_QUERY}
              variables={{
                id: portalCode,
                house_id: objectCode,
                starts_at: startsAt,
                ends_at: endsAt,
                persons: parseInt(persons),
                locale: locale,
              }}
            >
              {({ loading, data, error }) => {
                if (loading)
                  return (
                    <div className="price-overview--build">
                      <Loading />
                    </div>
                  );
                if (error) {
                  return (
                    <div className="price-overview--build">
                      <ApiError errors={error}></ApiError>
                    </div>
                  );
                }
                const result = data.PortalSite.houses[0].booking_price;
                return (
                  <>
                    <div className="price-overview--book">
                      <div className="price">
                        €{' '}
                        <FormattedNumber
                          value={Math.round(result.total_price)}
                          minimumFractionDigits={2}
                          maximumFractionDigits={2}
                        />
                      </div>
                      <div>
                        <i>
                          <FormattedMessage
                            id="based_on_one_person"
                            values={{ persons }}
                          />
                        </i>
                      </div>
                    </div>
                  </>
                );
              }}
            </Query>
          )}
        </div>
        <button
          className="button"
          disabled={!disabled}
          onClick={() => {
            if (startsAt && endsAt) {
              this.props.onStartBooking('false', persons);
            }
          }}
        >
          <FormattedMessage id="calculate" />
        </button>
      </div>
    );
  }
}

PriceField.propTypes = {
  portalCode: PropTypes.string.isRequired,
  objectCode: PropTypes.string.isRequired,
  startsAt: PropTypes.string,
  endsAt: PropTypes.string,
  onStartBooking: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default PriceField;
