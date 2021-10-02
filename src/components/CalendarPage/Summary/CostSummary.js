import React from 'react';
import { Query, useQuery } from '@apollo/client';
import InsurancesAndRequired from './InsurancesAndRequired';
import { BOOKING_PRICE_TOTAL_QUERY } from './Queries';
import RentAndDiscount from './RentAndDiscount';
import OptionalNotOnSite from './OptionalNotOnSite';
import OnSite from './OnSite';
import Totals from './Totals';

function CostSummary({ values }) {
  const { loading, error, data } = useQuery(BOOKING_PRICE_TOTAL_QUERY, {
    variables: {
      ...values,
      id: values.portalCode,
      house_id: values.objectCode,
      starts_at: JSON.stringify(values.arrivalDate.date),
      ends_at: JSON.stringify(values.departureDate.date),
      costs: JSON.stringify(values.costs),
      discount: Number(values.discount),
      cancel_insurance: Number(values.cancel_insurance),
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const prices = data.PortalSite.houses[0].booking_price;

  return (
    <>
      <RentAndDiscount prices={prices} />
      <InsurancesAndRequired prices={prices} />
      <OptionalNotOnSite prices={prices} />
      <OnSite prices={prices} />
      <Totals prices={prices} />
    </>
  );
}

export default CostSummary;
