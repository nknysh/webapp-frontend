import styled from 'styled-components';

export interface IFormControlGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columnCount: number;
  padded?: boolean;
}

export const FormControlGrid = styled.div<IFormControlGridProps>`
  padding: ${props => (props.padded ? '10px' : 0)};
  display: grid;
  grid-gap: 10px;
  /* 
    The minmax syntax prevents grid blowout
    https://css-tricks.com/preventing-a-grid-blowout/
    */
  grid-template-columns: repeat(${props => props.columnCount}, minmax(0, ${props => 100 / props.columnCount}%));
`;
