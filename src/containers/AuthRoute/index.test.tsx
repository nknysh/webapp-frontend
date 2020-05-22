import { shouldRedirect } from './';
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

});
