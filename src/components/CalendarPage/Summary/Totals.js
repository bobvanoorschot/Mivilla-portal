import React from 'react';
import CostRow from './CostRow';
import CostSection from './CostSection';
import { FormattedMessage, FormattedNumber } from 'react-intl';

function Totals({ prices }) {
  return (
    <>
      <CostSection>
        <tr>
          <th
            style={{
              textAlign: 'left',
              testTransform: 'capitalize',
            }}
          >
            <FormattedMessage id="total" />
          </th>
          <th className="price" style={{ fontSize: 18 }}>
            €{' '}
            <FormattedNumber
              value={prices.total_costs.sub_total}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
          </th>
        </tr>
      </CostSection>
      <CostSection>
        <Deposit
          cost_array={prices.required_house_costs}
          price_array={prices.total_costs.required_costs.on_site}
        />
        <Deposit
          cost_array={prices.required_house_costs}
          price_array={prices.total_costs.required_costs.not_on_site}
        />
        <Deposit
          cost_array={prices.optional_house_costs}
          price_array={prices.total_costs.optional_costs.on_site}
        />
        <Deposit
          cost_array={prices.optional_house_costs}
          price_array={prices.total_costs.optional_costs.not_on_site}
        />
      </CostSection>
      <CostSection>
        <tr>
          <th
            style={{
              textAlign: 'left',
              testTransform: 'capitalize',
            }}
          >
            <FormattedMessage id="total" />
          </th>
          <td className="price">
            €{' '}
            <FormattedNumber
              value={prices.total_costs.total_price}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
          </td>
        </tr>
      </CostSection>
    </>
  );
}

export default Totals;

function Deposit({ cost_array, price_array }) {
  return (
    <>
      {cost_array.map((cost) => {
        let price = price_array.find((x) => x.id == cost.id);
        if (cost.gl === '0120' && price?.amount > 0) {
          return <CostRow key={cost.id} {...cost} amount={price.amount} />;
        }
      })}
    </>
  );
}
