import { appendPortalElements, PortalType } from '../index';

describe('appendPortals', () => {
  beforeAll(() => {
    appendPortalElements();
  });

  it('adds portal containers to the DOM', () => {
    Object.keys(PortalType).forEach(type => {
      const container = document.getElementById(PortalType[type]);
      expect(container).not.toBe(null);
    });
  });

  it('sets the correct z-index and width for the modal container', () => {
    const container = document.getElementById(PortalType.Modal);
    const styles = container!.getAttribute('style');
    expect(styles).toEqual('z-index:1300; width: 0px;');
  });

  it('sets the correct z-index and width for the tooltip container', () => {
    const container = document.getElementById(PortalType.Tooltip);
    const styles = container!.getAttribute('style');
    expect(styles).toEqual('z-index:1301; width: 0px;');
  });

  it('sets the correct z-index and width for the ovverlay container', () => {
    const container = document.getElementById(PortalType.Overlay);
    const styles = container!.getAttribute('style');
    expect(styles).toEqual('z-index:1302; width: 0px;');
  });
});
