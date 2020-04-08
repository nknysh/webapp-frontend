import styled, { css } from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const Fieldset = styled.fieldset`
  position: relative;
  border: none;
  border-top: ${pureUiTheme.colors.gold} 1px solid;
  margin-top: 45px;
  padding: 20px 0;
`;

interface ILegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  isError?: boolean;
}

export const Legend = styled.legend<ILegendProps>`
  position: absolute;
  top: -30px;
  color: ${pureUiTheme.colors.grayDarker};
  left: 0;
  right: 0;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${pureUiTheme.colors.gold};

  ${props =>
    props.isError
      ? css`
          color: red;
        `
      : null}
`;

export const LegendExtras = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    margin-left: 10px;
  }
`;
