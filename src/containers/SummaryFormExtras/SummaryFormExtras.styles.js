import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { Checkbox } from '@pure-escapes/webapp-ui-components';

import { ContextMenu as BaseContextMenu } from 'components';
import { theme, withDiscountStyles } from 'styles';

export { Title } from 'containers/SummaryForm/SummaryForm.styles';

import { pureUiTheme } from 'pureUi/pureUiTheme';

export const OptionLabel = styled.span``;

export const OptionRate = styled.span`
  display: block;
`;

export const OptionPrice = styled.span`
  ${withDiscountStyles};
`;

export const OptionOffer = styled.span`
  display: block;
  ${withDiscountStyles};
`;

export const Extra = styled.div`
  margin-bottom: ${theme.spacing.gutter * 4}px;

  label {
    margin-bottom: ${theme.spacing.gutter}px;
  }
`;

export const AddonCheckbox = styled(Checkbox)`
  label {
    width: 100%;
    margin-bottom: ${theme.spacing.gutter}px;

    // odd CSS rule - this is to overwrite some nonsense from material UI
    span:nth-child(2) {
      width: 100%;
    }
  }
`;

export const OptionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 10px;

    .optionListLabel {
      display: flex;
    }

    .labelText {
      margin-left: 10px;
      display: inline-block;
      width: 85%;
    }
  }

  svg {
    position: absolute;
    right: 14px;
    top: 6px;
  }
`;

export const AddonSummary = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.gutter * 2}px;
`;

export const ContextMenu = styled(BaseContextMenu)`
  flex: 0 1;
  padding: 0 0 0 ${theme.spacing.gutter / 2}px;
`;

export const ModalContent = styled.div`
  max-width: 600px;
  padding: ${theme.spacing.gutter * 6}px;
`;

export const TravelAgent = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  padding: ${theme.spacing.gutter}px 0;
  font-size: ${theme.fonts.sizes.default}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-top: 1px dotted ${theme.borders.default};
  border-bottom: 1px dotted ${theme.borders.default};
  width: 100%;
`;

export const TravelAgentName = styled.span`
  flex: 1 0 auto;
`;

export const Clear = styled(Icon)`
  color: ${theme.error};
  flex: 0 0 auto;
`;

export const Description = styled.p`
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  color: ${theme.palette.secondary};
  line-height: 1.5;
`;

export const CollapseToggle = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const CollapseTitle = styled.div`
  display: flex;

  label {
    flex: 1;
  }
`;

export const InformationIcon = styled(InfoIcon)`
  position: absolute;
  margin-top: -3px;
  margin-left: 10px;
  fill: ${theme.palette.primary} !important;
  cursor: pointer;

  &:hover {
    fill: ${pureUiTheme.colors.teal} !important;
  }
`;

export const ProductLabel = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  span {
    flex: 1;
  }
  svg {
    position: absolute;
    right: 0;
  }
`;

export const BothWayTransferRadioWrapper = styled.div`
  // odd CSS rule - this is to overwrite some nonsense from material UI
  span:nth-child(2) {
    width: 100%;
  }
`;

export const InlinePriceLabel = styled.label`
  ${({ ['data-discounted']: secondary }) =>
    secondary &&
    css`
      margin: 0 0 ${theme.spacing.gutter * 1.4}px;
      color: ${theme.colors['red-fade']} !important;
    `}

    ${({ ['margin-right']: marginRight }) =>
      marginRight &&
      css`
        margin-right: 8px;
      `}

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      font-size: 1.2em;
      color: ${theme.palette.light} !important;
      text-decoration: line-through;
    `}
`;
