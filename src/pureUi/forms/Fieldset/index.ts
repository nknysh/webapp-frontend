import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const Fieldset = styled.fieldset`
  position: relative;
  border: none;
  border-top: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  margin-top: 45px;
  padding: 20px 0;
`;

export const Legend = styled.legend`
  position: absolute;
  top: -30px;
  color: ${pureUiTheme.colors.grayDarker};
  left: 0;
  right: 0;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;
