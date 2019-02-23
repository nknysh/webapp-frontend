import headerLinks from 'config/links/header--logged-out';
import footerLinks from 'config/links/footer';

const initialState = {
  menus: {
    header: headerLinks,
    footer: footerLinks,
  },
};

const uiReducer = (state = initialState) => {
  return state;
};

export default uiReducer;
