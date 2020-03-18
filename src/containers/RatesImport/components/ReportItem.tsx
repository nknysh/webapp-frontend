import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { IRatesImportReportItem, ERatesImportReportItemKey } from 'services/BackendApi';
import  ReportErrorList from './ReportErrorList';

interface ReportItemProps {
  className?: string;
  data: IRatesImportReportItem;
}

const EntityLabels: { [key in ERatesImportReportItemKey]: string; } = {
  [ERatesImportReportItemKey.REGIONS]: "Regions",
  [ERatesImportReportItemKey.SEASONS]: "Seasons",
  [ERatesImportReportItemKey.ACCOMMODATION_RATES]: "Accommodation Rates",
  [ERatesImportReportItemKey.MEAL_PLAN_RATES]: "Meal Plan Rates",
  [ERatesImportReportItemKey.TRANSFER_RATES_PER_PERSON]: "Transfer Rates (per person)",
  [ERatesImportReportItemKey.TRANSFER_RATES_PER_BOOKING]: "Transfer Rates (per booking)",
  [ERatesImportReportItemKey.SUPPLEMENT_RATES]: "Supplement Rates",
  [ERatesImportReportItemKey.GROUND_SERVICE_RATES_PER_PERSON]: "Ground Services Rates (per person)",
  [ERatesImportReportItemKey.GROUND_SERVICE_RATES_PER_BOOKING]: "Ground Services Rates (per booking)",
  [ERatesImportReportItemKey.FINE_RATES]: "Fine Rates",
};

const HeaderInfo = styled.div<{ success: boolean }>`
  padding-left: 10px;
  border-left: 5px solid ${props => props.success ? colors.warmGreen : colors.redFade};
`;

const Totals = styled.span`
  padding-left: 10px;
  color: ${colors.grayDarker};
`;

const StyledReportErrorList = styled(ReportErrorList)`
  margin: 15px;
`;

const ReportItem = (props: ReportItemProps) => {
  const { data, className } = props;
  const { key, total, warnings, errors } = data;
  
  const insertable = total - errors.length;

  return (
    <div className={className}>
      <HeaderInfo success={!errors || !errors.length}>
        {EntityLabels[key] || key}
        <Totals>
          {insertable} insertable
          {Boolean(warnings.length) && ` (${warnings.length} with warnings)`}
          {Boolean(errors.length) && ` | ${errors.length} errors`}
        </Totals>
      </HeaderInfo>
      {Boolean(warnings.length) &&
        <StyledReportErrorList title="Warnings" items={warnings} />
      }
      {Boolean(errors.length) &&
        <StyledReportErrorList title="Errors" items={errors} />
      }
    </div>
  );
  
};

export default ReportItem;
