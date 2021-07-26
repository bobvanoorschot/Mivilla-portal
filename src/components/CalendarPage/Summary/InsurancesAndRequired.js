import React from 'react';
import CostRow from './CostRow';

export default function InsurancesAndRequired({ prices }) {
  const { insurances, required_costs } = prices.total_costs;
  const { not_on_site } = required_costs;
  return (
    <div className="costs-section">
      <table>
        <tbody>
          {insurances.cancel_insurance && (
            <>
              {Object.keys(insurances).map((key) => (
                <CostRow
                  name={key}
                  key={key}
                  formatName={true}
                  amount={insurances[key]}
                />
              ))}
            </>
          )}
          {prices.required_house_costs.map((cost) => {
            if (!cost.on_site && cost.gl !== '0120') {
              if (cost.method === 'none') {
                return <CostRow key={cost.id} {...cost} />;
              } else {
                if (cost.amount === 0) { return null; }
                return (
                  <CostRow
                    key={cost.id}
                    name={cost.name}
                    amount={not_on_site?.find((x) => x.id == cost.id).amount}
                  />
                );
              }
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
