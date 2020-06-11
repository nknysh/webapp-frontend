export const config = {
  envs: {
    qa: {
      host: 'https://qa.pure-escapes.com/',
      api: 'https://api.qa.pure-escapes.com/api',
    },
    sandbox: {
      host: 'https://sandbox.pure-escapes.com/',
      api: 'https://api.sandbox.pure-escapes.com/api',
    },
  },

  users: {
    SalesRepA: {
      email: 'qa_sales_rep_a@pure-escapes.com',
    },
    Admin: {
      email: 'qa_admin@pure-escapes.com',
    },
    RatesLoader: {
      email: 'qa_rates_loader@pure-escapes.com',
    },
    TravelAgentA: {
      email: 'qa_travel_agent_a@pure-escapes.com',
    },
  },
};

export type Config = typeof config;