import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';

export enum PortalType {
  Tooltip = 'portal-tooltips',
  Modal = 'portal-modals',
}

// Use this to guarantee the order of portal divs to
// ensure tooltips are always above modals, etc etc
const portalOrder = [PortalType.Modal, PortalType.Tooltip];

const appendPortalElementsWithOrder = (orderedTypes: PortalType[]) => () => {
  const fragment = document.createDocumentFragment();
  orderedTypes.forEach(id => {
    const el = document.createElement('div');
    el.setAttribute('id', id);
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
