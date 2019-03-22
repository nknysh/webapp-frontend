import React, { useState, Fragment } from 'react';
import { map, propOr } from 'ramda';

import { propTypes, defaultProps } from './Tabs.props';
import { StyledTabs, Tab } from './Tabs.styles';

const renderLabel = label => <Tab key={label} label={label} />;

export const Tabs = ({ labels, children, ...props }) => {
  const [current, setCurrent] = useState(0);

  const content = propOr(children, current, children);

  const onChange = (e, value) => setCurrent(value);

  return (
    <Fragment>
      <StyledTabs classes={{ indicator: 'tab-line' }} value={current} className="tabs" onChange={onChange} {...props}>
        {map(renderLabel, labels)}
      </StyledTabs>
      {content}
    </Fragment>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
