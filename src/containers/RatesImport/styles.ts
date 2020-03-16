import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';

export const MainStyles = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;

  .controls {
    display: flex;
    align-items: center;

    .importBtn {
      max-width: 200px;
      margin-right: 20px;
    }
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: ${colors.grayDark};
    margin: 20px 0px;
  }

  .results {

  }

`;
