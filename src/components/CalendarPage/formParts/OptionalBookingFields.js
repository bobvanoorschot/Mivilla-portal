import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormattedMessage } from "react-intl";
import { Countries } from "../../../_lib/countries";

export const OptionalBookingFields = ({
  bookingFields,
  errors,
  touched,
  PortalSite,
}) => (
  <div className="form-section">
    <h2>
      <FormattedMessage id="personal_details" />
    </h2>
    {bookingFields.map((input) => {
      if (input.id === "telephone") {
        input.id = "phonenumber";
      }
      if (input.type === "booking_field") {
        const bookingField = PortalSite.booking_fields.find(
          (x) => x.id === input.id
        );

        return (
          <div className="form-row" key={bookingField.id}>
            <label htmlFor={`extra_fields.booking_field_${bookingField.id}`}>
              {bookingField.label}
            </label>
            <Field
              id={`extra_fields.booking_field_${bookingField.id}`}
              type={bookingField.field_type}
              name={`extra_fields.booking_field_${bookingField.id}`}
            />
          </div>
        );
      } else if (input.id === "country") {
        return (
          <div className="form-row" key={input.id}>
            <label htmlFor={input.id}>
              {PortalSite[`${input.id}_label`]}{" "}
              {input.required && <span>*</span>}
            </label>
            <Field component="select" name={input.id}>
              {Countries[window.__localeId__].map((country) => {
                return (
                  <option value={country.alpha2} key={country.alpha2}>
                    {country.name}
                  </option>
                );
              })}
            </Field>
            {errors[input.id] && (
              <div className="error-message">{errors[input.id]}</div>
            )}
          </div>
        );
      } else {
        return (
          <div className="form-row" key={input.id}>
            <label
              htmlFor={input.id}
              name={`${input.id.replace(/\./g, "_")}_label`}
            >
              {PortalSite[`${input.id.replace(/\./g, "_")}_label`]}{" "}
              {input.required && <span>*</span>}
            </label>
            <Field type={input.type} name={input.id} />
            {errors[input.id] && touched[input.id] && (
              <div className="error-message">{errors[input.id]}</div>
            )}
          </div>
        );
      }
    })}
  </div>
);

OptionalBookingFields.propTypes = {
  bookingFields: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
};
