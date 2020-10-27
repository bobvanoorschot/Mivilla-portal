import React from "react";
import { FormattedMessage } from "react-intl";
import { useFormikContext } from "formik";

function DiscountCode() {

  const { values } = useFormikContext();

  console.log({ values });

  return (
    <div className="form-row">
      <label htmlFor="discount_code">
        <FormattedMessage id="discount_code" />
      </label>
    </div>
  );
}

export default DiscountCode;