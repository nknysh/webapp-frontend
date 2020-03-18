import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { Heading } from 'pureUi/typography';
import { IRatesImportData } from 'services/BackendApi';
import ReportItem from './ReportItem';

interface ReportProps {
  className?: string;
  data: IRatesImportData;
}

const StyledHeading = styled(Heading)`
  color: ${colors.gold};
`;

const StatusLabel = styled.span<{ success: boolean }>`
  color: ${props => props.success ? colors.warmGreen : colors.redFade};
`;

const StyledReportItem = styled(ReportItem)`
  margin: 20px 0;
`;

const Report = (props: ReportProps) => {
  const { className, data } = props;
  let { success, report, error } = data;

  return (
    <div className={className}>
      <StyledHeading level="h2">
        Status: <StatusLabel success={success}>{success ? 'Success': 'Fail'}</StatusLabel>
      </StyledHeading>
      {error && (
        <span>Error: {error}</span>
      )}
      {report && report.map(item =>
        <StyledReportItem key={item.key} data={item} />
      )}
    </div>
  );
};

export default Report;
