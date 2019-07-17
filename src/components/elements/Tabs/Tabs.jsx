import React, { useState, Fragment, useCallback, Children } from 'react';
import { propOr, isEmpty, partial, inc, gt, length, lt, dec, equals } from 'ramda';
import TabScrollButton from '@material-ui/core/Tabs/TabScrollButton';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Tabs.props';
import { StyledTabs, Tab } from './Tabs.styles';

const renderLabel = ({ tabClassname }, label, i) => <Tab key={i} className={tabClassname} label={label} />;

const renderTabArrow = ({ onTabScrollChange }) => {
  return props => {
    const { direction, onClick } = props;

    const onClickHandler = (...args) => {
      onTabScrollChange(direction);
      onClick(...args);
    };

    return <TabScrollButton {...props} onClick={onClickHandler} />;
  };
};

export const Tabs = ({ labels, children, onChange, value, tabClassname, onTabScrollButtonChange, ...props }) => {
  const [tab, setTab] = useState(value);

  const childrenArr = Children.toArray(children);
  const childrenLength = length(childrenArr);

  const content = propOr(childrenArr, tab, childrenArr);

  const onTabScrollChange = useCallback(
    direction => {
      onTabScrollButtonChange(direction);
      const next = inc(tab);
      const prev = dec(tab);

      const nextTab = equals('right', direction) ? (gt(next, childrenLength) ? tab : next) : lt(prev, 0) ? tab : prev;

      setTab(nextTab);
    },
    [tab, childrenArr, childrenLength]
  );

  const onTabSelect = useCallback(
    (e, value) => {
      setTab(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <Fragment>
      {!isEmpty(labels) && (
        <StyledTabs
          ScrollButtonComponent={renderTabArrow({ onTabScrollChange })}
          classes={{ indicator: 'tab-line' }}
          value={tab}
          className="tabs"
          onChange={onTabSelect}
          {...props}
        >
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
