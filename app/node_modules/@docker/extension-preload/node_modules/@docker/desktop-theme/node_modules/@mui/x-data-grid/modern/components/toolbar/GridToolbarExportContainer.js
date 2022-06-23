import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "onClick"];
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
export const GridToolbarExportContainer = /*#__PURE__*/React.forwardRef(function GridToolbarExportContainer(props, ref) {
  const {
    children,
    onClick
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const buttonId = useId();
  const menuId = useId();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(ref, buttonRef);

  const handleMenuOpen = event => {
    setOpen(true);
    onClick?.(event);
  };

  const handleMenuClose = () => setOpen(false);

  const handleListKeyDown = event => {
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
    }, rootProps.componentsProps?.baseButton, {
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
        children: React.Children.map(children, child => {
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