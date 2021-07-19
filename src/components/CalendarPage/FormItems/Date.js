import React from 'react';
import { useField, Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

export default function Date({ label, description, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  const { setValue } = helpers;
  console.log({ helpers });

  let tempval;
  if (field.value === '' || !field.value) {
    tempval = null;
  } else {
    tempval = new Date(field.value);
  }

  return (
    <div className="form-row inline" id={`bukazu_form_${props.name}`}>
      <label htmlFor={props.name}>
        <FormattedMessage id={label} />
      </label>
      {/* <Field name={props.name} component={DateField}></Field> */}
      <DatePicker
        {...field}
        {...props}
        selected={tempval}
        onChange={(e) => setValue(format(e, 'YYYY-MM-DD'))}
      />
      {description}
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
}

function DateField({ field, form: { touched, errors }, ...props }) {
  return (
    <div>
      <DatePicker value={field.value} onChange={(e) => onChange()} />
    </div>
  );
}
