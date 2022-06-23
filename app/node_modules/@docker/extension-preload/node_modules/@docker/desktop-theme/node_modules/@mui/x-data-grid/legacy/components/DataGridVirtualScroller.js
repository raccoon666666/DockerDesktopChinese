import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "disableVirtualization"];
import * as React from 'react';
import { GridVirtualScroller } from './virtualization/GridVirtualScroller';
import { GridVirtualScrollerContent } from './virtualization/GridVirtualScrollerContent';
import { GridVirtualScrollerRenderZone } from './virtualization/GridVirtualScrollerRenderZone';
import { useGridVirtualScroller } from '../hooks/features/virtualization/useGridVirtualScroller';
import { jsx as _jsx } from "react/jsx-runtime";
var DataGridVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridVirtualScroller(props, ref) {
  var className = props.className,
      disableVirtualization = props.disableVirtualization,
      other = _objectWithoutProperties(props, _excluded);

  var _useGridVirtualScroll = useGridVirtualScroller({
    ref: ref,
    disableVirtualization: disableVirtualization
  }),
      getRootProps = _useGridVirtualScroll.getRootProps,
      getContentProps = _useGridVirtualScroll.getContentProps,
      getRenderZoneProps = _useGridVirtualScroll.getRenderZoneProps,
      getRows = _useGridVirtualScroll.getRows;

  return /*#__PURE__*/_jsx(GridVirtualScroller, _extends({
    className: className
  }, getRootProps(other), {
    children: /*#__PURE__*/_jsx(GridVirtualScrollerContent, _extends({}, getContentProps(), {
      children: /*#__PURE__*/_jsx(GridVirtualScrollerRenderZone, _extends({}, getRenderZoneProps(), {
        children: getRows()
      }))
    }))
  }));
});
export { DataGridVirtualScroller };