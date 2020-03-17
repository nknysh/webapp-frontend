import React from 'react';
import styled from 'styled-components';
import { colors } from 'pureUi/pureUiTheme';
import { IRatesImportErrorItem } from 'services/BackendApi';

interface ReportErrorListProps {
  className?: string;
  title: string;
  items: Array<IRatesImportErrorItem>;
}

interface ErrorItemProps {
  className?: string;
  data: IRatesImportErrorItem;
}

const Title = styled.div`
  font-weight: 600;
`;

const ErrorList = styled.div`
`;

const ErrorRef = styled.div`
`;

const ErrorMessageList = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: ${colors.grayDarker};
`;

const ErrorItem = (props: ErrorItemProps) => {
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
