import React from "react";

const Cost = ({ values, calculateCost, cost }) => {
  let val;
  
  if (cost.on_site) {
    if (cost.method === "none") {
      val = (
        <tr key={cost.id}>
          <td>
            {cost.name}
            {cost.description ? <span>{cost.description}</span> : null}
          </td>
          <td className="price">
            {cost.amount && cost.amount > 0 && (
              <span>
                €{" "}
                <FormattedNumber
                  value={cost.amount}
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                  />
              </span>
            )}
            {cost.method_name}
          </td>
        </tr>
      );
    } else {
      val = (
        <tr key={cost.id}>
          <td>
            {cost.name}
            {cost.description ? <div>{cost.description}</div> : null}
          </td>
          <td className="price">
            €{" "}
            <FormattedNumber
              value={calculateCost(cost, values)}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
          </td>
        </tr>
      );
    }
  }
  return val;
};

export default Cost;
