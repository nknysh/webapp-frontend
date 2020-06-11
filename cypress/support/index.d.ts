// in cypress/support/index.d.ts

// import { Config } from "../integration/config";

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
      */

     apiLogin(env: string, user: string, password: string): Chainable
     apiPost(env: string, endpoint: string, data: any): Chainable
     headerMenuSelect(menuRoot: string, menuItem: string): Chainable

    }
  }