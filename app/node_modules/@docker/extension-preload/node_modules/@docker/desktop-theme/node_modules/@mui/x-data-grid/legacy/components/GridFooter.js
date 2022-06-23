import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { gridTopLevelRowCountSelector } from '../hooks/features/rows/gridRowsSelector';
import { selectedGridRowsCountSelector } from '../hooks/features/selection/gridSelectionSelector';
import { gridVisibleTopLevelRowCountSelector } from '../hooks/features/filter/gridFilterSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridRowCount } from './GridRowCount';
import { GridSelectedRowCount } from './GridSelectedRowCount';
import { GridFooterContainer } from './containers/GridFooterContainer';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var GridFooter = /*#__PURE__*/React.forwardRef(function GridFooter(props, ref) {
  var _rootProps$components;

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var totalTopLevelRowCount = useGridSelector(apiRef, gridTopLevelRowCountSelector);
  var selectedRowCount = useGridSelector(apiRef, selectedGridRowsCountSelector);
  var visibleTopLevelRowCount = useGridSelector(apiRef, gridVisibleTopLevelRowCountSelector);
  var selectedRowCountElement = !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? /*#__PURE__*/_jsx(GridSelectedRowCount, {
    selectedRowCount: selectedRowCount
  }) : /*#__PURE__*/_jsx("div", {});
  var rowCountElement = !rootProps.hideFooterRowCount && !rootProps.pagination ? /*#__PURE__*/_jsx(GridRowCount, {
    rowCount: totalTopLevelRowCount,
    visibleRowCount: visibleTopLevelRowCount
  }) : null;

  var paginationElement = rootProps.pagination && !rootProps.hideFooterPagination && rootProps.components.Pagination && /*#__PURE__*/_jsx(rootProps.components.Pagination, _extends({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.pagination));

  return /*#__PURE__*/_jsxs(GridFooterContainer, _extends({
    ref: ref
  }, props, {
    children: [selectedRowCountElement, rowCountElement, paginationElement]
  }));
});