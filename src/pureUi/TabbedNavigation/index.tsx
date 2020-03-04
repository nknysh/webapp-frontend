import React, { useState } from 'react';
import styled from 'styled-components';

export const _TabbedNavigation = props => {
  const { tabHeaders, className, children } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeTab = children[activeTabIndex];

  return (
    <div className={className}>
      <div className="tab-headers-wrapper">
        {tabHeaders.map((headerJsx, tabIndex) => {
          return (
            <button
              key={tabIndex}
              className={activeTabIndex === tabIndex ? 'active' : ''}
              onClick={() => {
                setActiveTabIndex(tabIndex);
              }}
            >
              {headerJsx}
            </button>
          );
        })}
      </div>

      <div className="active-tab">{activeTab}</div>
    </div>
  );
};

export const TabbedNavigation = styled(_TabbedNavigation)`
  .active-tab {
    padding: 16px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  button {
    background: none;
    padding-left: 16px;
    padding-right: 16px;
    border: 0;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;

    &:not(.active) {
      border-bottom: 1px solid #ccc;
      opacity: 0.6;
    }
  }
`;

interface ITabbedNavigationProps {}
