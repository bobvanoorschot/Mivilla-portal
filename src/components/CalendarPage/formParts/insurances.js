import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Field } from "formik";
import Modal from "./Modal";
import Icon from "../../icons/info.svg";
import CancelInsurance from "./CancelInsurance";

function translatedOption(id, value) {
  return (
    <FormattedMessage id={id}>
      {formattedMessage => <option value={value}>{formattedMessage}</option>}
    </FormattedMessage>
  );
}

function cancel_insurance(house) {
  if (house.cancel_insurance) {
    return (
      <div className="form-row inline">
        <label htmlFor="cancel_insurance">
          <FormattedMessage id="cancel_insurance" />
        </label>
        <Field component="select" name="cancel_insurance" required={true}>
          {translatedOption("choose", "")}
          {translatedOption("cancel_insurance_all_risk", 2)}
          {translatedOption("cancel_insurance_normal", 1)}
          {translatedOption("none", 0)}
        </Field>
        <Modal buttonText={<Icon />}>
          <CancelInsurance />
        </Modal>
      </div>
    );
  }
}

export const Insurances = ({ house }) => {
  if (house.cancel_insurance) {
    return (
      <div className="form-section">
        <h2>
          <FormattedMessage id="insurances" />
        </h2>
        {cancel_insurance(house)}
      </div>
    );
  } else {
    return <div />;
  }
};

Insurances.propTypes = {
  house: PropTypes.object.isRequired
};
