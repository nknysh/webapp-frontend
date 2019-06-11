import React, { useRef, useState } from 'react';
import { path } from 'ramda';
import { Grow, ClickAwayListener } from '@material-ui/core';

import { isArray, mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './DropDownMenu.props';
import { Button, Area, MaterialPopper, MaterialIcon } from './DropDownMenu.styles';

export const DropDownMenu = ({ title, children, ListComponent, ItemComponent, showArrow, className }) => {
  const buttonRef = useRef(undefined);
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);
  const onClose = () => setOpen(false);

  const renderItem = (item, i) =>
    item && (
      <ItemComponent onClick={path(['props', 'onClick'], item)} key={`drop-down-menu-item-${i}`}>
        {item}
      </ItemComponent>
    );

  const renderChildren = () => (isArray(children) ? mapWithIndex(renderItem, children) : renderItem(children, 0));

  return (
    <div className={className}>
      <Button
        buttonRef={buttonRef}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onMouseUp={onToggle}
        onTouchMove={onToggle}
      >
        {title}
        {showArrow && <MaterialIcon>arrow_drop_down</MaterialIcon>}
      </Button>
      <MaterialPopper open={open} anchorEl={buttonRef} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Area>
              <ClickAwayListener onClickAway={onClose}>
                <ListComponent>{renderChildren(children, ItemComponent)}</ListComponent>
              </ClickAwayListener>
            </Area>
          </Grow>
        )}
      </MaterialPopper>
    </div>
  );
};

DropDownMenu.propTypes = propTypes;
DropDownMenu.defaultProps = defaultProps;

export default DropDownMenu;
