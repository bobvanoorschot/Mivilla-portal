import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Mutation } from 'react-apollo';
import { CREATE_BOOKING_MUTATION } from '../../_lib/queries';
import { Insurances } from './formParts/insurances';
import Discount from './formParts/discount';
import Summary from './Summary';
import Modal from '../Modal';
import DefaultBookingFields from './formParts/DefaultBookingFields';
import SuccessMessage from './formParts/SuccessMessage';
import { OptionalBookingFields } from './formParts/OptionalBookingFields';
import includes from 'array-includes';
import { ApiError } from '../Error';
import {
  initializeBookingFields,
  byString,
  validateAge,
} from './formParts/BookingHelpers';
import OptionalCosts from './formParts/OptionalCosts';
import Guests from './formParts/Guests';
class FormCreator extends React.Component {
  state = {
    formSubmit: false,
    bookingFields: this.props.options.bookingFields || DefaultBookingFields,
  };

  validate = (values) => {
    const { babies_extra, persons } = this.props.house;

    let errors = {};

    let babies = Number(values.babies) - Number(babies_extra);
    if (babies < 0) {
      babies = 0;
    }
    values.persons = Number(values.children) + Number(values.adults) + babies;

    for (let field of this.state.bookingFields) {
      if (field.required) {
        const validateValue = byString(values, field.id);

        if (!validateValue || validateValue === '') {
          errors[field.id] = <FormattedMessage id="required" />;
        }
      }
    }

    if (values.adults < 1) {
      errors.adults = <FormattedMessage id="at_least_1_adult" />;
    }
    if (Number(values.discount) > 0 && !values.discount_reason) {
      errors.discount_reason = (
        <FormattedMessage id="you_need_to_give_reason" />
      );
    }
    if (values.persons > persons) {
      errors.max_persons = <FormattedMessage id="max_persons_reached" />;
    }

    if (
      values.cancel_insurance !== 0 &&
      validateAge(values.extra_fields?.date_of_birth)
    ) {
      errors['extra_fields.date_of_birth'] = (
        <FormattedMessage id="at_least_18y_old" />
      );
      errors['insurances'] = (
        <FormattedMessage id="at_least_18y_old" />
      );
    }

    if (
      values.cancel_insurance !== 0 &&
      !includes(['nl', 'de', 'be'], values.country)
    ) {
      errors['insurances'] = (
        <FormattedMessage id="can_only_take_insurance_in_de_be_nl" />
      );
      errors['country'] = (
        <FormattedMessage id="can_only_take_insurance_in_de_be_nl" />
      );
    }

    return errors;
  };

  render() {
    const { bookingFields } = this.state;

    const { house, locale, PortalSite, options, booking } = this.props;
    const bookingPrice = house.booking_price;

    let costs = {};

    for (const val of bookingPrice.optional_house_costs) {
      costs[val.id] = '0';
    }

    const optBookingFieldsInitialized = initializeBookingFields(bookingFields);

    return (
      <Mutation mutation={CREATE_BOOKING_MUTATION}>
        {(createBooking, { loading, error, data }) => (
          <Formik
            validate={this.validate}
            initialValues={{
              ...booking,
              ...optBookingFieldsInitialized,
              costs,
              adults: booking.persons,
              children: 0,
              babies: 0,
              persons: 2,
              discount: 0,
              country: 'nl',
            }}
            onSubmit={(values, { setSubmitting }) => {
              let variables = {
                first_name: values.first_name,
                preposition: values.preposition,
                last_name: values.last_name,
                company_name: values.company_name,
                is_option: JSON.parse(values.is_option),
                address: values.address || '',
                zipcode: values.zipcode || '',
                city: values.city || '',
                phone: values.phone || '',
                phone_mobile: values.phone_mobile || '',
                email: values.email,
                house_code: values.objectCode,
                portal_code: values.portalCode,
                comment: values.comment || '',
                language: locale,
                locale: locale,
                country: values.country.toUpperCase(),
                adults: Number(values.adults),
                children: Number(values.children) || 0,
                babies: Number(values.babies) || 0,
                discount: Number(values.discount) || 0,
                damage_insurance: Number(values.damage_insurance) || 0,
                cancel_insurance: Number(values.cancel_insurance) || 0,
                travel_insurance: Number(values.travel_insurance) || 0,
                discount_reason: values.discount_reason || '',
                arrival_date: values.arrivalDate.date,
                departure_date: values.departureDate.date,
                costs: JSON.stringify(values.costs),
                extra_fields: JSON.stringify(values.extra_fields),
              };

              createBooking({ variables })
                .then(() => {
                  if (
                    options.bookingForm &&
                    options.bookingForm.redirectUrl &&
                    options.bookingForm.redirectUrl !== ''
                  ) {
                    window.location = options.bookingForm.redirectUrl;
                  } else {
                    setTimeout(() => {
                      this.props.onReturn();
                    }, 15000);
                  }
                })
                .catch((err) => {});
            }}
            render={({ errors, touched, values, status, isSubmitting }) => (
              <Form className="form">
                {loading && <div className="return-message">Loading...</div>}
                {error && (
                  <Modal show={true}>
                    <ApiError errors={error} modal={true} />
                  </Modal>
                )}
                {data && (
                  <Modal show={true}>
                    <SuccessMessage />
                  </Modal>
                )}

                <div className="form-content">
                  <div className="form-section">
                    <a
                      className="return-link"
                      role="link"
                      tabIndex={0}
                      onKeyPress={() => {
                        this.props.onReturn();
                      }}
                      onClick={() => {
                        this.props.onReturn();
                      }}
                    >
                      <FormattedMessage id="return_to_calendar" />
                    </a>
                    <h2>
                      <FormattedMessage id="stay_details" />
                    </h2>
                    <Guests options={options} house={house} />

                    {errors.max_persons && (
                      <div className="error-message persons">
                        {errors.max_persons}
                      </div>
                    )}
                  </div>
                  <Discount errors={errors} house={house} />

                  <Insurances house={house} values={values} />

                  <OptionalCosts costs={bookingPrice.optional_house_costs} />

                  <OptionalBookingFields
                    bookingFields={this.state.bookingFields}
                    errors={errors}
                    touched={touched}
                    PortalSite={PortalSite}
                  />
                </div>

                <div className="form-sum">                 
                  <Summary house={house} values={values} />
                  {status && status.msg && <div>{status.msg}</div>}
                  <div className="terms">
                    <FormattedMessage id="agree_with" />{' '}
                    <FormattedMessage id="terms">
                      {(fm) => (
                        <Modal buttonText={fm}>
                          <div
                            style={{
                              width: '90vh',
                              height: '90vh',
                            }}
                          >
                            <iframe
                              src={house.rental_terms}
                              width="100%"
                              height="100%"
                              title="Terms"
                              frameBorder="0"
                            />
                          </div>
                        </Modal>
                      )}
                    </FormattedMessage>
                  </div>
                  {includes([1, 2], Number(values.cancel_insurance)) ? (
                    <div className="terms">
                      <FormattedMessage id="comply_insurance_card" />
                    </div>
                  ) : null}
                  <button
                    className="button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <FormattedMessage id="book" />
                  </button>
                </div>
              </Form>
            )}
          />
        )}
      </Mutation>
    );
  }
}

FormCreator.propTypes = {
  house: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  booking: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired,
};

export default FormCreator;
