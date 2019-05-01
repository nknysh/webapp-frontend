import styled from 'styled-components';

import { Checkbox } from 'components/elements';

export { Title } from 'components/app/SummaryForm/SummaryForm.styles';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { withCurrency } from 'styles/elements';

export const Margin = styled.div``;

export const MarginCheckbox = styled(Checkbox)`
  label {
    margin: 0 !important;

    > span {
      padding-left: 0 !important;
      font-size: ${theme.fonts.sizes.normal}px !important;
      line-height: 14px !important;
      text-transform: uppercase;
      color: ${theme.primary} !important;
    }
  }
`;

export const MarginInputs = styled.div`
  ${breakpoints.tablet`

display: flex;

> * {
  flex: 1;
  margin: ${theme.gutter / 2}px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
}
`}
`;

export const MarginTotal = styled.div`
  color: ${theme.secondary};
  margin: ${theme.gutter}px 0;
  font-size: ${theme.fonts.sizes.normal}px;
  line-height: 18px;
`;

export const MarginTotalAmount = styled.span`
  ${withCurrency};
  font-weight: ${theme.fonts.bold};
`;

export const MarginPercentSuffix = styled.span`
  :after {
    content: '%';
  }
`;
