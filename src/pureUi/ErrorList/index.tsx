import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const ErrorList = styled.ul`
  margin: 0;
  padding: 10px;
  border: red 1px solid;
  background-color: rgba(255, 0, 0, 0.1);
  font-size: ${pureUiTheme.typography.sizes.less};
  margin: 10px 0;
  li {
    list-style: none;
    color: red;
  }

  &:empty {
    visibility: hidden;
    padding: 0;
    margin: 0;
  }
`;
