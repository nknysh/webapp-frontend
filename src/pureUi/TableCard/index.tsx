import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles';

interface ITableCardRowProps {
  depth: number;
  hasLeftBorder?: boolean;
}

export const TableCardBox = styled.div``;

export const TableCardNumberedBanner = styled.div`
  display: flex;
  height: 50px;
  color: white;
  text-transform: uppercase;
`;

export const TableCardNumberBannerNumber = styled.div`
  padding: 16px;
  padding-left: 20px;
  margin-right: 2px;
  width: 50px;
  background-color: #a18265;
`;

export const TableCardNumberBannerText = styled.div`
  padding: 16px;
  width: 100%;
  background-color: #a18265;
`;

export const TableCardRow = styled.div`
  padding: 16px;
  line-height: 28px;
  ${(props: ITableCardRowProps) => {
    if (props.hasLeftBorder) {
      return css`
        border-left: 10px solid red;
        padding-left: 6px;
      `;
    }
  }}

  ${(props: ITableCardRowProps) => {
    switch (props.depth) {
      case 1:
        return css`
          background-color: ${theme.colors['gray-dark']};
        `;
      case 2:
        return css`
          background-color: ${theme.colors['gray-medium']};
        `;
      case 3:
        return css`
          background-color: ${theme.colors['gray-light']};
        `;
    }
  }}
`;
