import * as React from 'react';
import { useGridSelector, GridEvents, useGridApiEventHandler, useGridApiOptionHandler, gridVisibleColumnDefinitionsSelector, gridRowsMetaSelector } from '@mui/x-data-grid';
import { useGridVisibleRows } from '@mui/x-data-grid/internals';

/**
 * Only available in DataGridPro
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export var useGridInfiniteLoader = function useGridInfiniteLoader(apiRef, props) {
  var visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  var currentPage = useGridVisibleRows(apiRef, props);
  var rowsMeta = useGridSelector(apiRef, gridRowsMetaSelector);
  var contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
  var isInScrollBottomArea = React.useRef(false);
  var handleRowsScrollEnd = React.useCallback(function (scrollPosition) {
    var dimensions = apiRef.current.getRootDimensions();

    if (!dimensions) {
      return;
    }

    var scrollPositionBottom = scrollPosition.top + dimensions.viewportOuterSize.height;
    var viewportPageSize = apiRef.current.unstable_getViewportPageSize();

    if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
      isInScrollBottomArea.current = false;
    }

    if (scrollPositionBottom >= contentHeight - props.scrollEndThreshold && !isInScrollBottomArea.current) {
      var rowScrollEndParam = {
        visibleColumns: visibleColumns,
        viewportPageSize: viewportPageSize,
        virtualRowsCount: currentPage.rows.length
      };
      apiRef.current.publishEvent(GridEvents.rowsScrollEnd, rowScrollEndParam);
      isInScrollBottomArea.current = true;
    }
  }, [contentHeight, props.scrollEndThreshold, visibleColumns, apiRef, currentPage.rows.length]);
  var handleGridScroll = React.useCallback(function (_ref) {
    var left = _ref.left,
        top = _ref.top;
    handleRowsScrollEnd({
      left: left,
      top: top
    });
  }, [handleRowsScrollEnd]);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, handleGridScroll);
  useGridApiOptionHandler(apiRef, GridEvents.rowsScrollEnd, props.onRowsScrollEnd);
};