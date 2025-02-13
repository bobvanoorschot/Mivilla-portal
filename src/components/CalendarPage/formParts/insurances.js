import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import Modal from '../../Modal';
import Icon from '../../icons/info.svg';
import CancelInsuranceText from './CancelInsuranceText';
import { DateField } from '../FormItems';
import { translatedOption } from './BookingHelpers'

function cancelInsurance(house) {
  if (house.cancel_insurance) {
    return (
      <div className="form-row inline">
        <label htmlFor="cancel_insurance">
          <FormattedMessage id="cancel_insurance" />
        </label>
        <Field component="select" name="cancel_insurance" required={true}>
          {translatedOption('choose', '')}
          {translatedOption('cancel_insurance_all_risk', 2)}
          {translatedOption('cancel_insurance_normal', 1)}
          {translatedOption('none', 0)}
        </Field>
        <Modal buttonText={<Icon />}>
          <CancelInsuranceText />
        </Modal>
      </div>
    );
  }
}

export const Insurances = ({ house, values }) => {
  if (house.cancel_insurance) {
    return (
      <div className="form-section" id="insurances">
        <h2>
          <FormattedMessage id="insurances" />
        </h2>
        {cancelInsurance(house)}       
        {values.cancel_insurance && values.cancel_insurance !== '0' && (
          <DateField
            label="extra_fields.date_of_birth"
            name="extra_fields.date_of_birth"
            required="true"
            description={
              <FormattedMessage id="insurance_company_needs_date_of_birth" />
            }
          />
        )}
      </div>
    );
  } else {
    return <div />;
  }
};

Insurances.propTypes = {
  house: PropTypes.object.isRequired,
};
