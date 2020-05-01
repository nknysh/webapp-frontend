import React, { Fragment } from 'react';
import styled from 'styled-components';

import Badge from '.';

const Placeholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: lightgray;
`;

const StyledBadge = styled(Badge)`
  margin-right: 30px;
`;

export const BasicUsage = () => (
  <Fragment>
    <StyledBadge count={5}>
      <Placeholder/>
    </StyledBadge>
    <StyledBadge count={153}>
      <Placeholder/>
    </StyledBadge>
    <StyledBadge count={0}>
      <Placeholder/>
    </StyledBadge>
    <StyledBadge count={0} showZero>
      <Placeholder/>
    </StyledBadge>
    <StyledBadge count={15} offset={[15, 0]}>
      This is simple text
    </StyledBadge>
  </Fragment>
);
