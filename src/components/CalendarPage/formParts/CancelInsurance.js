import React from 'react';
import { FormattedMessage as FM } from 'react-intl';

const LocalizedAttachment = {
  nl:
    "https://insurances.bukazu.com/nl/Voorwaarden%20Annuleringsverzekering.pdf",
  de:
    "https://insurances.bukazu.com/de/Bedingungen%20Reiseruecktrittsversicherung.pdf",
  en:
    "https://insurances.bukazu.com/en/Terms%20to%20Cancellation%20Insurance.pdf",
};

console.log({locle: window.__localeId__})

const CancelInsurance = () => (
  <React.Fragment>
    <h2>
      <FM id="cancel_insurance" />
    </h2>
    <hr />
    <p>
      <FM id="cancel_insurance_desc" />
    </p>
    <h3>
      <FM id="cancel_insurance_normal_long" />
    </h3>
    <p>
      <FM id="cancel_insurance_normal_desc" />
    </p>
    <h3>
      <FM id="cancel_insurance_all_risk_long" />
    </h3>
    <p>
      <FM id="cancel_insurance_all_risk_desc" />
    </p>

    <h3>
      <FM id="terms_and_costs" />
    </h3>
    <h4>
      <FM id="costs_normal_cancel_insurance" />
    </h4>
    <p>
      <FM id="666_costs" />
    </p>
    <h4>
      <FM id="costs_allrisk_cancel_insurance" />
    </h4>
    <p>
      <FM id="847_costs" />
    </p>
    <p>
      <FM id="more_information" />
    </p>
    <a
      href={LocalizedAttachment[window.__localeId__]}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FM id="show_terms" />
    </a>
    <h3>
      <FM id="terms" />
    </h3>
    <ul>
      <li>
        <FM id="9persons_9addresses" />
      </li>
      <li>
        <strong>
          <FM id="or" />
        </strong>
      </li>
      <li>
        <FM id="9persons_4addresses" />
      </li>
    </ul>

    <hr />
    <h2>
      <FM id="poliscosts" />
    </h2>
    <p>
      <FM id="poliscosts_are" />
    </p>

    <p>
      <FM id="youwillrecieve" />
    </p>
  </React.Fragment>
);

export default CancelInsurance;
