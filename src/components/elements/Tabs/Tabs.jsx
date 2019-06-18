import React, { useState, Fragment } from 'react';
import { propOr, isEmpty, partial } from 'ramda';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Tabs.props';
import { StyledTabs, Tab } from './Tabs.styles';

const renderLabel = ({ tabClassname }, label, i) => <Tab key={i} className={tabClassname} label={label} />;

export const Tabs = ({ labels, children, onChange, value, tabClassname, ...props }) => {
  const [tab, setTab] = useState(value);

  const content = propOr(children, tab, children);
  const onTabSelect = (e, value) => {
    setTab(value);
    onChange(value);
  };

  return (
    <Fragment>
      {!isEmpty(labels) && (
        <StyledTabs classes={{ indicator: 'tab-line' }} value={tab} className="tabs" onChange={onTabSelect} {...props}>
          {mapWithIndex(partial(renderLabel, [{ tabClassname }]), labels)}
        </StyledTabs>
      )}
      {content}
    </Fragment>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
