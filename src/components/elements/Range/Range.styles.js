import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import theme from 'styles/theme';

export const trackStyle = [
  {
    backgroundColor: theme.primary,
  },
];

export const railStyle = {
  backgroundColor: theme.colors['gold-light'],
};

const handle = {
  backgroundColor: theme.primary,
  border: `1px solid ${theme.colors['gold-border']}`,
};

export const handleStyle = [handle, handle];
