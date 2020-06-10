// Commands for interactig with API

const config = require('../integration/config');

Cypress.Commands.add ("apiLogin",
  (env, user) => {

    const data = {
      "data": {
        "attributes": {
            "email": config.users[user].email,
            "password": "Password125",
            "rememberMe": true
        }
      }
    }

    cy.request({
      method: 'POST',
      url: `https://api.qa.pure-escapes.com/api/users/login`,
      // headers: headers,
      body: data
    }).then((response) => {
      console.log(JSON.stringify(response))
      localStorage.setItem("authToken", response.body.data.uuid);
      return response.body
  })
})

// Cypress.Commands.add ("apiPost",
//   (collection, data, host = hostConfig.wzcHost) => {
//   		cy.log('Going to post ' + JSON.stringify(data) + ' to ' + host)
// 	    cy.request({
// 	    	method: data.ID ? 'PATCH' : 'POST',
// 	    	url: data.ID ? `${host}/OData/${collection}('${data.ID}')`: `${host}/OData/${collection}`,
// 	    	headers: config.oDataHeaders,
// 	    	body: data
// 	    }).then((response) => {
// 				console.log(`Saved via oData: ${JSON.stringify(response.body)}`)
// 				return response.body
// 		})
// })