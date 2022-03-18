import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

function DateField({ label, description, options, name, inline }) {
  return (
    <Field name={name}>
      {({ field, meta, form }) => {
        const { value, name } = field;

        let tempval;
        if (value === '' || !value) {
          tempval = null;
        } else {
          tempval = new Date(value);
        }

        return (
          <div
            className={`form-row ${inline && 'inline'}`}
            id={`bukazu_form_${name}`}
          >
            <label htmlFor={name}>
              <FormattedMessage id={label} />
            </label>
            <DatePicker
              className="bukazu-date-picker"
              name={name}
              format="dd-MM-y"
              value={tempval}
              onChange={(e) => {
                field.onChange(format(e, 'YYYY-MM-DD'));
                form.setFieldValue(name, format(e, 'YYYY-MM-DD'));
              }}
            />
            <span className="bu-input-description">{description}</span>
            {meta.touched && meta.error && (
              <div className="error-message">{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
}

DateField.defaultValues = {
  inline: true,
};

export default DateField;
