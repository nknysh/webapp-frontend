import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';

export enum PortalType {
  Tooltip = 'portal-tooltip',
  Modal = 'portal-modal',
  Overlay = 'portal-overlay',
}

// Use this to guarantee the order of portal divs to
// ensure tooltips are always above modals, etc etc
const portalOrder = [PortalType.Modal, PortalType.Tooltip, PortalType.Overlay];

const appendPortalElementsWithOrder = (orderedTypes: PortalType[]) => () => {
  // Thanks to the liberal application of z-indexes without
  // any comprehension of how the work, or any thought to
  // the problems they cause, we need to set a z-index for each
  // modal container. How did I arrive at this number? well, everytime
  // I discover an element with some stupidly high z-index, I have to
  //  increment this number.

  const zIndex = 1300;

  const fragment = document.createDocumentFragment();
  orderedTypes.forEach((id, idx) => {
    const el = document.createElement('span');
    el.setAttribute('id', id);
    el.setAttribute('style', `z-index:${zIndex + idx}; width: 0px;`);
    fragment.appendChild(el);
  });
  document.body.appendChild(fragment);
};

export const appendPortalElements = appendPortalElementsWithOrder(portalOrder);

export const renderPortal = (jsx: JSX.Element, portalType: PortalType): ReactPortal => {
  const el = document.getElementById(portalType);
  if (el) {
    return ReactDOM.createPortal(jsx, el);
  } else {
    throw new Error(`No portal container of type ${portalType}`);
  }
};
