import * as React from 'react';
import { useGridSelector, GridEvents, useGridApiEventHandler, useGridApiOptionHandler, gridVisibleColumnDefinitionsSelector, gridRowsMetaSelector } from '@mui/x-data-grid';
import { useGridVisibleRows } from '@mui/x-data-grid/internals';

/**
 * Only available in DataGridPro
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export const useGridInfiniteLoader = (apiRef, props) => {
  const visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const currentPage = useGridVisibleRows(apiRef, props);
  const rowsMeta = useGridSelector(apiRef, gridRowsMetaSelector);
  const contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
  const isInScrollBottomArea = React.useRef(false);
  const handleRowsScrollEnd = React.useCallback(scrollPosition => {
    const dimensions = apiRef.current.getRootDimensions();

    if (!dimensions) {
      return;
    }

    const scrollPositionBottom = scrollPosition.top + dimensions.viewportOuterSize.height;
    const viewportPageSize = apiRef.current.unstable_getViewportPageSize();

    if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
      isInScrollBottomArea.current = false;
    }

    if (scrollPositionBottom >= contentHeight - props.scrollEndThreshold && !isInScrollBottomArea.current) {
      const rowScrollEndParam = {
        visibleColumns,
        viewportPageSize,
        virtualRowsCount: currentPage.rows.length
      };
      apiRef.current.publishEvent(GridEvents.rowsScrollEnd, rowScrollEndParam);
      isInScrollBottomArea.current = true;
    }
  }, [contentHeight, props.scrollEndThreshold, visibleColumns, apiRef, currentPage.rows.length]);
  const handleGridScroll = React.useCallback(({
    left,
    top
  }) => {
    handleRowsScrollEnd({
      left,
      top
    });
  }, [handleRowsScrollEnd]);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, handleGridScroll);
  useGridApiOptionHandler(apiRef, GridEvents.rowsScrollEnd, props.onRowsScrollEnd);
};