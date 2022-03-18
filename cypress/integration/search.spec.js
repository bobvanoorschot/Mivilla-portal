describe('Filtering objects', () => {
  before(() => {
    cy.visit('/')
  })

  it('Filter countries', () => {
    cy.get('#countries > ul.radioList > li.bu-open').should('have.length', 6)
    cy.get(':nth-child(2) > .radioList > :nth-child(1) input')
      .click()
    cy.get('#regions > ul.radioList > li.bu-open').should('have.length', 3)
    cy.get('#countries > ul.radioList > li.bu-open').should('have.length', 6)

    cy.get('.filters-reload')
      .click()
  })

  it('Go next page in paginator', () => {
    cy.get(':nth-child(1) > .bu-pagination > :nth-child(4)')
      .click()
    cy.get(':nth-child(1) > .bu-pagination > :nth-child(6)')
      .click()
    cy.get(':nth-child(1) > .bu-pagination > :nth-child(1)')
      .click()
  })
})
