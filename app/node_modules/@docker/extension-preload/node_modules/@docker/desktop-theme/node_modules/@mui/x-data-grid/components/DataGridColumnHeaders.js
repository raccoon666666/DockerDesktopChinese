import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["innerRef", "className"];
import * as React from 'react';
import { useGridColumnHeaders } from '../hooks/features/columnHeaders/useGridColumnHeaders';
import { GridScrollArea } from './GridScrollArea';
import { GridColumnHeaders } from './columnHeaders/GridColumnHeaders';
import { GridColumnHeadersInner } from './columnHeaders/GridColumnHeadersInner';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const DataGridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnsHeader(props, ref) {
  const {
    innerRef
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    isDragging,
    getRootProps,
    getInnerProps,
    getColumns
  } = useGridColumnHeaders({
    innerRef
  });
  return /*#__PURE__*/_jsxs(GridColumnHeaders, _extends({
    ref: ref
  }, getRootProps(other), {
    children: [/*#__PURE__*/_jsx(GridScrollArea, {
      scrollDirection: "left"
    }), /*#__PURE__*/_jsx(GridColumnHeadersInner, _extends({
      isDragging: isDragging
    }, getInnerProps(), {
      children: getColumns()
    })), /*#__PURE__*/_jsx(GridScrollArea, {
      scrollDirection: "right"
    })]
  }));
});