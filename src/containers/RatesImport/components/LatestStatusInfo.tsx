import React from 'react';
import { IRatesImportStatus, EGenericStatusValue } from 'services/BackendApi';
import { formatDateTimeDisplay } from 'utils/date';

interface LatestStatusInfoProps {
  className?: string;
  status: IRatesImportStatus;
}

const StatusLabels: { [key: string]: string; } = {
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
