import styled from 'styled-components';

export interface IFormControlGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columnCount: number;
}

export const FormControlGrid = styled.div<IFormControlGridProps>`
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  /* 
    The minmax syntax prevents grid blowout
    https://css-tricks.com/preventing-a-grid-blowout/
    */
  grid-template-columns: repeat(${props => props.columnCount}, minmax(0, ${props => 100 / props.columnCount}%));
`;
