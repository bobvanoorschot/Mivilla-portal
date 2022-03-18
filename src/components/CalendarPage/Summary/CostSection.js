import React from 'react';

export default function CostSection({ children }) {
  return (
    <div className="costs-section">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
