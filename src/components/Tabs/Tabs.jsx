import React, { useState, Fragment } from 'react';
import { map, propOr, isEmpty, gt, length, inc } from 'ramda';

import { useEffectBoundary } from 'effects';

import { propTypes, defaultProps } from './Tabs.props';
import { StyledTabs, Tab } from './Tabs.styles';

const renderLabel = label => <Tab key={label} label={label} />;

export const Tabs = ({ labels, children, current, ...props }) => {
  const [tab, setTab] = useState(current);

  const content = propOr(children, tab, children);
  const onChange = (e, value) => setTab(value);

  useEffectBoundary(() => {
    setTab(current);
  }, [current]);

  useEffectBoundary(() => {
    gt(inc(tab), length(children)) && setTab(0);
  }, [children]);

  return (
    <Fragment>
      {!isEmpty(labels) && (
        <StyledTabs classes={{ indicator: 'tab-line' }} value={tab} className="tabs" onChange={onChange} {...props}>
          {map(renderLabel, labels)}
        </StyledTabs>
      )}
      {content}
    </Fragment>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
