import styled from 'styled-components';

import { RadioButton, Checkbox } from 'components';

import theme from 'styles/theme';
import { Button } from 'styles/elements';

const headerSpacing = theme.gutter * 2 - theme.gutter / 2;

export const Section = styled.div`
  background: ${theme.navigation};
  padding: ${theme.gutter * 2}px;
  margin: 0 0 ${headerSpacing * 2}px;

  label,
  label > span {
    color: ${theme.colors['gold-neutral']};
    font-size: 12px;
    text-transform: uppercase;
  }
`;

export const Title = styled.h4`
  color: ${theme.colors['gold-neutral']};
  font-size: 12px;
  font-weight: bold;
  padding: 0 0 ${headerSpacing}px;
  margin: 0 0 ${headerSpacing}px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.colors['gray-medium']};
`;

export const SectionField = styled.div`
  position: relative;
  margin-bottom: ${theme.gutter * 3}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RegionRadioButton = styled(RadioButton)`
  label {
    display: block;
    width: 100%;
    flex: none;
    display: flex;
  }
`;

export const RegionCheckbox = styled(Checkbox)`
  margin-left: ${theme.gutter * 3}px;
`;

export const SideBarButton = styled(Button)`
  font-size: 12px;
`;
