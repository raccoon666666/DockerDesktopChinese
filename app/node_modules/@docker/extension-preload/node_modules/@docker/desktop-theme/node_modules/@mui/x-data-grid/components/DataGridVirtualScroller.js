import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "disableVirtualization"];
import * as React from 'react';
import { GridVirtualScroller } from './virtualization/GridVirtualScroller';
import { GridVirtualScrollerContent } from './virtualization/GridVirtualScrollerContent';
import { GridVirtualScrollerRenderZone } from './virtualization/GridVirtualScrollerRenderZone';
import { useGridVirtualScroller } from '../hooks/features/virtualization/useGridVirtualScroller';
import { jsx as _jsx } from "react/jsx-runtime";
const DataGridVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridVirtualScroller(props, ref) {
  const {
    className,
    disableVirtualization
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    getRootProps,
    getContentProps,
    getRenderZoneProps,
    getRows
  } = useGridVirtualScroller({
    ref,
    disableVirtualization
  });
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