import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import Description from './Description';

function CostRow({ name, amount, description, method_name, formatName, forceMethod }) {
  return (
    <tr>
      <td>
        {formatName ? <FormattedMessage id={name} /> : name}
        {description && (
          <>
            {' '}
            <Description description={description} />
          </>
        )}
      </td>

      <td className="price">
        {amount && amount > 0 ? (
          <>
            €{' '}
            <FormattedNumber
              value={amount}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
            {forceMethod && (<>{' '}{method_name}</>)}
          </>
        ) : (
          <>{method_name}</>
        )}
      </td>
    </tr>
  );
}

CostRow.defaultValues = {
  formatName: false,
  forceMethod: false,
};

export default CostRow;
