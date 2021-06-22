import React from 'react';
import { useField } from 'formik';
import { createPeronsArray } from '../formParts/BookingHelpers';
import { FormattedMessage } from 'react-intl';

export default function NumberSelect({ label, description, count, ...props }) {
  const numbers = createPeronsArray(count);
  const [field, meta, helpers] = useField(props);

  return (
    <div className="form-row inline" id={`bukazu_form_${props.name}`}>
      <label htmlFor={props.name}>
        <FormattedMessage id={label} />
      </label>
      <select {...field} {...props}>
        {numbers.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      {description}
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
}
