import React from 'react';
import { mount } from '@cypress/react';
import SafeBooking from '../SafeBooking';

it('renders learn react link', () => {
  mount(<SafeBooking />);
  cy.get('a').contains('Learn React');
});