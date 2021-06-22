import React from 'react';

const FormItem = ({ label, name, description }) => {
  <div className="form-row inline" id={`bukazu_form_${name}`}>
    <label htmlFor={name}>
      <FormattedMessage id={label} />
    </label>
    <Field component="select" name={name}>
      {adults.map((opt) => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </Field>
    <div className="age-description">
      <FormattedMessage
        id="adults_from"
        defaultMessage="> {age}"
        values={{
          age: options.bookingForm
            ? options.bookingForm.adults_from || '18'
            : '18',
        }}
      />
    </div>
    {errors.adults && touched.adults && (
      <div className="error-message">{errors.adults}</div>
    )}
  </div>;
};
