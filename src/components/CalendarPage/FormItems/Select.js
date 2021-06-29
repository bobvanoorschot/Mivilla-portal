import React from 'react';
import { useField } from 'formik';
import { FormattedMessage } from 'react-intl';

export default function Select({ label, description, options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="form-row inline" id={`bukazu_form_${props.name}`}>
      <label htmlFor={props.name}>
        <FormattedMessage id={label} />
      </label>
      <select {...field} {...props}>
        {options.map((opt) => {
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
