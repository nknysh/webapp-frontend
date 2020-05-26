import React, { Component } from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from "react-router";
import { AuthRoute, shouldRedirect } from './';
import { EUserType } from 'services/BackendApi';

describe('AuthRoute', () => {

  it('properly checks redirection condition', () => {
    
    expect(shouldRedirect({ isAuthenticated: false })).toBe(true);
    expect(shouldRedirect({ isAuthenticated: true })).toBe(false);
    
    expect(shouldRedirect({ isAuthenticated: true, role: EUserType.TA, allow: [EUserType.SR]})).toBe(true);
    expect(shouldRedirect({ isAuthenticated: true, role: EUserType.TA, allow: [EUserType.TA]})).toBe(false);

    expect(shouldRedirect({ isAuthenticated: true, role: EUserType.TA, deny: [EUserType.TA]})).toBe(true);
    expect(shouldRedirect({ isAuthenticated: true, role: EUserType.TA, deny: [EUserType.SR]})).toBe(false);

  });

  it('renders proper component', () => {
    const Content = () => <div className="content"/>;

    let wrapper = render(
      <MemoryRouter initialEntries={['/test']}>
        <AuthRoute path="/test" isAuthenticated={true} component={Content} />
      </MemoryRouter>
    );

    expect(wrapper.prop("class")).toEqual("content");

    wrapper = render(
      <MemoryRouter initialEntries={['/test']}>
        <AuthRoute path="/test" isAuthenticated={false} component={Content} />
      </MemoryRouter>
    );

    expect(wrapper.prop('class')).toBeUndefined();

    wrapper = render(
      <MemoryRouter initialEntries={['/test']}>
        <AuthRoute path="/test" isAuthenticated={true} render={props => <Content />} />
      </MemoryRouter>
    );

    expect(wrapper.prop("class")).toEqual("content");

    wrapper = render(
      <MemoryRouter initialEntries={['/test']}>
        <AuthRoute path="/test" isAuthenticated={true}>
          <Content />
        </AuthRoute>
      </MemoryRouter>
    );

    expect(wrapper.prop("class")).toEqual("content");
    
  });

});
