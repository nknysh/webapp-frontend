import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BookingStatusTypes } from 'config/enums';
import { colors } from '../pureUiTheme';

export interface BookingStatusProps extends HTMLProps<HTMLDivElement> {
  status: string;
}
const statusToColorMap = {
  [BookingStatusTypes.POTENTIAL]: colors.warmGreen,
  [BookingStatusTypes.REQUESTED]: colors.yellow,
  [BookingStatusTypes.CONFIRMED]: colors.green,
  [BookingStatusTypes.CANCELLED]: colors.redFade
};

const Indicator = styled.div`
  border-radius: 50%;
  background-color: ${props => props.color};
  height: 0.75em;
  width: 0.75em;
  margin-right: 0.75em;
`;

const BookingStatus = (props: BookingStatusProps) => {
  const { t } = useTranslation();

  return (
    <div className={props.className}>
      <Indicator color={statusToColorMap[props.status]}/>
      {t(`labels.${props.status}`)}
    </div>
  );
};

export default styled<BookingStatusProps>(BookingStatus)`
  display: flex;
  align-items: center;
`;
