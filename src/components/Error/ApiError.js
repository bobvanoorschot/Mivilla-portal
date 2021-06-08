import React from 'react'
import Modal from '../CalendarPage/formParts/Modal'

function ApiError(errors, modal = false) {
  const errorMessage  = (
    <div>

<h2>
                    <FormattedMessage id="something_went_wrong_please_try_again" />

                    </h2>
                    <ul>
                    {errors.graphQLErrors.map(err => (
                      <li>
                        {err.message}
                      </li>
                    ))}
                    </ul>
                    </div>
  )
  if (modal) {

    return (
      <Modal show={true}>
                    
{errorMessage}
                  </Modal>
  )

  return errorMessage
}
}

export default ApiError