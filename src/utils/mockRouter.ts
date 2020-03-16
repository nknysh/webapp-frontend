import { RouteComponentProps } from 'react-router';
import { Href } from 'history';

//This is to mock out the dependencies for react router
export const getMockRouterProps = <P>(params: P, path?: string) => {
  const locationObj = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  };

  const props: RouteComponentProps<P> = {
    match: {
      isExact: true,
      params: params,
      path: path || '',
      url: '',
    },
    location: locationObj,
    history: {
      length: 2,
      action: 'POP',
      location: locationObj,
      push: () => {},
      replace: () => {},
      go: num => {},
      goBack: () => {},
      goForward: () => {},
      block: t => () => {},
      createHref: t => {
        var temp: Href = '';
        return temp;
      },
      listen: t => () => {},
    },
    staticContext: {},
  };

  return props;
};
