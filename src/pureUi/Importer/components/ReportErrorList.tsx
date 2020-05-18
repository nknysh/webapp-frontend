import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { IImportErrorItem } from 'services/BackendApi';

export interface ReportErrorListProps {
  className?: string;
  title: string;
  items: Array<IImportErrorItem>;
}

export interface ErrorItemProps {
  className?: string;
  data: IImportErrorItem;
}

export const Title = styled.div`
  font-weight: 600;
`;

export const ErrorList = styled.div`
`;

export const ErrorRef = styled.div`
`;

export const ErrorMessageList = styled.div`
  margin-top: 10px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.grayDarker};
`;

export const ErrorItem = (props: ErrorItemProps) => {
  const { className, data } = props;

  return (
    <div className={className}>
      <ErrorRef>{data.ref}</ErrorRef>
      <ErrorMessageList>
        {data.messages.map(msg =>
          <ErrorMessage key={msg}>{msg}</ErrorMessage>
        )}
      </ErrorMessageList>
    </div>
  );
};

const StyledErrorItem = styled(ErrorItem)`
  margin: 20px 0;
  border-left: 1px solid ${colors.grayDarker};
  padding: 10px;
`;

const ReportErrorList = (props: ReportErrorListProps) => {
  const { title, items, className } = props;  

  return (
    <div className={className}>
      <Title>{title}</Title>
      <ErrorList>
        {items.map(item => 
          <StyledErrorItem key={item.ref} data={item} />
        )}
      </ErrorList>
    </div>
  );
  
};

export default ReportErrorList;
