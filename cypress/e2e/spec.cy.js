/// <reference types="cypress" />
describe('testing localStorage', () => {
  it('works', () => {
    cy.visit('https://example.cypress.io')
  })

  it('should set then read localStorage', () => {
    cy.visit('https://example.cypress.io', {
          onBeforeLoad(win) {
              win.localStorage.setItem('key', 'value')
          },
      })
      cy.window().its('localStorage', { timeout: 5000 }).should('have.property', 'key')
      cy.getAllLocalStorage().then((result) => {
          expect(result).to.deep.equal({
                'https://example.cypress.io': {
                key: 'value',
              },
          })
      })
  })
})
