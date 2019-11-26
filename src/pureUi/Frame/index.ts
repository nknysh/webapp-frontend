import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';

export const Frame = styled.div`
  background-color: ${pureUiTheme.colors.white};
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  box-shadow: 0 1px 2px ${pureUiTheme.colors.grayOpacity1};
`;
