import React from 'react';

const PhoneInput = ({ input, label, errors }) => {
    return (
      <div className="form-row" key={input.id}>
        <label htmlFor={input.id}>
          {label} {input.required && <span>*</span>}
        </label>
        <Field component="select" name={input.id}>
          {PhoneCodes.map(country => {
            return (
              <option value={country.callingCode} key={country.code}>
                +{country.callingCode}
              </option>
            );
          })}
        </Field>
         {/* ADD PHONE FIELD */}
        {errors[input.id] && (
          <div className="error-message">{errors[input.id]}</div>
        )}
      </div>
    );
}
 
export default PhoneInput;