/// <reference types="cypress" />
describe('page', () => {
  it('works', () => {
    cy.visit('https://example.cypress.io')
  })

  it('should have the clipboard permissions granted', () => {
    cy.visit('https://example.cypress.io')
    if(Cypress.browser.name === "chrome") {
      cy.wrap(Cypress.automation('remote:debugger:protocol', {
          command: 'Browser.grantPermissions',
          params: { 
              permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'], 
              origin: "http://localhost:3000",
          },
      }))
      cy.window().its('navigator.permissions')
          .invoke('query', { name: 'clipboard-read' })
          .then(result => {
              expect(result.state).to.equal('granted')
          })
    }
  })
})
