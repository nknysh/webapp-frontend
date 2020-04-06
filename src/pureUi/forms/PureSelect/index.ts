import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export const PureSelect = styled.select`
  display: block;
  font-size: 14px;
  font-family: ${pureUiTheme.typography.sansSerifFont};
  font-weight: ${pureUiTheme.typography.normal};
  color: ${pureUiTheme.colors.black};
  line-height: 1.3;
  padding: 10px 30px 10px 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};
  appearance: none;
  background-color: ${pureUiTheme.colors.white};
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDEyQzkuMzEzNzEgMTIgMTIgOS4zMTM3MSAxMiA2QzEyIDIuNjg2MjkgOS4zMTM3MSAwIDYgMEMyLjY4NjI5IDAgMCAyLjY4NjI5IDAgNkMwIDkuMzEzNzEgMi42ODYyOSAxMiA2IDEyWk0zLjQwMTkyIDQuNUw2IDlMOC41OTgwOCA0LjVMMy40MDE5MiA0LjVaIiBmaWxsPSIjQTI4MjY1Ii8+Cjwvc3ZnPgo=');
  background-repeat: no-repeat, repeat;
  background-position: right 10px top 50%, 0 0;
  background-size: 16px auto, 100%;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px ${pureUiTheme.colors.teal};
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: ${pureUiTheme.colors.black};
    outline: none;
  }

  & > option {
    font-weight: normal;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
