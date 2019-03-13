import React from "react";
import { FormattedMessage as FM } from "react-intl";

const DamageInsurance = () => (
  <React.Fragment>
    <h2>
      <FM id="damage_insurance" />
    </h2>
    <hr />
    <p>
      <FM id="travel_insurance_desc" />
    </p>

    <h3>
      <FM id="travel_ins_begin_end" />
    </h3>
    <ul>
      <li>
        <FM id="24_hour_help" />
      </li>
      <li>
        <FM id="quick_bagage_help" />
      </li>
      <li>
        <FM id="legal_aid" />
      </li>
      <li>
        <FM id="no_own_risk" />
      </li>
      <li>
        <FM id="2_years_bagage" />
      </li>
      <li>
        <FM id="incl_help_coverage" />
      </li>
    </ul>

    <h3>
      <FM id="terms_and_costs" />
    </h3>

    <p>
      <FM id="228_ppd" />
    </p>
    <h3>
      <FM id="remark" />
    </h3>

    <p>
      <FM id="optimal" />
    </p>
    <p>
      <FM id="more_information" />
    </p>
    <a
      href="http://bukazu.com/insurances/nl/Voorwaarden%20Annuleringsverzekering.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FM id="show_terms" />
    </a>

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

export default DamageInsurance;
