import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['virtualScrollerRenderZone']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var VirtualScrollerRenderZoneRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'VirtualScrollerRenderZone',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.virtualScrollerRenderZone;
  }
})({
  position: 'absolute',
  display: 'flex',
  // Prevents margin collapsing when using `getRowSpacing`
  flexDirection: 'column'
});
var GridVirtualScrollerRenderZone = /*#__PURE__*/React.forwardRef(function GridVirtualScrollerRenderZone(props, ref) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(VirtualScrollerRenderZoneRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
export { GridVirtualScrollerRenderZone };