import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onClick"];
import * as React from 'react';
import { unstable_useId as useId, useForkRef } from '@mui/material/utils';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { gridDensityValueSelector } from '../../hooks/features/density/densitySelector';
import { GridDensityTypes } from '../../models/gridDensity';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var GridToolbarDensitySelector = /*#__PURE__*/React.forwardRef(function GridToolbarDensitySelector(props, ref) {
  var _rootProps$components;

  var onClick = props.onClick,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var densityValue = useGridSelector(apiRef, gridDensityValueSelector);
  var densityButtonId = useId();
  var densityMenuId = useId();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var buttonRef = React.useRef(null);
  var handleRef = useForkRef(ref, buttonRef);
  var densityOptions = [{
    icon: /*#__PURE__*/_jsx(rootProps.components.DensityCompactIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityCompact'),
    value: GridDensityTypes.Compact
  }, {
    icon: /*#__PURE__*/_jsx(rootProps.components.DensityStandardIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityStandard'),
    value: GridDensityTypes.Standard
  }, {
    icon: /*#__PURE__*/_jsx(rootProps.components.DensityComfortableIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityComfortable'),
    value: GridDensityTypes.Comfortable
  }];
  var startIcon = React.useMemo(function () {
    switch (densityValue) {
      case GridDensityTypes.Compact:
        return /*#__PURE__*/_jsx(rootProps.components.DensityCompactIcon, {});

      case GridDensityTypes.Comfortable:
        return /*#__PURE__*/_jsx(rootProps.components.DensityComfortableIcon, {});

      default:
        return /*#__PURE__*/_jsx(rootProps.components.DensityStandardIcon, {});
    }
  }, [densityValue, rootProps]);

  var handleDensitySelectorOpen = function handleDensitySelectorOpen(event) {
    setOpen(true);
    onClick == null ? void 0 : onClick(event);
  };

  var handleDensitySelectorClose = function handleDensitySelectorClose() {
    return setOpen(false);
  };

  var handleDensityUpdate = function handleDensityUpdate(newDensity) {
    apiRef.current.setDensity(newDensity);
    setOpen(false);
  };

  var handleListKeyDown = function handleListKeyDown(event) {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }

    if (isHideMenuKey(event.key)) {
      handleDensitySelectorClose();
    }
  }; // Disable the button if the corresponding is disabled


  if (rootProps.disableDensitySelector) {
    return null;
  }

  var densityElements = densityOptions.map(function (option, index) {
    return /*#__PURE__*/_jsxs(MenuItem, {
      onClick: function onClick() {
        return handleDensityUpdate(option.value);
      },
      selected: option.value === densityValue,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: option.icon
      }), option.label]
    }, index);
  });
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
      ref: handleRef,
      color: "primary",
      size: "small",
      startIcon: startIcon,
      "aria-label": apiRef.current.getLocaleText('toolbarDensityLabel'),
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "menu",
      "aria-labelledby": densityMenuId,
      id: densityButtonId
    }, other, {
      onClick: handleDensitySelectorOpen
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
      children: apiRef.current.getLocaleText('toolbarDensity')
    })), /*#__PURE__*/_jsx(GridMenu, {
      open: open,
      target: buttonRef.current,
      onClickAway: handleDensitySelectorClose,
      position: "bottom-start",
      children: /*#__PURE__*/_jsx(MenuList, {
        id: densityMenuId,
        className: gridClasses.menuList,
        "aria-labelledby": densityButtonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: densityElements
      })
    })]
  });
});