import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  box-shadow: 0 0 0 5px transparent;
  transition: all 0.15s ease-out;

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }
`;

TextArea.defaultProps = {
  rows: 5,
};

export default TextArea;
