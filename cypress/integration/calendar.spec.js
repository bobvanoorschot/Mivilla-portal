describe('Show calendar', () => {
  before(() => {
    cy.visit('/calendar.html')
  })

  it('Click arrival date', () => {
    cy.get('.calendar--picker > .button').should('be.disabled')

    cy.get('div.col.cell.arrival').first()
      .click()
      .should('have.class', 'selected')

    cy.get('.calendar--picker > .button').should('be.disabled')

    cy.get('div.col.cell.departure').first()
      .click()
      .should('have.class', 'selected')

    cy.get('.calendar--picker > .button').should('not.be.disabled')
  })
})
