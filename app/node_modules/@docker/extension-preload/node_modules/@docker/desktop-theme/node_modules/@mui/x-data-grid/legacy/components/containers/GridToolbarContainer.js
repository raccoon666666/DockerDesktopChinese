import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "children"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['toolbarContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridToolbarContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ToolbarContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.toolbarContainer;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0.5, 0)
  };
});
export var GridToolbarContainer = /*#__PURE__*/React.forwardRef(function GridToolbarContainer(props, ref) {
  var className = props.className,
      children = props.children,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);

  if (!children) {
    return null;
  }

  return /*#__PURE__*/_jsx(GridToolbarContainerRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root)
  }, other, {
    children: children
  }));
});