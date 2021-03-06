import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles';
import { colors } from 'pureUi/pureUiTheme';

interface ITableCardRowProps {
  depth: number;
  hasLeftBorder?: boolean;
  hasOriginalLineHeight?: boolean;
}

export const TableCardBox = styled.div``;

export const TableCardNumberedBanner = styled.div`
  display: flex;
  height: 50px;
  color: white;
  text-transform: uppercase;
`;

export const TableCardNumberBannerNumber = styled.div`
  padding: 20px;
  padding-left: 20px;
  margin-right: 2px;
  width: 50px;
  background-color: ${colors.gold};
  padding-top: 16px;
`;

export const TableCardNumberBannerText = styled.div`
  padding: 20px;
  width: 100%;
  background-color: ${colors.gold};
  padding-top: 16px;
`;

export const TableCardRow = styled.div`
  padding: 20px;
  padding-bottom: 16px;
  padding-top: 16px;
  line-height: 28px;
  ${(props: ITableCardRowProps) => {
    if (props.hasLeftBorder) {
      return css`
        border-left: 10px solid ${colors.teal};
        padding-left: 10px;
      `;
    }
  }}

  ${(props: ITableCardRowProps) => {
    if (props.hasOriginalLineHeight) {
      return css`
        line-height: inherit;
      `;
    }
  }}

  ${(props: ITableCardRowProps) => {
    switch (props.depth) {
      case 1:
        return css`
          background-color: ${colors.grayDepth1};
        `;
      case 2:
        return css`
          background-color: ${colors.grayDepth2};
        `;
      case 3:
        return css`
          background-color: ${colors.grayDepth3};
        `;
    }
  }}
`;
