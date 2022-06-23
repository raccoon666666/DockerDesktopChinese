import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "onClick"];
import * as React from 'react';
import { unstable_useId as useId, useForkRef } from '@mui/material/utils';
import MenuList from '@mui/material/MenuList';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var GridToolbarExportContainer = /*#__PURE__*/React.forwardRef(function GridToolbarExportContainer(props, ref) {
  var _rootProps$components;

  var children = props.children,
      onClick = props.onClick,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var buttonId = useId();
  var menuId = useId();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var buttonRef = React.useRef(null);
  var handleRef = useForkRef(ref, buttonRef);

  var handleMenuOpen = function handleMenuOpen(event) {
    setOpen(true);
    onClick == null ? void 0 : onClick(event);
  };

  var handleMenuClose = function handleMenuClose() {
    return setOpen(false);
  };

  var handleListKeyDown = function handleListKeyDown(event) {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }

    if (isHideMenuKey(event.key)) {
      handleMenuClose();
    }
  };

  if (children == null) {
    return null;
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
      ref: handleRef,
      color: "primary",
      size: "small",
      startIcon: /*#__PURE__*/_jsx(rootProps.components.ExportIcon, {}),
      "aria-expanded": open ? 'true' : undefined,
      "aria-label": apiRef.current.getLocaleText('toolbarExportLabel'),
      "aria-haspopup": "menu",
      "aria-labelledby": menuId,
      id: buttonId
    }, other, {
      onClick: handleMenuOpen
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
      children: apiRef.current.getLocaleText('toolbarExport')
    })), /*#__PURE__*/_jsx(GridMenu, {
      open: open,
      target: buttonRef.current,
      onClickAway: handleMenuClose,
      position: "bottom-start",
      children: /*#__PURE__*/_jsx(MenuList, {
        id: menuId,
        className: gridClasses.menuList,
        "aria-labelledby": buttonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: React.Children.map(children, function (child) {
          if (! /*#__PURE__*/React.isValidElement(child)) {
            return child;
          }

          return /*#__PURE__*/React.cloneElement(child, {
            hideMenu: handleMenuClose
          });
        })
      })
    })]
  });
});