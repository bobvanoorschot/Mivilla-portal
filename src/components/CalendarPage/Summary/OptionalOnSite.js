import React from 'react';
import CostRow from './CostRow';

export default function OptionalOnSite({ prices }) {
  const { optional_costs } = prices.total_costs;
  const { on_site } = optional_costs;
  return (
    <>
      {prices.optional_house_costs.map((cost) => {
        if (cost.on_site && cost.gl !== '0120') {
          if (cost.method === 'none') {
            return <CostRow key={cost.id} {...cost} />;
          } else if (cost.method === 'on_site') {
            if (on_site.find((x) => x.id == cost.id).nr_of_items > 0) {
              return (
                <CostRow
                  key={cost.id}
                  {...cost}
                  amount={cost.amount}
                  forceMethod={true}
                />
              );
            }
          } else {
            let amount = on_site.find((x) => x.id == cost.id).amount;
            if (amount > 0) {
              return <CostRow key={cost.id} {...cost} amount={amount} />;
            }
          }
        }
      })}
    </>
  );
}
