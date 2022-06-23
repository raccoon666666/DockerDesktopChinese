import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onClick"];
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
export const GridToolbarDensitySelector = /*#__PURE__*/React.forwardRef(function GridToolbarDensitySelector(props, ref) {
  var _rootProps$components;

  const {
    onClick
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const densityValue = useGridSelector(apiRef, gridDensityValueSelector);
  const densityButtonId = useId();
  const densityMenuId = useId();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(ref, buttonRef);
  const densityOptions = [{
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
  const startIcon = React.useMemo(() => {
    switch (densityValue) {
      case GridDensityTypes.Compact:
        return /*#__PURE__*/_jsx(rootProps.components.DensityCompactIcon, {});

      case GridDensityTypes.Comfortable:
        return /*#__PURE__*/_jsx(rootProps.components.DensityComfortableIcon, {});

      default:
        return /*#__PURE__*/_jsx(rootProps.components.DensityStandardIcon, {});
    }
  }, [densityValue, rootProps]);

  const handleDensitySelectorOpen = event => {
    setOpen(true);
    onClick == null ? void 0 : onClick(event);
  };

  const handleDensitySelectorClose = () => setOpen(false);

  const handleDensityUpdate = newDensity => {
    apiRef.current.setDensity(newDensity);
    setOpen(false);
  };

  const handleListKeyDown = event => {
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

  const densityElements = densityOptions.map((option, index) => /*#__PURE__*/_jsxs(MenuItem, {
    onClick: () => handleDensityUpdate(option.value),
    selected: option.value === densityValue,
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: option.icon
    }), option.label]
  }, index));
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