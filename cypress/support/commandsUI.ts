// Commands for dealing with non-primitive UI elements

Cypress.Commands.add('headerMenuSelect', (menuRoot: string, menuItem: string) => {
  cy.contains(menuRoot)
    .should('be.visible')
    .click();
  cy.contains(menuItem)
    .should('be.visible')
    .click();

  if (menuRoot === 'Users') {
    cy.get('input[id*="firstName"]')
      .should('be.visible')
      .click({ force: true });
  }
});
