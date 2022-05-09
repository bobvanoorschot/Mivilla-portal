import React from 'react';

export default function IntegrationError({
  portalCode,
  pageType,
  locale,
  filters,
}) {
  let errors = [];

  if (!portalCode) {
    let message = 'No portal code is specified, so portal is not working';
    console.error(message);
    errors.push(message);
  }
  
  if (pageType && pageType !== 'reviews') {
    let message = `'${pageType}' is not a valid page`;
    console.error(message);
    errors.push(message);
  }
  
  if (!locale) {
    console.warn('No locale is set default to English');
  } else {
    if (!['nl', 'de', 'en', 'fr', 'it', 'es'].includes(locale)) {
      errors.push('Invalid locale');
    }
  }
  
  if (filters && !isObject(filters)) {
    let message = 'Filters variable is not an object';
    console.error(message, filters);
  }

  if (errors.length == 0) {
    return false;
  }

  return (
    <div>
      <h2>
       Something went wrong please try again      </h2>
      <ul>
        {errors.map((err) => (
          <li>{err}</li>
        ))}
      </ul>
    </div>
  );
}


const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};