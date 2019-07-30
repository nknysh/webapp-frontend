import styled from 'styled-components';

import ServerError from 'components/elements/ServerError';
import { theme } from 'styles';

export const ServerErrorContent = styled(ServerError)`
  margin-top: ${theme.gutter * 2}px;
`;
