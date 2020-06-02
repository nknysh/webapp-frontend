import React from 'react';
import styled from 'styled-components';
import { formatDateDisplay } from 'utils';
import { colors, pureUiTheme } from 'pureUi/pureUiTheme';
import { EBookingStatus } from 'services/BackendApi';

export interface IProgressBarStage {
  key: EBookingStatus;
  label: string;
  isComplete: boolean;
  isCurrent: boolean;
  isCancelled: boolean;
  timestamp?: string;
}
export interface IProgressBarProps {
  className?: string;
  data: {
    stages: IProgressBarStage[];
  };
}

export const ProgressBarComponent = (props: IProgressBarProps) => {
  return (
    <ul className={props.className}>
      {props.data.stages.map(stage => {
        const labelClasses = ['label'];
        if (stage.isCurrent) {
          labelClasses.push('is-current');
        }
        if (!stage.isComplete) {
          labelClasses.push('is-not-complete');
        }
        if (stage.isCancelled) {
          labelClasses.push('is-cancelled');
        }
        return (
          <li key={stage.key}>
            <span className={`${labelClasses.join(' ')}`}>{stage.label}</span>
            {stage.timestamp && <span className="timestamp">{formatDateDisplay(stage.timestamp)}</span>}
          </li>
        );
      })}
    </ul>
  );
};

export const ProgressBar = styled(ProgressBarComponent)`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;

  li {
    margin-left: 16px;
  }

  li span {
    display: block;
    color: ${colors.teal};
    padding: 8px;
    width: 100px;
    text-align: center;
  }

  li span.label {
    border: 1px solid ${colors.teal};
    font-weight: bold;
    border-radius: 4px;
    font-size: ${pureUiTheme.typography.sizes.mid}px;
  }

  li span.timestamp {
    font-size: ${pureUiTheme.typography.sizes.default}px;
  }

  li span.is-not-complete {
    border-color: ${colors.grayDark};
    color: ${colors.grayDark};
  }

  li span.is-current {
    border-color: ${colors.green};
    background: ${colors.green};
    color: ${colors.white};
  }

  li span.is-cancelled {
    border-color: ${colors.redFade};
    background: ${colors.redFade};
    color: ${colors.white};
  }
`;
