describe('Create booking', () => {
  before(() => {
    cy.visit('/calendar.html')
    cy.get('div.col.cell.arrival').first()
      .click()


    cy.get('div.col.cell.departure').first()
      .click()

    cy.get('.calendar--picker > .button').click()
  })

  it('Create booking', () => {
    cy.get(':nth-child(1) > :nth-child(3) > select').select('6');
    cy.get(':nth-child(4) > select').select('3');
    cy.get(':nth-child(1) > :nth-child(3) > select').select('6');
    cy.get(':nth-child(4) > select').select('3');
    
    expect(cy.get('.error-message.persons')).to.exist
    
    cy.get(':nth-child(1) > :nth-child(3) > select').select('1');
    
    cy.get('.error-message.persons').should('not.exist')
    
  })

  it('Create booking simple', () => {
    cy.get(':nth-child(1) > :nth-child(3) > select').select('1');
    
    
    cy.get('.error-message.persons').should('not.exist')

    
    cy.get('input[name=first_name]').type('Test')
    cy.get('input[name=last_name]').type('Test')
    cy.get('input[name=mobile]').type('0612345678')
    cy.get('input[name=address]').type('Straat')
    cy.get('input[name=house_number]').type('1')
    cy.get('input[name=email]').type('test@bukazu.com')
    
  })

  it('Validate cancel insurance', () => {
    cy.get('select[name=cancel_insurance]').select('0');
    
    cy.get('.insurances > input[type=date]').should('not.exist')

    cy.get('select[name=cancel_insurance]').select('1');
    
    expect(cy.get('#insurances > input[type=date]')).to.exist

    
  })

  it('Create booking on invalid booking form', () => {
    cy.visit('/invalid-calendar.html')
    cy.get('div.col.cell.arrival').first()
      .click()


    cy.get('div.col.cell.departure').first()
      .click()

    cy.get('.calendar--picker > .button').click()

    cy.get(':nth-child(1) > :nth-child(3) > select').select('6');


    cy.get(':nth-child(3) > .form-row > select').select('0');
    cy.get(':nth-child(5) > :nth-child(2) > input').clear();
    cy.get(':nth-child(5) > :nth-child(2) > input').type('Test');
    cy.get(':nth-child(3) > input').clear();
    cy.get(':nth-child(3) > input').type('test@example.com');

    cy.get('.button').click()

    expect(cy.get('.bukazu-modal .bukazu-error-message')).to.exist
  })

})
