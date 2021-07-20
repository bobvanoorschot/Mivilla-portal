import React from 'react';
import CostRow from './CostRow';
import OptionalOnSite from './OptionalOnSite';
import { FormattedMessage } from 'react-intl';

export default function OnSite({ prices }) {
  const { required_costs } = prices.total_costs;
  const { on_site } = required_costs;
  return (
    <div className="costs-section">
      <strong>
        <FormattedMessage id="costs_on_site" />
      </strong>
      <table>
        <tbody>
          {prices.required_house_costs.map((cost) => {
            if (cost.on_site && cost.gl !== '0120') {
              if (cost.method === 'none') {
                return (
                  <CostRow key={cost.id} {...cost} />
                );
              } else {
                let amount = on_site.find((x) => x.id == cost.id).amount
                return (
                  <CostRow key={cost.id} amount={amount} {...cost} />
                  
                );
              }
            }
          })}
          <OptionalOnSite prices={prices} />
        </tbody>
      </table>
    </div>
  );
}
