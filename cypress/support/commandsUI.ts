// Commands for dealing with non-primitive UI elements

Cypress.Commands.add('headerMenuSelect', (menuRoot: string, menuItem: string) => {
  cy.contains(menuRoot).should('be.visible').click();
  cy.contains(menuItem).should('be.visible').click();

  // BUG: Clicking 'Users' may open a submenu or the Users page instead, depending on the current page
  if (menuRoot === 'Users') {
    // BUG: Users menu does Not close after selecting its item
    cy.get('input[id*="firstName"]').should('be.visible').click({ force: true });
  }
});
