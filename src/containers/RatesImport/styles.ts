import styled from 'styled-components';

export const MainStyles = styled.main`
  width: 100%;

  .importer {
    margin: 0 auto;
    max-width: 1000px;
    padding: 20px 10px 0px;

    .controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .importBtn {
        max-width: 200px;
      }
    }
  }

  .separator {
    margin: 20px 0px;
  }

  .editor {
    padding: 20px;

    iframe {
      border: 0;
      width: 100%;
      height: 100vh;
    }
  }

`;
