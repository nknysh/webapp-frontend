import React from 'react';

import getRoutes from './index';

const MockComponent = () => <div />;

describe('getRoutes', () => {
  it('builds route components', () => {
    const testRoutes = [
      {
        path: '/',
        component: MockComponent,
      },
    ];
    const routes = getRoutes(testRoutes);

    expect(routes).toHaveLength(1);
    expect(routes[0]).toMatchSnapshot();
  });
  it('builds redirect components', () => {
    const testRoutes = [
      {
        from: '/from',
        to: '/to',
      },
    ];
    const routes = getRoutes(testRoutes);

    expect(routes).toHaveLength(1);
    expect(routes[0]).toMatchSnapshot();
  });
  it('builds authenticated route components', () => {
    const testRoutes = [
      {
        path: '/',
        component: MockComponent,
        auth: true,
      },
    ];
    const routes = getRoutes(testRoutes);

    expect(routes).toHaveLength(1);
    expect(routes[0]).toMatchSnapshot();
  });
});
