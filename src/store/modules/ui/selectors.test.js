import { getUi, getUiMenus, getUiHeaderMenu } from './selectors';

const mockState = {
  ui: {
    menus: {
      header: [],
      footer: [],
    },
  },
};

describe('ui selectors', () => {
  it('getUi returns ui config', () => {
    expect(getUi(mockState)).toEqual(mockState.ui);
  });

  it('getUiMenus returns ui menus', () => {
    expect(getUiMenus(mockState)).toEqual(mockState.ui.menus);
  });

  it('getUiHeaderMenu returns ui header menu', () => {
    expect(getUiHeaderMenu(mockState)).toEqual(mockState.ui.menus.header);
  });

  it('getUiHeaderMenu returns ui footer menu', () => {
    expect(getUiHeaderMenu(mockState)).toEqual(mockState.ui.menus.footer);
  });
});
