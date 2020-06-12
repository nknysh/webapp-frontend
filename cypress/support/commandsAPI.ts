// Commands for interactig with API
/// <reference path="./index.d.ts" />

import { config, Config } from '../integration/config';

Cypress.Commands.add('apiLogin', (env: keyof Config['envs'], user: keyof Config['users'], password: string) => {
  const data = {
    data: {
      attributes: {
        email: config.users[user].email,
        password: password,
        rememberMe: true,
      },
    },
  };
  cy.log('Passing to apiPost: ' + env + 'users/login ' + JSON.stringify(data));
  cy.apiPost(env, 'users/login', data).then(response => {
    console.log(JSON.stringify(response));
    localStorage.setItem('authToken', response.data.uuid);
    return response.data;
  });
});

Cypress.Commands.add('apiPost', (env: keyof Config['envs'], endpoint: string, data: any) => {
  console.log(`Going to post ${JSON.stringify(data)} to ${config.envs[env].api}/${endpoint}`);
  cy.request({
    method: 'POST',
    url: `${config.envs[env].api}/${endpoint}`,
    body: data,
  }).then(response => {
    console.log(`Saved via oData: ${JSON.stringify(response.body)}`);
    console.log(response.body);
    return response.body;
  });
});
