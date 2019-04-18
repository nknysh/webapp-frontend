import PropTypes from 'prop-types';

import { MaterialMenuList, MaterialMenuItem } from './DropDownMenu.styles';

export const propTypes = {
  title: PropTypes.element,
  ListComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  ItemComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  showArrow: PropTypes.bool,
};

export const defaultProps = {
  title: '',
  ListComponent: MaterialMenuList,
  ItemComponent: MaterialMenuItem,
  showArrow: true,
};
