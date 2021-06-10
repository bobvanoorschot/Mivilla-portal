import React from 'react';
import Modal from '../CalendarPage/formParts/Modal';

import { FormattedMessage } from 'react-intl';

function ApiError(errors, modal = false) {
  console.error({ errors });
  const errorMessage = (
    <div>
      <h2>
        <FormattedMessage id="something_went_wrong_please_try_again" />
      </h2>
      <ul>
        {errors.errors.graphQLErrors.map((err) => (
          <li>{err.message}</li>
        ))}
      </ul>
    </div>
  );
  if (modal == true) {
    return <Modal show={true}>{errorMessage}</Modal>;
  }

  return errorMessage;
}

ApiError.defaultProps = {
  modal: false,
};

export default ApiError;
