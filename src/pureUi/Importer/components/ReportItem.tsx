import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { IImportReportItem, EImportReportItemKey } from 'services/BackendApi';
import  ReportErrorList from './ReportErrorList';

export interface ReportItemProps {
  className?: string;
  data: IImportReportItem;
}

const EntityLabels: { [key in EImportReportItemKey]: string; } = {
  [EImportReportItemKey.REGIONS]: "Regions",
  [EImportReportItemKey.SEASONS]: "Seasons",
  [EImportReportItemKey.ACCOMMODATION_RATES]: "Accommodation Rates",
  [EImportReportItemKey.MEAL_PLAN_RATES]: "Meal Plan Rates",
  [EImportReportItemKey.TRANSFER_RATES_PER_PERSON]: "Transfer Rates (per person)",
  [EImportReportItemKey.TRANSFER_RATES_PER_BOOKING]: "Transfer Rates (per booking)",
  [EImportReportItemKey.SUPPLEMENT_RATES]: "Supplement Rates",
  [EImportReportItemKey.GROUND_SERVICE_RATES_PER_PERSON]: "Ground Services Rates (per person)",
  [EImportReportItemKey.GROUND_SERVICE_RATES_PER_BOOKING]: "Ground Services Rates (per booking)",
  [EImportReportItemKey.FINE_RATES]: "Fine Rates",
  [EImportReportItemKey.ALLOTMENTS]: "Allotments",
};

export const HeaderInfo = styled.div<{ success: boolean }>`
  padding-left: 10px;
  border-left: 5px solid ${props => props.success ? colors.warmGreen : colors.redFade};
`;

export const Totals = styled.span`
  padding-left: 10px;
  color: ${colors.grayDarker};
`;

export const StyledReportErrorList = styled(ReportErrorList)`
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
