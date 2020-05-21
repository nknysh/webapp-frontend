import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { Heading } from 'pureUi/typography';
import { IImportData } from 'services/BackendApi';
import ReportItem from './ReportItem';

export interface ReportProps {
  className?: string;
  data: IImportData;
}

export const StyledHeading = styled(Heading)`
  color: ${colors.gold};
`;

const StatusLabel = styled.span<{ success: boolean }>`
  color: ${props => props.success ? colors.warmGreen : colors.redFade};
`;

export const StyledReportItem = styled(ReportItem)`
  margin: 20px 0;
`;

export const ErrorMessage = styled.span``;

const Report = (props: ReportProps) => {
  const { className, data } = props;
  let { success, report, error } = data;

  return (
    <div className={className}>
      <StyledHeading level="h2">
        Status: <StatusLabel success={success}>{success ? 'Success': 'Fail'}</StatusLabel>
      </StyledHeading>
      {error && (
        <ErrorMessage>Error: {error}</ErrorMessage>
      )}
      {report && report.map(item =>
        <StyledReportItem key={item.key} data={item} />
      )}
    </div>
  );
};

export default Report;
