/// <reference path="../../support/index.d.ts" />

const 
  envMy = 'qa',
  password = 'Password125';

  // Page objects:
  import { config } from '../config';
  import { shared } from '../elements/shared';
  import { salesRep } from '../elements/salesRep';
  import { travelAgent } from '../elements/travelAgent';
  import { admin } from '../elements/admin';

describe('Navigation', function() {
  it('Sales Rep logs in and navigates through menu', function() {
	cy.apiLogin(envMy, 'SalesRepA', password);
    cy.visit(config.envs[envMy].host);
    // cy.waitForReact(10000)
    // cy.react('Link', { to: '/bookings/03ba1159-baca-45a1-8fce-4ad7cfe4c3c0'}).click()
    cy.get(admin.navigation.hotels).should('be.visible');
    cy.get(admin.navigation.hotels).click();
    cy.get(shared.navigation.proposals).click();
    cy.get(shared.navigation.bookings).click();
    cy.get(salesRep.navigation.travelAgents).click();
    cy.get(salesRep.navigation.dashboard)
      .eq(1)
      .click();
    cy.headerMenuSelect('Sales Rep', 'Settings');
  });

  it('Trave Agent logs in and navigates through menu', function() {
    cy.apiLogin(envMy, 'TravelAgentA', password);
    cy.visit(config.envs[envMy].host);
    cy.get(shared.navigation.proposals).should('be.visible');
    cy.get(shared.navigation.proposals).click();
    cy.get(shared.navigation.bookings).click();
    cy.get(travelAgent.navigation.home)
      .eq(0)
      .click();
    cy.headerMenuSelect('Travel Agent', 'Settings');
  });

  it('Rate Loader logs in and navigates through menu', function() {
    cy.apiLogin(envMy, 'RatesLoader', password);
    cy.visit(config.envs[envMy].host);
    cy.get(shared.navigation.offers).should('be.visible');
    cy.get(shared.navigation.offers).click();
    cy.get(admin.navigation.content).click();
    cy.get(admin.navigation.hotels).click();
    cy.headerMenuSelect('Rate Loader', 'Settings');
  });

  it('Admin logs in and navigates through menu', function() {
    cy.apiLogin(envMy, 'Admin', password);
    cy.visit(config.envs[envMy].host);
    cy.get(admin.navigation.hotels).should('be.visible');
    cy.get(admin.navigation.hotels).click();
    cy.get(admin.navigation.partnerCompanies).click();
    cy.get(shared.navigation.offers).click();
    cy.get(admin.navigation.content).click();
    cy.get(shared.navigation.proposals).click();
    cy.get(shared.navigation.bookings).click();
    cy.get(admin.navigation.dashboard)
      .eq(0)
      .click();
    cy.headerMenuSelect('Users', 'Travel agents');
    cy.headerMenuSelect('Users', 'Sales representatives');
    cy.headerMenuSelect('Users', 'Rate loaders');
    cy.headerMenuSelect('Admin', 'Settings');
  });
});
