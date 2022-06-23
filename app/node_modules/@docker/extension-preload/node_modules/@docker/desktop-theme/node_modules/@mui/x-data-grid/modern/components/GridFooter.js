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
export const GridFooter = /*#__PURE__*/React.forwardRef(function GridFooter(props, ref) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const totalTopLevelRowCount = useGridSelector(apiRef, gridTopLevelRowCountSelector);
  const selectedRowCount = useGridSelector(apiRef, selectedGridRowsCountSelector);
  const visibleTopLevelRowCount = useGridSelector(apiRef, gridVisibleTopLevelRowCountSelector);
  const selectedRowCountElement = !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? /*#__PURE__*/_jsx(GridSelectedRowCount, {
    selectedRowCount: selectedRowCount
  }) : /*#__PURE__*/_jsx("div", {});
  const rowCountElement = !rootProps.hideFooterRowCount && !rootProps.pagination ? /*#__PURE__*/_jsx(GridRowCount, {
    rowCount: totalTopLevelRowCount,
    visibleRowCount: visibleTopLevelRowCount
  }) : null;

  const paginationElement = rootProps.pagination && !rootProps.hideFooterPagination && rootProps.components.Pagination && /*#__PURE__*/_jsx(rootProps.components.Pagination, _extends({}, rootProps.componentsProps?.pagination));

  return /*#__PURE__*/_jsxs(GridFooterContainer, _extends({
    ref: ref
  }, props, {
    children: [selectedRowCountElement, rowCountElement, paginationElement]
  }));
});