import React from 'react';
import { IImportStatus, EGenericStatusValue } from 'services/BackendApi';
import { formatDateTimeDisplay } from 'utils/date';

export interface LatestStatusInfoProps {
  className?: string;
  status: IImportStatus;
}

const StatusLabels: { [key in EGenericStatusValue]: string; } = {
  [EGenericStatusValue.PENDING]: "Pending",
  [EGenericStatusValue.IN_PROGRESS]: "In Progress",
  [EGenericStatusValue.DONE]: "Done",
};

const LatestStatusInfo = (props: LatestStatusInfoProps) => {
  const { className, status } = props;

  return (
    <div className={className}>
      Latest import: {StatusLabels[status.status]} ({formatDateTimeDisplay(status.createdAt)})
    </div>
  );
};

export default LatestStatusInfo;
