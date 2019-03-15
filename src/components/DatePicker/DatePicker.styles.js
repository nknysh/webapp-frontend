import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import { Label } from 'components';
import { dropDownContentAreaStyles } from 'components/DropDownContent/DropDownContent.styles';
import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

const baseClass = 'date-picker';

export const datePickerClassnames = {
  container: baseClass,
  wrapper: `${baseClass}__wrapper`,
  interactionDisabled: `${baseClass}--disabled`,

  navBar: `${baseClass}__nav-bar`,
  navButtonPrev: `${baseClass}__nav-bar_prev`,
  navButtonNext: `${baseClass}__nav-bar_next`,
  navButtonInteractionDisabled: `${baseClass}--disabled`,

  months: `${baseClass}__months`,
  month: `${baseClass}__month`,
  caption: `${baseClass}__caption`,
  weekdays: `${baseClass}__week-days`,
  weekdaysRow: `${baseClass}__week-days__row`,
  weekday: `${baseClass}__week-day`,
  body: `${baseClass}__body`,
  week: `${baseClass}__week`,
  day: `${baseClass}__day`,

  footer: `${baseClass}__footer`,
  todayButton: `${baseClass}__today-button`,

  today: `${baseClass}__today`,
  selected: `${baseClass}__selected`,
  disabled: `${baseClass}__disabled`,
  outside: `${baseClass}__outside`,
};

export const StyledDatePicker = styled.div`
  * {
    outline: none;
  }
  .${baseClass} {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: ${theme.gutter / 2}px;
    z-index: 9000;

    ${breakpoints.tablet`
      margin-top: 0;
    `}

    .${baseClass}__wrapper {
      ${dropDownContentAreaStyles}

      ${breakpoints.tablet`
        box-shadow: ${theme.boxShadow};
      `}

      .${baseClass}__months {
        display: flex;
        position: relative;
        z-index: 302;
        flex-direction: column;

        .${baseClass}__month {
          flex: 1;
          padding: ${theme.gutter}px;
        }

        .${baseClass}__caption {
          display: none;
        }

        .${baseClass}__week-days__row, .${baseClass}__week {
          display: flex;

          .${baseClass}__week-day, .${baseClass}__day {
            flex: 1;
            text-align: center;
            padding: ${theme.gutter}px ${theme.gutter / 3}px;
            font-size: 13px;
            font-weight: ${theme.bold};
            text-transform: uppercase;
            cursor: pointer;

            abbr {
              text-decoration: none;
            }
          }

          .${baseClass}__outside {
            color: ${theme.colors['gray-opacity-1']};
            opacity: ${theme.opacity};
          }
        }

        .${baseClass}__week {
          margin: ${theme.gutter}px 0;

          .${baseClass}__day {
            color: ${theme.colors['gray-opacity-1']};
          }
        }

        .${baseClass}__selected {
          background: ${theme.selected};
        }
      }
    }
  }
`;

export const DatePickerLabel = styled(Label)``;

export const DatePickerNavbar = styled.div`
  display: flex;
  background: ${theme.navigation};
  width: 100%;
  height: 42px;
  z-index: 301;
  justify-content: center;
  align-items: center;
`;

export const DatePickerNavbarMonth = styled.div`
  color: ${theme.colors['gold-neutral']};
  font-size: 14px;
  font-weight: ${theme.bold};
  text-transform: uppercase;
`;

const DatePickerNavbarNav = styled(Icon)`
  color: ${theme.primary};
  flex: 1;
  font-size: 38px !important;
  cursor: pointer;

  ${({ ['data-hide']: hide }) =>
    hide &&
    css`
      opacity: 0.25;
      pointer-events: none;
    `}

  :hover {
    color: ${theme.secondary};
  }
`;

export const DatePickerNavbarNext = styled(DatePickerNavbarNav)`
  text-align: right;
`;

export const DatePickerNavbarPrev = styled(DatePickerNavbarNav)``;

export const DatePickerSummary = styled.div`
  background: ${theme.colors.aqua};
  position: absolute;
  right: ${theme.gutter * 3}px;
  top: ${theme.gutter / 2}px;
  padding: ${theme.gutter / 2}px ${theme.gutter}px;
  font-weight: ${theme.bold};
  color: ${theme.colors.black};
`;
