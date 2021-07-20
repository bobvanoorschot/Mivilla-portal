import React from 'react';

function DiscountCode() {
  return (
    <>
      <Field component="select" name="discount">
        {discounts.map((discount) => (
          <option value={discount} key={discount}>
            {discount}%
          </option>
        ))}
      </Field>
    </>
  )
}