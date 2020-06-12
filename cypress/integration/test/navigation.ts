/// <reference path="../../support/index.d.ts" />

import { config, Config } from '../config';

// Page objects:
import { shared } from '../elements/shared';
import { salesRep } from '../elements/salesRep';
import { travelAgent } from '../elements/travelAgent';
import { admin } from '../elements/admin';

const environment: keyof Config['envs'] = Cypress.env('environment') ? Cypress.env('environment').toString() : 'qa';
const password: string = Cypress.env('password').toString();

const visitHost: string = config.envs[environment].host;

describe('Navigation', function() {
  it('Sales Rep logs in and navigates through menu', function() {
    cy.apiLogin(environment, 'SalesRepA', password);
    cy.visit(visitHost);
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
    cy.apiLogin(environment, 'TravelAgentA', password);
    cy.visit(visitHost);
    cy.get(shared.navigation.proposals).should('be.visible');
    cy.get(shared.navigation.proposals).click();
    cy.get(shared.navigation.bookings).click();
    cy.get(travelAgent.navigation.home)
      .eq(0)
      .click();
    cy.headerMenuSelect('Travel Agent', 'Settings');
  });

  it('Rate Loader logs in and navigates through menu', function() {
    cy.apiLogin(environment, 'RatesLoader', password);
    cy.visit(visitHost);
    cy.get(shared.navigation.offers).should('be.visible');
    cy.get(shared.navigation.offers).click();
    cy.get(admin.navigation.content).click();
    cy.get(admin.navigation.hotels).click();
    cy.headerMenuSelect('Rate Loader', 'Settings');
  });

  it('Admin logs in and navigates through menu', function() {
    cy.apiLogin(environment, 'Admin', password);
    cy.visit(visitHost);
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
