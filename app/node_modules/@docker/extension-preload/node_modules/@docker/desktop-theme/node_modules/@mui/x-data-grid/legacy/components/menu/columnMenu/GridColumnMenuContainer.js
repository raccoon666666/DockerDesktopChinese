import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["hideMenu", "currentColumn", "open", "id", "labelledby", "className", "children"];
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import { isHideMenuKey, isTabKey } from '../../../utils/keyboardUtils';
import { gridClasses } from '../../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var GridColumnMenuContainer = /*#__PURE__*/React.forwardRef(function GridColumnMenuContainer(props, ref) {
  var hideMenu = props.hideMenu,
      currentColumn = props.currentColumn,
      open = props.open,
      id = props.id,
      labelledby = props.labelledby,
      className = props.className,
      children = props.children,
      other = _objectWithoutProperties(props, _excluded);

  var handleListKeyDown = React.useCallback(function (event) {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }

    if (isHideMenuKey(event.key)) {
      hideMenu(event);
    }
  }, [hideMenu]);
  return /*#__PURE__*/_jsx(MenuList, _extends({
    id: id,
    ref: ref,
    className: clsx(gridClasses.menuList, className),
    "aria-labelledby": labelledby,
    onKeyDown: handleListKeyDown,
    autoFocus: open
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnMenuContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  currentColumn: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  id: PropTypes.string,
  labelledby: PropTypes.string,
  open: PropTypes.bool.isRequired
} : void 0;
export { GridColumnMenuContainer };