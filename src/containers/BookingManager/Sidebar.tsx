import React from 'react';
import styled from 'styled-components';

export interface ISidebarComponentProps {
  className?: string;
}

const SidebarComponent = (props: ISidebarComponentProps) => {
  return (
    <div className={`booking-manager-sidebar ${props.className}`}>
      <label>Booking</label>
      <ul>
        <li>Summary</li>
        <li>Edit Booking</li>
        <li>Proposals</li>
        <li>Comments</li>
        <li>Terms & Conditions</li>
        <li>Activity Log</li>
      </ul>
    </div>
  );
};

export const Sidebar = styled(SidebarComponent)`
  label {
    font-size: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    padding: 8px;
    background: #ccc;
    margin: 8px 0px;
  }
`;
