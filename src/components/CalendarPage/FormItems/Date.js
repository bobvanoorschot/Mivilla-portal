import React from 'react';
import { useField } from 'formik';
import { FormattedMessage } from 'react-intl';

export default function Date({ label, description, options, ...props }) {
  const [field, meta, helpers] = useField(props);


  return (
    <div className="form-row inline" id={`bukazu_form_${props.name}`}>
      <label htmlFor={props.name}>
        <FormattedMessage id={label} />
      </label>
      <input
        {...field}
        type='date'
      />

      {description}
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
}
