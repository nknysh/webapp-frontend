import React, { useRef, useState, useCallback } from 'react';
import { partial } from 'ramda';
import { Grow, ClickAwayListener } from '@material-ui/core';

import { isArray, mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './DropDownMenu.props';
import { StyledDropDownMenu, Button, Area, MaterialPopper, MaterialIcon } from './DropDownMenu.styles';

const renderItem = (ItemComponent, item, i) =>
  item && (
    <ItemComponent key={`drop-down-menu-item-${i}`} disableGutters>
      {item}
    </ItemComponent>
  );

const renderChildren = ({ ItemComponent, children }) =>
  isArray(children)
    ? mapWithIndex(partial(renderItem, [ItemComponent]), children)
    : renderItem(ItemComponent, children, 0);

export const DropDownMenu = ({ title, children, ListComponent, ItemComponent, showArrow, className }) => {
  const buttonRef = useRef(undefined);
  const [open, setOpen] = useState(false);

  const onToggle = useCallback(() => setOpen(!open), [open]);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <StyledDropDownMenu className={className}>
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
                <ListComponent>{renderChildren({ ItemComponent, children })}</ListComponent>
              </ClickAwayListener>
            </Area>
          </Grow>
        )}
      </MaterialPopper>
    </StyledDropDownMenu>
  );
};

DropDownMenu.propTypes = propTypes;
DropDownMenu.defaultProps = defaultProps;

export default DropDownMenu;
