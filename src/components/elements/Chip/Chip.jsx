import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import theme from 'styles/theme';

export const CardChip = styled.div`
  color: ${theme.colors.black};
  background: ${theme.backgrounds.default};
  padding: ${theme.gutter / 2}px ${theme.gutter}px;
  font-size: ${theme.fonts.sizes.normal}px;
  text-transform: uppercase;
  margin 0 ${theme.gutter / 2}px;
  line-height: 18px;

  :first-child {
      margin-left: 0;
  }

  :last-child {
      margin-right: 0;
  }

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      color: ${theme.colors['red-fade']};
      font-weight: ${theme.fonts.bold};
      padding: ${theme.gutter / 2 + 1}px ${theme.gutter}px;
    `}
`;

CardChip.propTypes = {
  secondary: PropTypes.bool,
};

export default CardChip;
